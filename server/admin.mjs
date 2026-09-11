/**
 * Admin analytics.
 *
 * Every figure here is derived from the tables the app already writes — there
 * is no separate analytics pipeline and no third-party tracker. That keeps the
 * numbers honest (they reconcile against the ledger and the message tables)
 * and means no user data leaves the box.
 *
 * Credits are reported separately from money. They are not revenue until
 * Razorpay is connected: the 501 signup grant is a gift, not a sale, and
 * conflating the two would make the dashboard lie.
 */

import { db } from "./db.mjs";
import { otpStatus } from "./otp.mjs";

const one = (sql, ...args) => db.prepare(sql).get(...args);
const all = (sql, ...args) => db.prepare(sql).all(...args);

export function overview() {
  const users = one("SELECT COUNT(*) AS n FROM users WHERE role = 'user'").n;
  const astrologers = one("SELECT COUNT(*) AS n FROM users WHERE role = 'astrologer'").n;
  const admins = one("SELECT COUNT(*) AS n FROM users WHERE role = 'admin'").n;

  const newToday = one("SELECT COUNT(*) AS n FROM users WHERE created_at >= date('now')").n;
  const new7 = one("SELECT COUNT(*) AS n FROM users WHERE created_at >= date('now','-7 day')").n;
  const new30 = one("SELECT COUNT(*) AS n FROM users WHERE created_at >= date('now','-30 day')").n;

  const withBirth = one("SELECT COUNT(*) AS n FROM birth_profiles").n;
  const withChart = one("SELECT COUNT(*) AS n FROM charts").n;

  const consults = one("SELECT COUNT(*) AS n FROM consultations").n;
  const openConsults = one("SELECT COUNT(*) AS n FROM consultations WHERE status = 'open'").n;
  const assigned = one("SELECT COUNT(*) AS n FROM consultations WHERE status = 'assigned'").n;
  const closed = one("SELECT COUNT(*) AS n FROM consultations WHERE status = 'closed'").n;

  const consultMessages = one("SELECT COUNT(*) AS n FROM consultation_messages").n;
  const aiMessages = one("SELECT COUNT(*) AS n FROM ai_messages WHERE role = 'user'").n;
  const aiSessions = one("SELECT COUNT(DISTINCT session_id) AS n FROM ai_messages").n;

  const creditsOutstanding = one("SELECT COALESCE(SUM(balance),0) AS n FROM wallets").n;
  const creditsGranted = one("SELECT COALESCE(SUM(delta),0) AS n FROM wallet_ledger WHERE delta > 0").n;
  const creditsSpent = one("SELECT COALESCE(-SUM(delta),0) AS n FROM wallet_ledger WHERE delta < 0").n;
  const spentOnAi = one("SELECT COALESCE(-SUM(delta),0) AS n FROM wallet_ledger WHERE reason = 'ai_chat'").n;
  const spentOnAstro = one("SELECT COALESCE(-SUM(delta),0) AS n FROM wallet_ledger WHERE reason = 'astrologer_chat'").n;
  const refunded = one("SELECT COALESCE(SUM(delta),0) AS n FROM wallet_ledger WHERE reason LIKE '%refund%'").n;

  // A wallet whose balance disagrees with its ledger means something wrote a
  // balance outside a transaction. Surfacing it beats discovering it later.
  const drift = all(`
    SELECT w.user_id, w.balance, COALESCE(SUM(l.delta),0) AS ledger_sum
    FROM wallets w LEFT JOIN wallet_ledger l ON l.user_id = w.user_id
    GROUP BY w.user_id HAVING w.balance != COALESCE(SUM(l.delta),0)
  `);

  const verifiedEmail = safeCount("SELECT COUNT(*) AS n FROM users WHERE email_verified = 1");
  const verifiedPhone = safeCount("SELECT COUNT(*) AS n FROM users WHERE phone_verified = 1");

  return {
    users: { total: users + astrologers + admins, users, astrologers, admins, newToday, new7, new30 },
    engagement: {
      withBirthProfile: withBirth,
      withSavedChart: withChart,
      profileCompletionPct: users ? Math.round((withBirth / users) * 100) : 0,
      aiSessions,
      aiQuestions: aiMessages,
      consultMessages,
    },
    consultations: { total: consults, open: openConsults, assigned, closed },
    credits: {
      outstanding: creditsOutstanding,
      granted: creditsGranted,
      spent: creditsSpent,
      spentOnAi,
      spentOnAstrologers: spentOnAstro,
      refunded,
      note: "Credits are not revenue. The signup grant is a gift; nothing is sold until payments are connected.",
      ledgerDrift: drift,
    },
    verification: { email: verifiedEmail, phone: verifiedPhone, providers: otpStatus() },
  };
}

/** email_verified may not exist on a database created before the migration. */
function safeCount(sql) {
  try {
    return one(sql).n;
  } catch {
    return 0;
  }
}

