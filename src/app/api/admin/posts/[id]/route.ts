import { NextResponse } from "next/server";
import { guardApi } from "@/lib/admin/guard";
import { handleError, idParam, noStore } from "@/lib/admin/api";
import { destroyPost, getAdminPost, postInput, restorePost, savePost, trashPost } from "@/lib/blog/admin-repo";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const g = await guardApi(req);
  if ("error" in g) return g.error;
  try {
    return NextResponse.json({ post: await getAdminPost(idParam((await params).id)) }, noStore);
  } catch (e) {
    return handleError(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const g = await guardApi(req);
  if ("error" in g) return g.error;
  try {
    const id = idParam((await params).id);
    const input = postInput.parse(await req.json());
    return NextResponse.json(await savePost(id, input, g.user), noStore);
  } catch (e) {
    return handleError(e);
  }
}

// Trash (default) or permanent delete (?permanent=1, admins only, trash first).
export async function DELETE(req: Request, { params }: Ctx) {
  const permanent = new URL(req.url).searchParams.get("permanent") === "1";
  const g = await guardApi(req, permanent ? "admin" : "editor");
  if ("error" in g) return g.error;
  try {
    const id = idParam((await params).id);
    if (permanent) await destroyPost(id);
    else await trashPost(id);
    return NextResponse.json({ ok: true }, noStore);
  } catch (e) {
    return handleError(e);
  }
}

// Restore from trash.
export async function PATCH(req: Request, { params }: Ctx) {
  const g = await guardApi(req, "editor");
  if ("error" in g) return g.error;
  try {
    const body = (await req.json().catch(() => ({}))) as { action?: string };
    if (body.action !== "restore") return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    await restorePost(idParam((await params).id));
    return NextResponse.json({ ok: true }, noStore);
  } catch (e) {
    return handleError(e);
  }
}
