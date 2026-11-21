import { NextResponse } from "next/server";
import { guardApi } from "@/lib/admin/guard";
import { handleError, noStore } from "@/lib/admin/api";
import { authorInput, saveAuthor } from "@/lib/blog/admin-repo";

export async function POST(req: Request) {
  const g = await guardApi(req, "admin");
  if ("error" in g) return g.error;
  try {
    await saveAuthor(authorInput.parse(await req.json()));
    return NextResponse.json({ ok: true }, noStore);
  } catch (e) {
    return handleError(e);
  }
}
