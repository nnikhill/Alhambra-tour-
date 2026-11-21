import { NextResponse } from "next/server";
import { z } from "zod";
import { guardApi } from "@/lib/admin/guard";
import { handleError, noStore } from "@/lib/admin/api";
import { ensureCategory, taxonomy } from "@/lib/blog/admin-repo";
import { getSiteId } from "@/lib/blog/repo";

export async function GET(req: Request) {
  const g = await guardApi(req);
  if ("error" in g) return g.error;
  try {
    return NextResponse.json(await taxonomy(), noStore);
  } catch (e) {
    return handleError(e);
  }
}

export async function POST(req: Request) {
  const g = await guardApi(req, "editor");
  if ("error" in g) return g.error;
  try {
    const { name } = z.object({ name: z.string().trim().min(1).max(60) }).parse(await req.json());
    const id = await ensureCategory((await getSiteId())!, name);
    return NextResponse.json({ id }, { status: 201, ...noStore });
  } catch (e) {
    return handleError(e);
  }
}
