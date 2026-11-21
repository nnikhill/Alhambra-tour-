// Client-side helper: read the image size in the browser, then POST it to
// /api/admin/upload (which re-checks type, size and sign-in on the server).
export async function uploadImage(file: File, alt: string, credit = "") {
  if (file.size > 5 * 1024 * 1024) throw new Error("Image is larger than 5 MB");
  let width = 0, height = 0;
  try {
    const bmp = await createImageBitmap(file);
    width = bmp.width;
    height = bmp.height;
    bmp.close();
  } catch {}
  const fd = new FormData();
  fd.append("file", file);
  fd.append("alt", alt);
  fd.append("credit", credit);
  if (width) fd.append("width", String(width));
  if (height) fd.append("height", String(height));
  const res = await fetch("/api/admin/upload/", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data as { url: string; alt: string; width: number | null; height: number | null };
}
