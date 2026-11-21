import { NextResponse } from "next/server";
import { guardApi } from "@/lib/admin/guard";
import { handleError, idParam, noStore } from "@/lib/admin/api";
import { getAdminPost, getRevision } from "@/lib/blog/admin-repo";

// Returns a revision snapshot; the editor loads it into the form, and the
// user saves to restore it (which itself creates a new revision).
export async function GET(req: Request, { params }: { params: Promise<{ id: string; revId: string }> }) {
  const g = await guardApi(req);
  if ("error" in g) return g.error;
  try {
    const p = await params;
    const id = idParam(p.id);
    await getAdminPost(id);
    return NextResponse.json({ snapshot: await getRevision(id, idParam(p.revId)) }, noStore);
  } catch (e) {
    return handleError(e);
  }
}
