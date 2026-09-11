/**
 * HTTP API: auth, profile, wallet, consultations and astrologer panel.
 *
 * Route guards live here, on the server. The frontend is a static export, so
 * client-side redirects are convenience only — every authorisation decision is
 * made in this file, and a request that skips the UI gets the same answer.
 */

import {
  db, initDb, newId, createUser, findUserByEmail, findUserById, publicUser,
  verifyPassword, createSession, userForSession, destroySession, pruneSessions,
  saveBirthProfile, getBirthProfile, saveChart, getChart,
  getBalance, applyCredits, ledger,
  createConsultation, listConsultationsForUser, listConsultationsForAstrologer,
  getConsultation, claimConsultation, closeConsultation, listMessages, postMessage,
  saveAiMessage, listAiMessages, listAiSessions,
  SIGNUP_CREDITS, COST_PER_MESSAGE,
} from "./db.mjs";

initDb();
setInterval(pruneSessions, 6 * 3600_000).unref();

const COOKIE = "astro_session";
const isProd = process.env.NODE_ENV !== "development";

export function send(res, code, obj, extraHeaders = {}) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body),
    ...extraHeaders,
  });
  res.end(body);
}

function parseCookies(req) {
  const out = {};
  const raw = req.headers.cookie;
  if (!raw) return out;
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function sessionCookie(token, maxAgeSec) {
  const bits = [
    `${COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAgeSec}`,
  ];
  if (isProd) bits.push("Secure");
  return bits.join("; ");
}

export function currentUser(req) {
  return userForSession(parseCookies(req)[COOKIE]);
}

function requireAuth(req, res) {
  const u = currentUser(req);
  if (!u) {
    send(res, 401, { error: "Please sign in." });
    return null;
  }
  return u;
}

function requireRole(req, res, role) {
  const u = requireAuth(req, res);
  if (!u) return null;
  if (u.role !== role && u.role !== "admin") {
    send(res, 403, { error: "Not allowed." });
    return null;
  }
  return u;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handle an API route. Returns true when the request was handled, so the
 * caller can fall through to its own routes otherwise.
 */
export async function handleApi(req, res, url, body) {
  const p = url.pathname;
  const m = req.method;

  // --- auth -----------------------------------------------------------------

  if (p === "/api/auth/register" && m === "POST") {
    const { email, password, name, phone, role } = body || {};
    if (!EMAIL_RE.test(String(email || ""))) return send(res, 400, { error: "Enter a valid email address." }), true;
    if (String(password || "").length < 8) return send(res, 400, { error: "Password must be at least 8 characters." }), true;
    if (!String(name || "").trim()) return send(res, 400, { error: "Name is required." }), true;
    if (findUserByEmail(email)) return send(res, 409, { error: "That email is already registered." }), true;

    // Astrologer accounts are not self-service — anyone could claim to be one.
    const safeRole = role === "astrologer" ? "user" : "user";

    const id = createUser({ email, password, name: String(name).trim(), phone: phone || null, role: safeRole });
    const { token, expires } = createSession(id);
    return send(
      res, 201,
      { user: publicUser(findUserById(id)), balance: SIGNUP_CREDITS, signupBonus: SIGNUP_CREDITS },
      { "set-cookie": sessionCookie(token, 30 * 86400) }
    ), true;
  }

  if (p === "/api/auth/login" && m === "POST") {
    const { email, password } = body || {};
    const u = findUserByEmail(email || "");
    // Same message either way — do not confirm which emails exist.
    if (!u || !verifyPassword(String(password || ""), u.password_hash)) {
      return send(res, 401, { error: "Email or password is incorrect." }), true;
    }
    const { token } = createSession(u.id);
    return send(
      res, 200,
      { user: publicUser(u), balance: getBalance(u.id) },
      { "set-cookie": sessionCookie(token, 30 * 86400) }
    ), true;
  }

  if (p === "/api/auth/logout" && m === "POST") {
    destroySession(parseCookies(req)[COOKIE]);
    return send(res, 200, { ok: true }, { "set-cookie": sessionCookie("", 0) }), true;
  }

  if (p === "/api/auth/me" && m === "GET") {
    const u = currentUser(req);
    if (!u) return send(res, 200, { user: null }), true;
    return send(res, 200, {
      user: publicUser(u),
      balance: getBalance(u.id),
      birthProfile: getBirthProfile(u.id) ?? null,
      costPerMessage: COST_PER_MESSAGE,
    }), true;
  }

  // --- profile and chart ----------------------------------------------------

  if (p === "/api/profile/birth" && m === "POST") {
    const u = requireAuth(req, res); if (!u) return true;
    const { dob, tob, pob, latitude, longitude, tzOffset, gender } = body || {};
    if (!dob || !tob || !pob || typeof latitude !== "number" || typeof longitude !== "number") {
      return send(res, 400, { error: "Date, time and place of birth are all required." }), true;
    }
    saveBirthProfile(u.id, { dob, tob, pob, latitude, longitude, tzOffset, gender });
    return send(res, 200, { ok: true, birthProfile: getBirthProfile(u.id) }), true;
  }

  // The browser computes the chart (the engine is client-side), then stores it
  // so an astrologer later sees exactly what the user saw.
  if (p === "/api/profile/chart" && m === "POST") {
    const u = requireAuth(req, res); if (!u) return true;
    if (!body?.chart || typeof body.chart !== "object") {
      return send(res, 400, { error: "chart required" }), true;
    }
    saveChart(u.id, body.chart);
    return send(res, 200, { ok: true }), true;
  }

  if (p === "/api/profile/chart" && m === "GET") {
    const u = requireAuth(req, res); if (!u) return true;
    return send(res, 200, { chart: getChart(u.id) }), true;
  }

  // --- wallet ---------------------------------------------------------------

  if (p === "/api/wallet" && m === "GET") {
    const u = requireAuth(req, res); if (!u) return true;
    return send(res, 200, {
      balance: getBalance(u.id),
      costPerMessage: COST_PER_MESSAGE,
      ledger: ledger(u.id, 50),
    }), true;
  }

  // Placeholder until Razorpay is wired. Deliberately refuses in production so
  // it cannot become an accidental free-credits endpoint.
  if (p === "/api/wallet/recharge" && m === "POST") {
    const u = requireAuth(req, res); if (!u) return true;
    if (process.env.ALLOW_TEST_RECHARGE !== "1") {
      return send(res, 501, {
        error: "Payments are not connected yet. Razorpay integration is pending.",
      }), true;
    }
    const amount = Math.max(1, Math.min(10000, Number(body?.amount) || 0));
    const balance = applyCredits(u.id, amount, "test_recharge");
    return send(res, 200, { balance }), true;
  }

  // --- consultations (user side) --------------------------------------------

  if (p === "/api/consultations" && m === "GET") {
    const u = requireAuth(req, res); if (!u) return true;
    const rows = u.role === "astrologer" || u.role === "admin"
      ? listConsultationsForAstrologer(u.id)
      : listConsultationsForUser(u.id);
    return send(res, 200, { consultations: rows }), true;
  }

  if (p === "/api/consultations" && m === "POST") {
    const u = requireAuth(req, res); if (!u) return true;
    const subject = String(body?.subject || "").trim();
    if (!subject) return send(res, 400, { error: "Tell the astrologer what you would like to discuss." }), true;
    if (!getBirthProfile(u.id)) {
      return send(res, 400, { error: "Save your birth details first so the astrologer can see your chart." }), true;
    }
    const id = createConsultation(u.id, subject.slice(0, 300));
    return send(res, 201, { id }), true;
  }

  const consultMatch = p.match(/^\/api\/consultations\/([a-f0-9]{32})(\/[a-z]+)?$/);
  if (consultMatch) {
    const u = requireAuth(req, res); if (!u) return true;
    const id = consultMatch[1];
    const sub = consultMatch[2];
    const c = getConsultation(id);
    if (!c) return send(res, 404, { error: "Consultation not found." }), true;

    const isOwner = c.user_id === u.id;
    const isAstro = u.role === "astrologer" || u.role === "admin";
    const isAssigned = c.astrologer_id === u.id;
    // An astrologer may read an unclaimed inquiry; otherwise it must be theirs.
    if (!isOwner && !(isAstro && (isAssigned || c.astrologer_id === null))) {
      return send(res, 403, { error: "Not allowed." }), true;
    }

    if (!sub && m === "GET") {
      // The astrologer gets the user's stored chart alongside the thread.
      const chart = isAstro ? getChart(c.user_id) : null;
      const profile = isAstro ? getBirthProfile(c.user_id) : null;
      return send(res, 200, {
        consultation: c,
        messages: listMessages(id),
        userChart: chart,
        userBirthProfile: profile,
      }), true;
    }

    if (sub === "/messages" && m === "GET") {
      return send(res, 200, { messages: listMessages(id, url.searchParams.get("since")) }), true;
    }

    if (sub === "/messages" && m === "POST") {
      const text = String(body?.body || "").trim();
      if (!text) return send(res, 400, { error: "Message is empty." }), true;
      if (text.length > 4000) return send(res, 400, { error: "Message is too long." }), true;
      if (c.status === "closed") return send(res, 409, { error: "This consultation is closed." }), true;

      // Only the user is charged; the astrologer replies free.
      const charge = isOwner ? COST_PER_MESSAGE : 0;
      try {
        postMessage({
          consultationId: id,
          senderId: u.id,
          senderRole: isOwner ? "user" : "astrologer",
          body: text,
          charge,
        });
      } catch (e) {
        if (e.message === "INSUFFICIENT_CREDITS") {
          return send(res, 402, {
            error: `You need ${COST_PER_MESSAGE} credits to send a message. Balance: ${e.balance}.`,
            balance: e.balance,
          }), true;
        }
        throw e;
      }
      return send(res, 201, { messages: listMessages(id), balance: getBalance(u.id) }), true;
    }

    if (sub === "/claim" && m === "POST") {
      if (!isAstro) return send(res, 403, { error: "Not allowed." }), true;
      const ok = claimConsultation(id, u.id);
      return send(res, ok ? 200 : 409, ok ? { ok: true } : { error: "Already claimed by another astrologer." }), true;
    }

    if (sub === "/close" && m === "POST") {
      if (!isOwner && !isAssigned && u.role !== "admin") return send(res, 403, { error: "Not allowed." }), true;
      closeConsultation(id);
      return send(res, 200, { ok: true }), true;
    }
  }

  // --- astrologer directory -------------------------------------------------

  if (p === "/api/astrologers" && m === "GET") {
    const rows = db
      .prepare(
        "SELECT id, name, bio, expertise, is_available FROM users WHERE role = 'astrologer' ORDER BY is_available DESC, name"
      )
      .all();
    return send(res, 200, { astrologers: rows }), true;
  }

  // --- AI chat history ------------------------------------------------------

  if (p === "/api/ai/sessions" && m === "GET") {
    const u = requireAuth(req, res); if (!u) return true;
    return send(res, 200, { sessions: listAiSessions(u.id) }), true;
  }

  if (p === "/api/ai/history" && m === "GET") {
    const u = requireAuth(req, res); if (!u) return true;
    const sid = url.searchParams.get("session");
    if (!sid) return send(res, 400, { error: "session required" }), true;
    return send(res, 200, { messages: listAiMessages(u.id, sid) }), true;
  }

  return false;
}

export { COST_PER_MESSAGE, SIGNUP_CREDITS, saveAiMessage, getBalance, applyCredits, newId, requireAuth };
