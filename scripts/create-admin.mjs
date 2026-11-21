// Create or update an admin user. Reads ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD
// (and optional ADMIN_ROLE) from .env.local, or from the command line.
//   ADMIN_EMAIL=you@example.com ADMIN_NAME="Your Name" ADMIN_PASSWORD='long-password' node scripts/create-admin.mjs
// Optional ADMIN_ROLE=admin|editor|writer (default admin). Password: 12+ characters.
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config({ path: ".env.local", quiet: true });
const { DATABASE_URL, ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD, ADMIN_ROLE = "admin" } = process.env;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error("Add ADMIN_EMAIL and ADMIN_PASSWORD to .env.local (see .env.example)");
if (ADMIN_PASSWORD.length < 12) throw new Error("Use a password of at least 12 characters");
if (!["admin", "editor", "writer"].includes(ADMIN_ROLE)) throw new Error("ADMIN_ROLE must be admin, editor or writer");
const sql = neon(DATABASE_URL);
const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
const email = ADMIN_EMAIL.trim().toLowerCase();
await sql`insert into users (email, name, role, password_hash) values (${email}, ${ADMIN_NAME || email}, ${ADMIN_ROLE}, ${hash})
  on conflict (email) do update set name = excluded.name, role = excluded.role, password_hash = excluded.password_hash`;
console.log(`User ${email} saved with role ${ADMIN_ROLE}.`);
