"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type A = { id?: number; name: string; bio: string; photoUrl: string };

export function AuthorForm({ author }: { author: A }) {
  const router = useRouter();
  const [v, setV] = useState(author);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const cls = "mt-1 w-full rounded-xl border border-line bg-white px-3 py-2 text-[0.93rem] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/admin/authors/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...v, photoUrl: v.photoUrl || null }) });
    setBusy(false);
    const data = await res.json().catch(() => ({}));
    setMsg(res.ok ? "Saved." : data.error || "Save failed");
    if (res.ok) {
      if (!author.id) setV({ name: "", bio: "", photoUrl: "" });
      router.refresh();
    }
  }
  return (
    <form onSubmit={save} className="rounded-2xl border border-line bg-white p-4">
      <h2 className="font-bold">{author.id ? author.name : "Add an author"}</h2>
      <label className="mt-3 block text-[0.88rem] font-semibold">Name<input required maxLength={80} value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} className={cls} /></label>
      <label className="mt-3 block text-[0.88rem] font-semibold">Bio<textarea required maxLength={600} rows={3} value={v.bio} onChange={(e) => setV({ ...v, bio: e.target.value })} className={cls} /></label>
      <label className="mt-3 block text-[0.88rem] font-semibold">Photo URL (optional)<input value={v.photoUrl} onChange={(e) => setV({ ...v, photoUrl: e.target.value })} placeholder="https://" className={cls} /></label>
      <div className="mt-3 flex items-center gap-3">
        <button disabled={busy} className="btn btn-primary h-10 px-4 disabled:opacity-60">{busy ? "Saving…" : "Save"}</button>
        {msg && <span role="status" className="text-[0.88rem] font-semibold">{msg}</span>}
      </div>
    </form>
  );
}
