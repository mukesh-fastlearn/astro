/**
 * Database layer — SQLite via node:sqlite (built into Node 22).
 *
 * WHY SQLITE, AND WHY THIS DRIVER
 *
 * One VM, one writer process, modest concurrency, and money in the wallet
 * table. SQLite in WAL mode handles that comfortably and removes a whole class
 * of operational work — no separate server to run, secure, patch or back up
 * beyond copying a file. Postgres becomes the right answer when there is more
 * than one app instance writing, or when hosting moves somewhere managed;
 * every query here is plain SQL so that move stays small.
 *
 * node:sqlite rather than better-sqlite3 because the VM has no C toolchain
 * (no gcc/make), so a native module is a deployment risk. The trade-off is
 * that node:sqlite is still marked experimental: it works on Node 22.23 with
 * no flag, but the API could shift on a future major. Node is pinned on the
 * VM, and swapping to better-sqlite3 is a driver change, not a rewrite.
 *
 * Money integrity: every credit change goes through a transaction that writes
 * both the balance and a ledger row. The balance is never updated alone, so a
 * wallet can always be reconciled against its history.
 */

import { DatabaseSync } from "node:sqlite";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { dirname, resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || resolve(HERE, "data", "astro.db");

mkdirSync(dirname(DB_PATH), { recursive: true });

export const db = new DatabaseSync(DB_PATH);

db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA foreign_keys = ON");
db.exec("PRAGMA busy_timeout = 5000");

export const SIGNUP_CREDITS = Number(process.env.SIGNUP_CREDITS || 501);
export const COST_PER_MESSAGE = Number(process.env.COST_PER_MESSAGE || 20);

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name          TEXT NOT NULL,
      phone         TEXT,
      role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','astrologer','admin')),
      -- astrologer-only profile fields
      bio           TEXT,
      expertise     TEXT,
      is_available  INTEGER NOT NULL DEFAULT 1,
      created_at    TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS birth_profiles (
      user_id    TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      dob        TEXT NOT NULL,
      tob        TEXT NOT NULL,
      pob        TEXT NOT NULL,
      latitude   REAL NOT NULL,
      longitude  REAL NOT NULL,
      tz_offset  TEXT NOT NULL DEFAULT '+05:30',
      gender     TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- The computed chart is cached so an astrologer opening a consultation
    -- sees byte-identical data to what the user saw, not a recomputation.
    CREATE TABLE IF NOT EXISTS charts (
      user_id     TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      chart_json  TEXT NOT NULL,
      computed_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS wallets (
      user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      balance INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0)
    );

    CREATE TABLE IF NOT EXISTS wallet_ledger (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      delta         INTEGER NOT NULL,
      balance_after INTEGER NOT NULL,
      reason        TEXT NOT NULL,
      ref           TEXT,
      created_at    TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS consultations (
      id            TEXT PRIMARY KEY,
      user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      astrologer_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      subject       TEXT NOT NULL,
      status        TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','assigned','closed')),
      created_at    TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS consultation_messages (
      id              TEXT PRIMARY KEY,
      consultation_id TEXT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
      sender_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      sender_role     TEXT NOT NULL,
      body            TEXT NOT NULL,
      created_at      TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS ai_messages (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      session_id TEXT NOT NULL,
      role       TEXT NOT NULL CHECK (role IN ('user','assistant')),
      body       TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token      TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_ledger_user      ON wallet_ledger(user_id, id DESC);
    CREATE INDEX IF NOT EXISTS idx_consult_user     ON consultations(user_id, updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_consult_astro    ON consultations(astrologer_id, updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_consult_status   ON consultations(status, updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_cmsg_consult     ON consultation_messages(consultation_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_ai_user_session  ON ai_messages(user_id, session_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_sessions_user    ON sessions(user_id);
  `);
}

// --- ids and passwords -------------------------------------------------------

export const newId = () => randomBytes(16).toString("hex");

/** scrypt from node:crypto — no third-party hashing dependency. */
export function hashPassword(plain) {
  const salt = randomBytes(16);
  const hash = scryptSync(plain, salt, 64);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export function verifyPassword(plain, stored) {
  try {
    const [scheme, saltHex, hashHex] = String(stored).split("$");
    if (scheme !== "scrypt") return false;
    const expected = Buffer.from(hashHex, "hex");
    const actual = scryptSync(plain, Buffer.from(saltHex, "hex"), expected.length);
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

// --- transactions ------------------------------------------------------------

/** Run fn inside a transaction, rolling back on any throw. */
export function tx(fn) {
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (e) {
    try {
      db.exec("ROLLBACK");
    } catch {
      /* already rolled back */
    }
    throw e;
  }
}

// --- wallet ------------------------------------------------------------------

export function getBalance(userId) {
  const row = db.prepare("SELECT balance FROM wallets WHERE user_id = ?").get(userId);
  return row ? row.balance : 0;
}

/**
 * Apply a credit change and write the ledger row in one transaction.
 * Returns the new balance, or throws INSUFFICIENT_CREDITS.
 */
export function applyCredits(userId, delta, reason, ref = null) {
  return tx(() => {
    const row = db.prepare("SELECT balance FROM wallets WHERE user_id = ?").get(userId);
    if (!row) throw new Error("NO_WALLET");

    const next = row.balance + delta;
    if (next < 0) {
      const err = new Error("INSUFFICIENT_CREDITS");
      err.balance = row.balance;
      throw err;
    }

    db.prepare("UPDATE wallets SET balance = ? WHERE user_id = ?").run(next, userId);
    db.prepare(
      "INSERT INTO wallet_ledger (user_id, delta, balance_after, reason, ref) VALUES (?,?,?,?,?)"
    ).run(userId, delta, next, reason, ref);
    return next;
  });
}

export function ledger(userId, limit = 50) {
  return db
    .prepare(
      "SELECT delta, balance_after, reason, ref, created_at FROM wallet_ledger WHERE user_id = ? ORDER BY id DESC LIMIT ?"
    )
    .all(userId, limit);
}

// --- users -------------------------------------------------------------------

export function createUser({ email, password, name, phone = null, role = "user" }) {
  const id = newId();
  return tx(() => {
    db.prepare(
      "INSERT INTO users (id, email, password_hash, name, phone, role) VALUES (?,?,?,?,?,?)"
    ).run(id, String(email).toLowerCase().trim(), hashPassword(password), name, phone, role);

    db.prepare("INSERT INTO wallets (user_id, balance) VALUES (?, ?)").run(id, SIGNUP_CREDITS);
    db.prepare(
      "INSERT INTO wallet_ledger (user_id, delta, balance_after, reason) VALUES (?,?,?,?)"
    ).run(id, SIGNUP_CREDITS, SIGNUP_CREDITS, "signup_bonus");

    return id;
  });
}

export function findUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(String(email).toLowerCase().trim());
}

export function findUserById(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

/** Public shape — never leaks password_hash. */
export function publicUser(u) {
  if (!u) return null;
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    phone: u.phone ?? null,
    bio: u.bio ?? null,
    expertise: u.expertise ?? null,
    isAvailable: u.is_available === 1,
    createdAt: u.created_at,
  };
}

// --- sessions ----------------------------------------------------------------

const SESSION_DAYS = 30;

export function createSession(userId) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000).toISOString();
  db.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?,?,?)").run(
    token,
    userId,
    expires
  );
  return { token, expires };
}

export function userForSession(token) {
  if (!token) return null;
  const s = db
    .prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?")
    .get(token);
  if (!s) return null;
  if (new Date(s.expires_at) < new Date()) {
    db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
    return null;
  }
  return findUserById(s.user_id);
}

export function destroySession(token) {
  if (token) db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

/** Housekeeping — drop sessions that have already lapsed. */
export function pruneSessions() {
  db.prepare("DELETE FROM sessions WHERE expires_at < datetime('now')").run();
}

// --- birth profile and chart cache -------------------------------------------

export function saveBirthProfile(userId, p) {
  db.prepare(
    `INSERT INTO birth_profiles (user_id, dob, tob, pob, latitude, longitude, tz_offset, gender, updated_at)
     VALUES (?,?,?,?,?,?,?,?, datetime('now'))
     ON CONFLICT(user_id) DO UPDATE SET
       dob=excluded.dob, tob=excluded.tob, pob=excluded.pob,
       latitude=excluded.latitude, longitude=excluded.longitude,
       tz_offset=excluded.tz_offset, gender=excluded.gender,
       updated_at=datetime('now')`
  ).run(userId, p.dob, p.tob, p.pob, p.latitude, p.longitude, p.tzOffset || "+05:30", p.gender ?? null);
}

export function getBirthProfile(userId) {
  return db.prepare("SELECT * FROM birth_profiles WHERE user_id = ?").get(userId);
}

export function saveChart(userId, chartJson) {
  db.prepare(
    `INSERT INTO charts (user_id, chart_json, computed_at) VALUES (?,?, datetime('now'))
     ON CONFLICT(user_id) DO UPDATE SET chart_json=excluded.chart_json, computed_at=datetime('now')`
  ).run(userId, JSON.stringify(chartJson));
}

export function getChart(userId) {
  const row = db.prepare("SELECT chart_json, computed_at FROM charts WHERE user_id = ?").get(userId);
  if (!row) return null;
  try {
    return { chart: JSON.parse(row.chart_json), computedAt: row.computed_at };
  } catch {
    return null;
  }
}

// --- consultations -----------------------------------------------------------

export function createConsultation(userId, subject) {
  const id = newId();
  db.prepare("INSERT INTO consultations (id, user_id, subject) VALUES (?,?,?)").run(
    id,
    userId,
    subject
  );
  return id;
}

export function listConsultationsForUser(userId) {
  return db
    .prepare(
      `SELECT c.*, a.name AS astrologer_name
       FROM consultations c LEFT JOIN users a ON a.id = c.astrologer_id
       WHERE c.user_id = ? ORDER BY c.updated_at DESC`
    )
    .all(userId);
}

/** An astrologer sees unassigned inquiries plus their own. */
export function listConsultationsForAstrologer(astrologerId) {
  return db
    .prepare(
      `SELECT c.*, u.name AS user_name, u.email AS user_email
       FROM consultations c JOIN users u ON u.id = c.user_id
       WHERE c.astrologer_id = ? OR c.astrologer_id IS NULL
       ORDER BY (c.astrologer_id IS NULL) DESC, c.updated_at DESC`
    )
    .all(astrologerId);
}

export function getConsultation(id) {
  return db
    .prepare(
      `SELECT c.*, u.name AS user_name, u.email AS user_email, a.name AS astrologer_name
       FROM consultations c
       JOIN users u ON u.id = c.user_id
       LEFT JOIN users a ON a.id = c.astrologer_id
       WHERE c.id = ?`
    )
    .get(id);
}

export function claimConsultation(id, astrologerId) {
  const res = db
    .prepare(
      `UPDATE consultations SET astrologer_id = ?, status = 'assigned', updated_at = datetime('now')
       WHERE id = ? AND astrologer_id IS NULL`
    )
    .run(astrologerId, id);
  return res.changes > 0;
}

export function closeConsultation(id) {
  db.prepare(
    "UPDATE consultations SET status = 'closed', updated_at = datetime('now') WHERE id = ?"
  ).run(id);
}

export function listMessages(consultationId, sinceIso = null) {
  if (sinceIso) {
    return db
      .prepare(
        `SELECT m.*, u.name AS sender_name FROM consultation_messages m
         JOIN users u ON u.id = m.sender_id
         WHERE m.consultation_id = ? AND m.created_at > ?
         ORDER BY m.created_at`
      )
      .all(consultationId, sinceIso);
  }
  return db
    .prepare(
      `SELECT m.*, u.name AS sender_name FROM consultation_messages m
       JOIN users u ON u.id = m.sender_id
       WHERE m.consultation_id = ? ORDER BY m.created_at`
    )
    .all(consultationId);
}

/**
 * Post a message. When the sender is the user this also debits the wallet, in
 * the same transaction — a message must never be stored without its charge,
 * and a charge must never be taken without the message.
 */
export function postMessage({ consultationId, senderId, senderRole, body, charge }) {
  const id = newId();
  return tx(() => {
    if (charge > 0) {
      const w = db.prepare("SELECT balance FROM wallets WHERE user_id = ?").get(senderId);
      if (!w) throw new Error("NO_WALLET");
      if (w.balance < charge) {
        const err = new Error("INSUFFICIENT_CREDITS");
        err.balance = w.balance;
        throw err;
      }
      const next = w.balance - charge;
      db.prepare("UPDATE wallets SET balance = ? WHERE user_id = ?").run(next, senderId);
      db.prepare(
        "INSERT INTO wallet_ledger (user_id, delta, balance_after, reason, ref) VALUES (?,?,?,?,?)"
      ).run(senderId, -charge, next, "astrologer_chat", id);
    }

    db.prepare(
      "INSERT INTO consultation_messages (id, consultation_id, sender_id, sender_role, body) VALUES (?,?,?,?,?)"
    ).run(id, consultationId, senderId, senderRole, body);

    db.prepare("UPDATE consultations SET updated_at = datetime('now') WHERE id = ?").run(
      consultationId
    );
    return id;
  });
}

// --- AI chat history ---------------------------------------------------------

export function saveAiMessage(userId, sessionId, role, body) {
  const id = newId();
  db.prepare(
    "INSERT INTO ai_messages (id, user_id, session_id, role, body) VALUES (?,?,?,?,?)"
  ).run(id, userId, sessionId, role, body);
  return id;
}

export function listAiMessages(userId, sessionId) {
  return db
    .prepare(
      "SELECT role, body, created_at FROM ai_messages WHERE user_id = ? AND session_id = ? ORDER BY created_at"
    )
    .all(userId, sessionId);
}

export function listAiSessions(userId) {
  return db
    .prepare(
      `SELECT session_id, MIN(created_at) AS started, COUNT(*) AS messages,
              (SELECT body FROM ai_messages m2 WHERE m2.user_id = m.user_id AND m2.session_id = m.session_id AND m2.role='user' ORDER BY created_at LIMIT 1) AS first_question
       FROM ai_messages m WHERE user_id = ?
       GROUP BY session_id ORDER BY started DESC LIMIT 50`
    )
    .all(userId);
}
