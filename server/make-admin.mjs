/**
 * Grant or revoke admin access.
 *
 * Admin is never self-service — the register endpoint hard-codes the role to
 * "user", so the only way to create the first admin is here, on the box.
 *
 *   node make-admin.mjs promote <email>
 *   node make-admin.mjs demote  <email>
 *   node make-admin.mjs list
 */
import { db, initDb } from "./db.mjs";

initDb();
const [, , cmd, email] = process.argv;

if (cmd === "list") {
  const rows = db.prepare("SELECT email, name, role, created_at FROM users WHERE role IN ('admin','astrologer') ORDER BY role, email").all();
  if (!rows.length) console.log("No admins or astrologers yet.");
  for (const r of rows) console.log(`${r.role.padEnd(11)} ${r.email.padEnd(32)} ${r.name}`);
  process.exit(0);
}

if (!email || !["promote", "demote"].includes(cmd)) {
  console.error("usage: node make-admin.mjs promote|demote <email>\n       node make-admin.mjs list");
  process.exit(1);
}

const user = db.prepare("SELECT id FROM users WHERE email = ?").get(email.toLowerCase());
if (!user) {
  console.error(`No user with email ${email}. They must register first.`);
  process.exit(1);
}

if (cmd === "demote") {
  const admins = db.prepare("SELECT COUNT(*) AS n FROM users WHERE role = 'admin'").get().n;
  if (admins <= 1) {
    console.error("Refusing — that is the only admin, and removing it would lock everyone out of the panel.");
    process.exit(1);
  }
}

db.prepare("UPDATE users SET role = ? WHERE id = ?").run(cmd === "promote" ? "admin" : "user", user.id);
console.log(`${email} is now ${cmd === "promote" ? "an admin" : "a regular user"}.`);
