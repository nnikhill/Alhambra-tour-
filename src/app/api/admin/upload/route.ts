import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { db } from "@/db";
import { media } from "@/db/schema";
import { guardApi } from "@/lib/admin/guard";
import { handleError, noStore } from "@/lib/admin/api";
import { AdminError } from "@/lib/blog/admin-repo";
import { getSiteId } from "@/lib/blog/repo";
import { slugify } from "@/lib/blog/sanitize";

// Image upload for featured images and in-post images.
// Checks: signed in, ≤ 5 MB, real image bytes (magic numbers, not just the
// declared type), alt text required. Stored in Vercel Blob when
// BLOB_READ_WRITE_TOKEN is set; in local development only, falls back to
// /public/uploads so the editor can be tried without a Blob store.

const MAX_BYTES = 5 * 1024 * 1024;

function sniff(b: Uint8Array): { ext: string; type: string } | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: "jpg", type: "image/jpeg" };
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { ext: "png", type: "image/png" };
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return { ext: "webp", type: "image/webp" };
  if (b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70 && b[8] === 0x61 && b[9] === 0x76 && b[10] === 0x69 && b[11] === 0x66) return { ext: "avif", type: "image/avif" };
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return { ext: "gif", type: "image/gif" };
  return null; // SVG deliberately not allowed (can carry script)
}

const meta = z.object({
  alt: z.string().trim().min(1, "Alt text is required").max(200),
  credit: z.string().trim().max(200).optional().default(""),
  width: z.coerce.number().int().positive().max(20000).optional(),
  height: z.coerce.number().int().positive().max(20000).optional(),
});

export async function POST(req: Request) {
  const g = await guardApi(req);
  if ("error" in g) return g.error;
  try {
    const len = Number(req.headers.get("content-length") || 0);
    if (len > MAX_BYTES + 64 * 1024) throw new AdminError("Image is larger than 5 MB", 413);
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) throw new AdminError("No file uploaded");
    if (file.size > MAX_BYTES) throw new AdminError("Image is larger than 5 MB", 413);
    const m = meta.parse({ alt: form.get("alt") ?? "", credit: form.get("credit") ?? "", width: form.get("width") || undefined, height: form.get("height") || undefined });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const kind = sniff(bytes);
    if (!kind) throw new AdminError("Only JPEG, PNG, WebP, AVIF or GIF images are allowed", 415);

    const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
    const key = `blog/${new Date().toISOString().slice(0, 7)}/${base}-${crypto.randomUUID().slice(0, 8)}.${kind.ext}`;
    let url: string;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(key, Buffer.from(bytes), { access: "public", contentType: kind.type, addRandomSuffix: false, cacheControlMaxAge: 31536000 });
      url = blob.url;
    } else if (process.env.NODE_ENV !== "production") {
      const dest = path.join(process.cwd(), "public", "uploads", key);
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, bytes);
      url = `/uploads/${key}`;
    } else {
      throw new AdminError("Image storage isn't configured. Add a Vercel Blob store (BLOB_READ_WRITE_TOKEN).", 500);
    }

    const siteId = await getSiteId();
    if (db && siteId) {
      await db.insert(media).values({ siteId, url, alt: m.alt, credit: m.credit || "Own photo", width: m.width ?? null, height: m.height ?? null, ownPhoto: true });
    }
    return NextResponse.json({ url, alt: m.alt, width: m.width ?? null, height: m.height ?? null }, { status: 201, ...noStore });
  } catch (e) {
    return handleError(e);
  }
}