/** Daily signups and spend for the last N days, for the chart. */
export function timeseries(days = 30) {
  const signups = all(
    `SELECT date(created_at) AS day, COUNT(*) AS n FROM users
     WHERE created_at >= date('now', ?) GROUP BY day ORDER BY day`,
    `-${days} day`
  );
  const spend = all(
    `SELECT date(created_at) AS day, -SUM(delta) AS credits FROM wallet_ledger
     WHERE delta < 0 AND created_at >= date('now', ?) GROUP BY day ORDER BY day`,
    `-${days} day`
  );
  const messages = all(
    `SELECT date(created_at) AS day, COUNT(*) AS n FROM consultation_messages
     WHERE created_at >= date('now', ?) GROUP BY day ORDER BY day`,
    `-${days} day`
  );

  // Fill gaps so the chart has a continuous axis.
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10);
    out.push({
      day: d,
      signups: signups.find((r) => r.day === d)?.n ?? 0,
      creditsSpent: spend.find((r) => r.day === d)?.credits ?? 0,
      messages: messages.find((r) => r.day === d)?.n ?? 0,
    });
  }
  return out;
}

export function listUsers({ role = null, q = null, limit = 100, offset = 0 } = {}) {
  const where = [];
  const args = [];
  if (role) { where.push("u.role = ?"); args.push(role); }
  if (q) { where.push("(u.email LIKE ? OR u.name LIKE ?)"); args.push(`%${q}%`, `%${q}%`); }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const rows = all(
    `SELECT u.id, u.email, u.name, u.phone, u.role, u.created_at,
            COALESCE(w.balance, 0) AS balance,
            (SELECT COUNT(*) FROM consultations c WHERE c.user_id = u.id) AS consultations,
            (SELECT COUNT(*) FROM ai_messages m WHERE m.user_id = u.id AND m.role='user') AS ai_questions,
            (SELECT COALESCE(-SUM(delta),0) FROM wallet_ledger l WHERE l.user_id = u.id AND l.delta < 0) AS credits_spent,
            (bp.user_id IS NOT NULL) AS has_birth_profile
     FROM users u
     LEFT JOIN wallets w ON w.user_id = u.id
     LEFT JOIN birth_profiles bp ON bp.user_id = u.id
     ${clause}
     ORDER BY u.created_at DESC LIMIT ? OFFSET ?`,
    ...args, limit, offset
  );

  const total = one(
    `SELECT COUNT(*) AS n FROM users u ${clause}`,
    ...args
  ).n;

  return { rows, total };
}

export function astrologerStats() {
  return all(`
    SELECT u.id, u.name, u.email, u.expertise, u.is_available, u.created_at,
           (SELECT COUNT(*) FROM consultations c WHERE c.astrologer_id = u.id) AS consultations,
           (SELECT COUNT(DISTINCT c.user_id) FROM consultations c WHERE c.astrologer_id = u.id) AS clients,
           (SELECT COUNT(*) FROM consultation_messages m
              JOIN consultations c ON c.id = m.consultation_id
              WHERE c.astrologer_id = u.id AND m.sender_id = u.id) AS replies,
           (SELECT COALESCE(-SUM(l.delta),0) FROM wallet_ledger l
              WHERE l.reason = 'astrologer_chat' AND l.ref IN (
                SELECT m.id FROM consultation_messages m
                JOIN consultations c ON c.id = m.consultation_id
                WHERE c.astrologer_id = u.id)) AS credits_earned_for_site
    FROM users u WHERE u.role = 'astrologer'
    ORDER BY consultations DESC, u.name
  `);
}

export function recentLedger(limit = 100) {
  return all(
    `SELECT l.created_at, l.delta, l.balance_after, l.reason, u.name, u.email, u.role
     FROM wallet_ledger l JOIN users u ON u.id = l.user_id
     ORDER BY l.id DESC LIMIT ?`,
    limit
  );
}

export function topSpenders(limit = 10) {
  return all(
    `SELECT u.name, u.email, COALESCE(-SUM(l.delta),0) AS spent, COALESCE(w.balance,0) AS balance
     FROM users u
     JOIN wallet_ledger l ON l.user_id = u.id AND l.delta < 0
     LEFT JOIN wallets w ON w.user_id = u.id
     GROUP BY u.id ORDER BY spent DESC LIMIT ?`,
    limit
  );
}

/** Storage and operational facts an owner should be able to see at a glance. */
export function systemInfo() {
  const size = one("SELECT page_count * page_size AS bytes FROM pragma_page_count(), pragma_page_size()");
  return {
    dbBytes: size?.bytes ?? 0,
    tables: all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").map((r) => r.name),
    sessionsActive: one("SELECT COUNT(*) AS n FROM sessions WHERE expires_at > datetime('now')").n,
    nodeVersion: process.version,
    uptimeSeconds: Math.round(process.uptime()),
  };
}
