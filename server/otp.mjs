/**
 * One-time passcodes for email and phone verification.
 *
 * DELIVERY: this VM cannot send mail directly — GCP blocks outbound port 25,
 * so there is no SMTP path. Every real provider here is an HTTPS API, which
 * the VM can reach. No provider credentials exist yet, so the default sender
 * is "console": it logs the code to the service journal and (only when
 * OTP_DEV_ECHO=1) returns it in the response, which is enough to test the full
 * flow end to end. Set the env vars for a real provider and nothing else has
 * to change.
 *
 * Codes are stored hashed, never in plaintext — the OTP table is as sensitive
 * as a password table while a code is live.
 */

import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import { db } from "./db.mjs";

const TTL_MINUTES = Number(process.env.OTP_TTL_MINUTES || 10);
const MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS || 5);
const RESEND_COOLDOWN_SEC = Number(process.env.OTP_COOLDOWN_SEC || 60);
const MAX_PER_HOUR = Number(process.env.OTP_MAX_PER_HOUR || 5);
const DEV_ECHO = process.env.OTP_DEV_ECHO === "1";

export function initOtp() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS otp_codes (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      target      TEXT NOT NULL,
      channel     TEXT NOT NULL CHECK (channel IN ('email','sms')),
      purpose     TEXT NOT NULL,
      code_hash   TEXT NOT NULL,
      attempts    INTEGER NOT NULL DEFAULT 0,
      expires_at  TEXT NOT NULL,
      consumed_at TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_otp_target ON otp_codes(target, purpose, id DESC);
  `);

  // Verification flags on users — added by migration since the table predates
  // this feature.
  const cols = db.prepare("PRAGMA table_info(users)").all().map((c) => c.name);
  if (!cols.includes("email_verified")) {
    db.exec("ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 0");
  }
  if (!cols.includes("phone_verified")) {
    db.exec("ALTER TABLE users ADD COLUMN phone_verified INTEGER NOT NULL DEFAULT 0");
  }
}

const hash = (code, target) =>
  createHash("sha256").update(`${code}:${target}:${process.env.OTP_PEPPER || "astro"}`).digest("hex");

// --- providers ---------------------------------------------------------------

async function sendEmailResend(to, subject, text) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.OTP_FROM_EMAIL;
  if (!key || !from) throw new Error("RESEND_API_KEY and OTP_FROM_EMAIL required");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });
  if (!r.ok) throw new Error(`resend ${r.status}: ${(await r.text()).slice(0, 200)}`);
}

async function sendSmsMsg91(to, text) {
  const key = process.env.MSG91_AUTH_KEY;
  const sender = process.env.MSG91_SENDER_ID;
  if (!key || !sender) throw new Error("MSG91_AUTH_KEY and MSG91_SENDER_ID required");

  const r = await fetch("https://control.msg91.com/api/v5/flow/", {
    method: "POST",
    headers: { authkey: key, "content-type": "application/json" },
    body: JSON.stringify({
      template_id: process.env.MSG91_TEMPLATE_ID,
      sender,
      recipients: [{ mobiles: to.replace(/\D/g, ""), OTP: text }],
    }),
  });
  if (!r.ok) throw new Error(`msg91 ${r.status}: ${(await r.text()).slice(0, 200)}`);
}

async function sendSmsTwilio(to, text) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !token || !from) throw new Error("TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_FROM required");

  const body = new URLSearchParams({ To: to, From: from, Body: text });
  const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!r.ok) throw new Error(`twilio ${r.status}: ${(await r.text()).slice(0, 200)}`);
}

/** Which provider is configured, per channel. */
export function providerFor(channel) {
  if (channel === "email") return process.env.EMAIL_PROVIDER || "console";
  return process.env.SMS_PROVIDER || "console";
}

export function otpStatus() {
  return {
    email: providerFor("email"),
    sms: providerFor("sms"),
    devEcho: DEV_ECHO,
    ttlMinutes: TTL_MINUTES,
    configured: providerFor("email") !== "console" || providerFor("sms") !== "console",
  };
}

async function deliver(channel, target, code) {
  const provider = providerFor(channel);
  const text = `Your Golden Era Astro verification code is ${code}. It expires in ${TTL_MINUTES} minutes.`;

  if (provider === "console") {
    // Visible in `journalctl -u astro-chat`. Never enable DEV_ECHO in production.
    console.log(`[otp] ${channel} -> ${target} : ${code}`);
    return;
  }
  if (channel === "email" && provider === "resend") return sendEmailResend(target, "Your verification code", text);
  if (channel === "sms" && provider === "msg91") return sendSmsMsg91(target, code);
  if (channel === "sms" && provider === "twilio") return sendSmsTwilio(target, text);
  throw new Error(`unknown ${channel} provider: ${provider}`);
}

// --- flow --------------------------------------------------------------------

export async function sendOtp({ target, channel, purpose = "verify" }) {
  const now = Date.now();

  // Cooldown, so a button-masher cannot burn SMS credit.
  const last = db
    .prepare("SELECT created_at FROM otp_codes WHERE target = ? AND purpose = ? ORDER BY id DESC LIMIT 1")
    .get(target, purpose);
  if (last) {
    const since = (now - new Date(last.created_at + "Z").getTime()) / 1000;
    if (since >= 0 && since < RESEND_COOLDOWN_SEC) {
      const err = new Error("COOLDOWN");
      err.retryAfter = Math.ceil(RESEND_COOLDOWN_SEC - since);
      throw err;
    }
  }

  const recent = db
    .prepare("SELECT COUNT(*) AS n FROM otp_codes WHERE target = ? AND created_at > datetime('now','-1 hour')")
    .get(target);
  if (recent.n >= MAX_PER_HOUR) throw new Error("RATE_LIMITED");

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const expires = new Date(now + TTL_MINUTES * 60_000).toISOString();

  // Any earlier live code for this target is void once a new one is issued.
  db.prepare(
    "UPDATE otp_codes SET consumed_at = datetime('now') WHERE target = ? AND purpose = ? AND consumed_at IS NULL"
  ).run(target, purpose);

  db.prepare(
    "INSERT INTO otp_codes (target, channel, purpose, code_hash, expires_at) VALUES (?,?,?,?,?)"
  ).run(target, channel, purpose, hash(code, target), expires);

  await deliver(channel, target, code);

  return {
    sent: true,
    channel,
    provider: providerFor(channel),
    expiresInMinutes: TTL_MINUTES,
    // Only ever populated in an explicitly-enabled dev mode.
    ...(DEV_ECHO ? { devCode: code } : {}),
  };
}

export function verifyOtp({ target, code, purpose = "verify" }) {
  const row = db
    .prepare(
      "SELECT * FROM otp_codes WHERE target = ? AND purpose = ? AND consumed_at IS NULL ORDER BY id DESC LIMIT 1"
    )
    .get(target, purpose);

  if (!row) return { ok: false, reason: "NO_CODE" };
  if (new Date(row.expires_at) < new Date()) return { ok: false, reason: "EXPIRED" };
  if (row.attempts >= MAX_ATTEMPTS) return { ok: false, reason: "TOO_MANY_ATTEMPTS" };

  db.prepare("UPDATE otp_codes SET attempts = attempts + 1 WHERE id = ?").run(row.id);

  const expected = Buffer.from(row.code_hash, "hex");
  const actual = Buffer.from(hash(String(code).trim(), target), "hex");
  const match = expected.length === actual.length && timingSafeEqual(expected, actual);

  if (!match) {
    return { ok: false, reason: "WRONG_CODE", attemptsLeft: MAX_ATTEMPTS - row.attempts - 1 };
  }

  db.prepare("UPDATE otp_codes SET consumed_at = datetime('now') WHERE id = ?").run(row.id);
  return { ok: true, channel: row.channel };
}

export function markVerified(userId, channel) {
  const col = channel === "email" ? "email_verified" : "phone_verified";
  db.prepare(`UPDATE users SET ${col} = 1 WHERE id = ?`).run(userId);
}

/** Housekeeping — drop codes that are long dead. */
export function pruneOtp() {
  db.prepare("DELETE FROM otp_codes WHERE created_at < datetime('now','-1 day')").run();
}
