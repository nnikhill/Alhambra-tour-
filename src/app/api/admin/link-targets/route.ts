import { NextResponse } from "next/server";
import { guardApi } from "@/lib/admin/guard";
import { noStore } from "@/lib/admin/api";
import { linkTargets } from "@/lib/blog/link-targets";

export async function GET(req: Request) {
  const g = await guardApi(req);
  if ("error" in g) return g.error;
  return NextResponse.json(await linkTargets(), noStore);
}
