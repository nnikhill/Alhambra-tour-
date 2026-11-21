import { NextResponse } from "next/server";
import { guardApi } from "@/lib/admin/guard";
import { handleError, idParam, noStore } from "@/lib/admin/api";
import { getAdminPost, listRevisions } from "@/lib/blog/admin-repo";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const g = await guardApi(req);
  if ("error" in g) return g.error;
  try {
    const id = idParam((await params).id);
    await getAdminPost(id); // 404 if not this site's post
    return NextResponse.json({ revisions: await listRevisions(id) }, noStore);
  } catch (e) {
    return handleError(e);
  }
}
