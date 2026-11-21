import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AdminError } from "@/lib/blog/admin-repo";

// Uniform JSON errors for admin routes: validation → 400 with field messages,
// AdminError → its status, anything else → 500 without leaking internals.
export function handleError(e: unknown) {
  if (e instanceof ZodError) {
    return NextResponse.json({ error: e.issues.map((i) => `${i.path.join(".") || "input"}: ${i.message}`).join("; ") }, { status: 400 });
  }
  if (e instanceof AdminError) return NextResponse.json({ error: e.message }, { status: e.status });
  console.error("[admin api]", e);
  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
}

export function idParam(raw: string) {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) throw new AdminError("Bad id", 400);
  return id;
}

export const noStore = { headers: { "Cache-Control": "no-store" } };
