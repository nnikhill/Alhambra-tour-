"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PostRowActions({ id, slug, trash, live, isAdmin }: { id: number; slug: string; trash: boolean; live: boolean; isAdmin: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function call(method: string, query = "", body?: object) {
    setBusy(true);
    const res = await fetch(`/api/admin/posts/${id}/${query}`, { method, headers: body ? { "content-type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
    setBusy(false);
    if (!res.ok) alertBox((await res.json().catch(() => ({}))).error || "Something went wrong");
    router.refresh();
  }
  const a = "cursor-pointer rounded-lg px-2.5 py-1.5 text-[0.88rem] font-semibold hover:bg-soft disabled:opacity-50";
  if (trash)
    return (
      <div className="flex justify-end gap-1">
        <button disabled={busy} className={a} onClick={() => call("PATCH", "", { action: "restore" })}>Restore</button>
        {isAdmin && <button disabled={busy} className={a + " text-alert"} onClick={() => confirm("Delete this post forever? This cannot be undone.") && call("DELETE", "?permanent=1")}>Delete forever</button>}
      </div>
    );
  return (
    <div className="flex justify-end gap-1">
      <a className={a} href={`/admin/posts/${id}/preview`} target="_blank" rel="noopener">Preview</a>
      {live && <a className={a} href={`/blog/${slug}/`} target="_blank" rel="noopener">View</a>}
      <button disabled={busy} className={a + " text-alert"} onClick={() => confirm("Move this post to the trash? It will disappear from the blog.") && call("DELETE")}>Trash</button>
    </div>
  );
}

// Non-blocking error message (window.alert would block automation and is ugly).
function alertBox(msg: string) {
  const el = document.createElement("div");
  el.setAttribute("role", "alert");
  el.textContent = msg;
  el.className = "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-ink px-4 py-3 text-white shadow-lg";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 5000);
}
