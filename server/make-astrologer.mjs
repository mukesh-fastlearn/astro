/**
 * Grant or revoke astrologer access. Astrologer accounts are deliberately not
 * self-service — the register endpoint ignores any role in the request body,
 * because anyone could otherwise claim to be an astrologer and read clients'
 * birth charts.
 *
 *   node make-astrologer.mjs promote <email> ["bio"] ["expertise"]
 *   node make-astrologer.mjs demote  <email>
 *   node make-astrologer.mjs list
 */
import { db, initDb } from "./db.mjs";

initDb();
const [, , cmd, email, bio, expertise] = process.argv;

if (cmd === "list") {
  const rows = db.prepare("SELECT email, name, role, is_available FROM users ORDER BY role, email").all();
  for (const r of rows) console.log(`${r.role.padEnd(11)} ${r.email.padEnd(30)} ${r.name}`);
  process.exit(0);
}

if (!email || !["promote", "demote"].includes(cmd)) {
  console.error("usage: node make-astrologer.mjs promote|demote <email> [bio] [expertise]\n       node make-astrologer.mjs list");
  process.exit(1);
}

const user = db.prepare("SELECT id, email FROM users WHERE email = ?").get(email.toLowerCase());
if (!user) {
  console.error(`No user with email ${email}. They must register first.`);
  process.exit(1);
}

if (cmd === "promote") {
  db.prepare("UPDATE users SET role='astrologer', bio=COALESCE(?, bio), expertise=COALESCE(?, expertise) WHERE id=?")
    .run(bio ?? null, expertise ?? null, user.id);
  console.log(`${email} is now an astrologer.`);
} else {
  db.prepare("UPDATE users SET role='user' WHERE id=?").run(user.id);
  console.log(`${email} is now a regular user.`);
}
