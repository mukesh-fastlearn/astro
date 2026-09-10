/**
 * Golden Era Astro — AI chat backend.
 *
 * Sits between the static site and the Vertex gateway so the gateway key is
 * never shipped to a browser. Zero dependencies: Node 18+ built-ins only.
 *
 *   Browser  ->  Caddy /api/*  ->  this service  ->  Vertex gateway  ->  Gemini
 *
 * Env (see .env.example):
 *   VERTEX_BASE_URL   gateway base, e.g. https://design.rtechailabs.com/api/vertex
 *   VERTEX_API_KEY    the x-api-key value
 *   PORT              default 8787
 *   BIND              default 127.0.0.1 (Caddy proxies to it; never bind 0.0.0.0)
 */

import { createServer } from "node:http";

const PORT = Number(process.env.PORT || 8787);
const BIND = process.env.BIND || "127.0.0.1";
const BASE = (process.env.VERTEX_BASE_URL || "").replace(/\/+$/, "");
const KEY = process.env.VERTEX_API_KEY || "";

if (!BASE || !KEY) {
  console.error("FATAL: VERTEX_BASE_URL and VERTEX_API_KEY must be set.");
  process.exit(1);
}

// --- limits -----------------------------------------------------------------
// The gateway spends real GCP credits, so cap what a single caller can do.
const MAX_BODY_BYTES = 128 * 1024;
const MAX_MESSAGE_CHARS = 4000;
const MAX_HISTORY = 12;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12; // requests per IP per window

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > RATE_WINDOW_MS) {
    hits.set(ip, { start: now, n: 1 });
    return false;
  }
  rec.n += 1;
  return rec.n > RATE_MAX;
}
// keep the map from growing without bound
setInterval(() => {
  const cutoff = Date.now() - RATE_WINDOW_MS;
  for (const [ip, rec] of hits) if (rec.start < cutoff) hits.delete(ip);
}, RATE_WINDOW_MS).unref();

// --- prompt -----------------------------------------------------------------
const SYSTEM = `You are the astrologer for Golden Era Astro, a Vedic astrology site.

You are given a birth chart that has ALREADY been computed by a deterministic
astronomy engine (real ephemeris, Lahiri ayanamsa, sidereal zodiac, whole-sign
houses). Your job is interpretation and conversation ONLY.

Hard rules:
- NEVER calculate or invent planetary positions, degrees, nakshatras, dasha
  dates or chart placements. Use only what appears in the CHART DATA block.
- If asked about something not present in the chart data, say plainly that the
  chart provided does not contain it. Do not guess.
- Present remedies (gemstones, colours, mantras, donations, fasting, Lal Kitab
  measures) as TRADITIONAL practice, never as guaranteed outcomes, and never as
  medical, legal or financial advice.
- Do not predict death, terminal illness, or make absolute claims about
  disasters. Frame timing as tendencies and periods, not certainties.
- Be specific and grounded: cite the placement you are reasoning from, e.g.
  "Saturn in the 7th from Lagna" or "you are running Jupiter mahadasha".
- Answer in the language the user writes in. Keep replies focused; 2-4 short
  paragraphs unless the user asks for depth.
- If an "analysis.shadbala" block is present it is a COMPLETE six-bala
  Shadbala in rupas; you may cite it as such, including whether each planet
  meets its required minimum. If that block is ABSENT, only the partial
  "analysis.strength" figures exist — then you must NOT call them Shadbala,
  and should say the birth place is needed to compute the full figure.
- The Vedic and Western layers are different systems. Do not blend them or
  imply they agree.
- Lal Kitab uses fixed houses (1st house is always Aries), so its placements
  legitimately differ from the Parashari chart. Explain that if it comes up.`;

function buildPrompt(chart, messages, knowledge) {
  const convo = messages
    .slice(-MAX_HISTORY)
    .map((m) => `${m.role === "assistant" ? "Astrologer" : "User"}: ${m.content}`)
    .join("\n\n");

  const kb =
    Array.isArray(knowledge) && knowledge.length
      ? [
          "",
          "=== KNOWLEDGE BASE (retrieved for this question) ===",
          "Each line is subject | relation | object | basis. 'traditional-association'",
          "means recorded tradition, not established fact — say so when using it.",
          ...knowledge
            .slice(0, 60)
            .map((f) => `${f.subject} | ${f.relation} | ${f.object} | ${f.basis}`),
        ].join("\n")
      : "";

  return [
    "=== CHART DATA (authoritative, computed) ===",
    JSON.stringify(chart, null, 1),
    kb,
    "",
    "=== CONVERSATION ===",
    convo,
    "",
    "Astrologer:",
  ].join("\n");
}

// --- helpers ----------------------------------------------------------------
function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const parts = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("body too large"));
        req.destroy();
        return;
      }
      parts.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(parts).toString("utf8")));
    req.on("error", reject);
  });
}

async function callGateway(prompt) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 90_000);
  try {
    const r = await fetch(`${BASE}/text`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": KEY },
      // gemini-2.5-flash spends thinking tokens before it emits anything, so a
      // small budget comes back as an empty string. Keep this generous.
      body: JSON.stringify({
        prompt,
        system: SYSTEM,
        temperature: 0.7,
        maxOutputTokens: 4000,
      }),
      signal: ctrl.signal,
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`gateway ${r.status}: ${text.slice(0, 300)}`);
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("gateway returned non-JSON");
    }
    return (data.result || "").trim();
  } finally {
    clearTimeout(timer);
  }
}

// --- server -----------------------------------------------------------------
const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (url.pathname === "/api/health") {
    return send(res, 200, { ok: true, service: "astro-chat" });
  }

  if (url.pathname !== "/api/chat") return send(res, 404, { error: "not found" });
  if (req.method !== "POST") return send(res, 405, { error: "use POST" });

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown";

  if (rateLimited(ip)) {
    return send(res, 429, { error: "Too many questions just now. Try again in a minute." });
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(req));
  } catch {
    return send(res, 400, { error: "invalid request body" });
  }

  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  if (!messages.length) return send(res, 400, { error: "messages required" });

  const last = messages[messages.length - 1];
  if (!last || typeof last.content !== "string" || !last.content.trim()) {
    return send(res, 400, { error: "empty message" });
  }
  if (last.content.length > MAX_MESSAGE_CHARS) {
    return send(res, 400, { error: "message too long" });
  }

  const chart = payload.chart && typeof payload.chart === "object" ? payload.chart : null;
  if (!chart) {
    return send(res, 400, { error: "chart required — generate a kundli first" });
  }

  try {
    const reply = await callGateway(buildPrompt(chart, messages, payload.knowledge));
    if (!reply) return send(res, 502, { error: "The astrologer had nothing to say. Try rephrasing." });
    return send(res, 200, { reply });
  } catch (err) {
    console.error("[chat]", err.message);
    return send(res, 502, { error: "The astrologer is unavailable right now." });
  }
});

server.listen(PORT, BIND, () => {
  console.log(`astro-chat listening on ${BIND}:${PORT} -> ${BASE}`);
});
