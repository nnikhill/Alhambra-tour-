import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { authAttempts, users } from "@/db/schema";

// Admin login: Auth.js v5, email + password checked against the bcrypt hash in
// the users table. JWT session (no session table), 12-hour lifetime.
// Throttling: 5 failed attempts per email or per IP in 15 minutes locks that
// key for 15 minutes. Stored in Postgres so it holds across serverless instances.

export type Role = "admin" | "editor" | "writer";

declare module "next-auth" {
  interface Session {
    user: { id: number; role: Role } & DefaultSession["user"];
  }
}

// Real bcrypt hash of a random string: compared when the email is unknown so
// the response time is the same whether or not the account exists.
const DUMMY_HASH = bcrypt.hashSync(crypto.randomUUID(), 12);
const MAX_FAILS = 5;

class Locked extends CredentialsSignin {
  code = "locked";
}

async function isLocked(keys: string[]) {
  if (!db) return false;
  const rows = await db.select().from(authAttempts).where(inArray(authAttempts.key, keys));
  return rows.some((r) => r.lockedUntil && r.lockedUntil.getTime() > Date.now());
}

async function recordFailure(keys: string[]) {
  if (!db) return;
  for (const key of keys) {
    await db
      .insert(authAttempts)
      .values({ key, count: 1 })
      .onConflictDoUpdate({
        target: authAttempts.key,
        set: {
          count: sql`case when ${authAttempts.windowStart} < now() - interval '15 minutes' then 1 else ${authAttempts.count} + 1 end`,
          windowStart: sql`case when ${authAttempts.windowStart} < now() - interval '15 minutes' then now() else ${authAttempts.windowStart} end`,
          lockedUntil: sql`case when (case when ${authAttempts.windowStart} < now() - interval '15 minutes' then 1 else ${authAttempts.count} + 1 end) >= ${MAX_FAILS} then now() + interval '15 minutes' else ${authAttempts.lockedUntil} end`,
        },
      });
  }
}

async function clearFailures(keys: string[]) {
  if (!db) return;
  await db.delete(authAttempts).where(inArray(authAttempts.key, keys));
}

const creds = z.object({ email: z.string().trim().toLowerCase().email().max(200), password: z.string().min(1).max(200) });

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: 12 * 60 * 60 },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw, request) {
        const parsed = creds.safeParse(raw);
        if (!parsed.success || !db) return null;
        const { email, password } = parsed.data;
        const ip = (request?.headers?.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
        const keys = [`email:${email}`, `ip:${ip}`];
        if (await isLocked(keys)) throw new Locked();
        const found = await db.select().from(users).where(eq(users.email, email)).limit(1);
        const user = found[0];
        // Compare against a dummy hash when the user doesn't exist, so timing
        // doesn't reveal which emails have accounts.
        const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !ok) {
          await recordFailure(keys);
          return null;
        }
        await clearFailures(keys);
        return { id: String(user.id), name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.uid = Number(user.id);
        token.role = (user as { role?: Role }).role ?? "writer";
      }
      return token;
    },
    session({ session, token }) {
      const u = session.user as unknown as { id: number; role: Role };
      u.id = token.uid as number;
      u.role = token.role as Role;
      return session;
    },
  },
});
