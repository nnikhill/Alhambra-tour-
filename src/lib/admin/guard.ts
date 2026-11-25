import "server-only";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth, type Role } from "@/auth";

// Every admin page and API route goes through one of these. Checks run on the
// server; the UI hiding buttons is only cosmetic.

const RANK: Record<Role, number> = { writer: 1, editor: 2, admin: 3 };

/** For admin pages (server components): redirect to login if not signed in. */
export async function requirePageUser(min: Role = "writer") {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");
  if (RANK[session.user.role] < RANK[min]) redirect("/admin/posts?error=forbidden");
  return session.user;
}

type Guarded = { user: { id: number; role: Role; name?: string | null } } | { error: NextResponse };

/** For admin API routes: auth + role + same-origin check on writes (CSRF). */
export async function guardApi(req: Request, min: Role = "writer"): Promise<Guarded> {
  if (req.method !== "GET" && req.method !== "HEAD") {
    const origin = req.headers.get("origin");
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    let originHost = "";
    try {
      originHost = origin ? new URL(origin).host : "";
    } catch {} // "null" or garbage: treated as a foreign origin
    if (!originHost || !host || originHost !== host) {
      return { error: NextResponse.json({ error: "Bad origin" }, { status: 403 }) };
    }
  }
  const session = await auth();
  if (!session?.user?.id) return { error: NextResponse.json({ error: "Not signed in" }, { status: 401 }) };
  if (RANK[session.user.role] < RANK[min]) return { error: NextResponse.json({ error: "Not allowed for your role" }, { status: 403 }) };
  return { user: { id: session.user.id, role: session.user.role, name: session.user.name } };
}

export const canPublish = (role: Role) => RANK[role] >= RANK.editor;
