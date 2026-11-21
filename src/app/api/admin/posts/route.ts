import { NextResponse } from "next/server";
import { guardApi } from "@/lib/admin/guard";
import { handleError, noStore } from "@/lib/admin/api";
import { listAdminPosts, postInput, savePost } from "@/lib/blog/admin-repo";

export async function GET(req: Request) {
  const g = await guardApi(req);
  if ("error" in g) return g.error;
  try {
    const u = new URL(req.url);
    const rows = await listAdminPosts({ q: u.searchParams.get("q")?.slice(0, 100) || undefined, status: u.searchParams.get("status") || undefined, trash: u.searchParams.get("trash") === "1" });
    return NextResponse.json({ posts: rows }, noStore);
  } catch (e) {
    return handleError(e);
  }
}

export async function POST(req: Request) {
  const g = await guardApi(req);
  if ("error" in g) return g.error;
  try {
    const input = postInput.parse(await req.json());
    const saved = await savePost(null, input, g.user);
    return NextResponse.json(saved, { status: 201, ...noStore });
  } catch (e) {
    return handleError(e);
  }
}
