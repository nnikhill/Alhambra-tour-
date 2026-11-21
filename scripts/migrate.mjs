// Applies drizzle/*.sql over Neon's HTTPS driver (works where port 5432 is
// blocked). Tracks applied files in _migrations. Usage: node scripts/migrate.mjs
import { neon } from "@neondatabase/serverless";
import { readdirSync, readFileSync } from "node:fs";
import { config } from "dotenv";
config({ path: ".env.local", quiet: true });
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const sql = neon(process.env.DATABASE_URL);
await sql`create table if not exists _migrations (name text primary key, applied_at timestamptz default now())`;
const done = new Set((await sql`select name from _migrations`).map((r) => r.name));
for (const file of readdirSync("drizzle").filter((f) => f.endsWith(".sql")).sort()) {
  if (done.has(file)) continue;
  const stmts = readFileSync(`drizzle/${file}`, "utf8").split("--> statement-breakpoint").map((s) => s.trim()).filter(Boolean);
  await sql.transaction(stmts.map((s) => sql.query(s)).concat([sql`insert into _migrations (name) values (${file})`]));
  console.log("applied", file, `(${stmts.length} statements)`);
}
console.log("migrations up to date");
