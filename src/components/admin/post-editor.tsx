"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, ExternalLink, Plus, Trash2, Upload } from "lucide-react";
import { RichEditor, type LinkTargets } from "./rich-editor";
import { uploadImage } from "./upload";
import { seoChecks } from "@/lib/blog/seo-checks";

export type FormState = {
  title: string; slug: string; excerpt: string; content: string;
  status: "draft" | "scheduled" | "published"; publishedAt: string; // datetime-local in the browser's zone, "" = now
  categoryId: number | null; newCategory: string; tags: string; authorId: number | null;
  featuredImage: string; featuredSrcSet: string | null; featuredAlt: string; featuredCredit: string; featuredWidth: number | null; featuredHeight: number | null;
  metaTitle: string; metaDescription: string; focusKeyword: string; canonicalUrl: string; noindex: boolean;
  ogTitle: string; ogDescription: string; ogImage: string;
  booking: { title: string; text: string; label: string; query: string } | null;
  faq: { q: string; a: string }[]; relatedIds: number[]; featured: boolean; revisionNote: string;
};

type Taxonomy = {
  categories: { id: number; name: string }[];
  authors: { id: number; name: string }[];
  posts: { id: number; title: string; status: string }[];
};
type Revision = { id: number; note: string | null; createdAt: string; user: string | null };

const SITE_URL = "https://www.alhambratourticket.com";
const inputCls = "h-10 w-full rounded-xl border border-line bg-white px-3 text-[0.93rem] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const areaCls = "w-full rounded-xl border border-line bg-white px-3 py-2 text-[0.93rem] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

// ISO (UTC) <-> value for <input type="datetime-local"> in the browser's zone.
export const isoToLocal = (iso: string | null | undefined) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const localToIso = (v: string) => (v ? new Date(v).toISOString() : null);
const slugify = (s: string) =>
  s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);

export function PostEditor(props: {
  id: number | null; initial: FormState; taxonomy: Taxonomy; targets: LinkTargets;
  revisions: Revision[]; canPublish: boolean; liveSlug: string | null; publishedAtIso: string | null; flash?: string | null;
}) {
  const router = useRouter();
  const [id, setId] = useState(props.id);
  // Rendered in the browser only (see post-editor-client.tsx), so the publish
  // date can be shown in the browser's own time zone.
  const [start] = useState(() => ({ ...props.initial, publishedAt: isoToLocal(props.publishedAtIso) }));
  const [f, setF] = useState<FormState>(start);
  const [editorHtml, setEditorHtml] = useState(start.content); // what the editor loads
  const [editorKey, setEditorKey] = useState(0);
  const [saved, setSaved] = useState(JSON.stringify(start));
  const [now] = useState(() => Date.now());
  const [slugTouched, setSlugTouched] = useState(!!props.initial.slug);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(() => {
    const t = { draft: "Draft saved.", scheduled: "Scheduled.", published: "Published. The blog updates within a few seconds." }[props.flash ?? ""];
    return t ? { kind: "ok", text: t } : null;
  });
  const [liveSlug, setLiveSlug] = useState(props.liveSlug);
  const dirty = JSON.stringify(f) !== saved;
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((p) => ({ ...p, [k]: v }));

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const slug = f.slug || slugify(f.title);
  const checks = useMemo(
    () => seoChecks({ title: f.title, slug, metaTitle: f.metaTitle, metaDescription: f.metaDescription, excerpt: f.excerpt, focusKeyword: f.focusKeyword, content: f.content, featuredImage: f.featuredImage || null, featuredAlt: f.featuredAlt }),
    [f.title, slug, f.metaTitle, f.metaDescription, f.excerpt, f.focusKeyword, f.content, f.featuredImage, f.featuredAlt],
  );
  const isLive = f.status !== "draft";
  const future = !!f.publishedAt && new Date(f.publishedAt).getTime() > now;

  async function save(status: "draft" | "published") {
    setMsg(null);
    if (!f.title.trim()) return setMsg({ kind: "err", text: "Add a title first." });
    setBusy(true);
    const body = {
      ...f,
      slug,
      status,
      publishedAt: localToIso(f.publishedAt),
      tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
      newCategory: f.newCategory || null,
      featuredImage: f.featuredImage || null,
      featuredWidth: f.featuredWidth || null,
      featuredHeight: f.featuredHeight || null,
      faq: f.faq.filter((x) => x.q.trim() && x.a.trim()),
    };
    try {
      const res = await fetch(id ? `/api/admin/posts/${id}/` : "/api/admin/posts/", {
        method: id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = data.issues?.map((i: { path: string; message: string }) => `${i.path}: ${i.message}`).join("; ");
        throw new Error(detail ? `${data.error} (${detail})` : data.error || "Save failed");
      }
      const next: FormState = {
        ...f, slug: data.slug, status: data.status, publishedAt: isoToLocal(data.publishedAt),
        newCategory: "", revisionNote: "", faq: body.faq,
      };
      setF(next);
      setSaved(JSON.stringify(next));
      setSlugTouched(true);
      setLiveSlug(data.status === "draft" ? null : data.slug);
      const verb = data.status === "draft" ? "Draft saved" : data.status === "scheduled" ? "Scheduled" : "Published";
      setMsg({ kind: "ok", text: `${verb}. ${data.status === "published" ? "The blog updates within a few seconds." : ""}` });
      if (!id) {
        setId(data.id);
        router.replace(`/admin/posts/${data.id}/?saved=${data.status}`);
      } else router.refresh();
    } catch (e) {
      setMsg({ kind: "err", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  async function trash() {
    if (!id || !confirm("Move this post to the trash? It disappears from the blog straight away.")) return;
    const res = await fetch(`/api/admin/posts/${id}/`, { method: "DELETE" });
    if (res.ok) { setSaved(JSON.stringify(f)); router.push("/admin/posts"); }
    else setMsg({ kind: "err", text: (await res.json().catch(() => ({}))).error || "Could not move to trash" });
  }

  async function loadRevision(revId: number) {
    if (!id || (dirty && !confirm("Load this revision? Unsaved changes in the form will be replaced."))) return;
    const res = await fetch(`/api/admin/posts/${id}/revisions/${revId}/`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setMsg({ kind: "err", text: data.error || "Could not load revision" });
    const s = data.snapshot;
    setF((p) => ({
      ...p,
      title: s.title ?? p.title, slug: s.slug ?? p.slug, excerpt: s.excerpt ?? "", content: s.content ?? "",
      categoryId: s.categoryId ?? null, authorId: s.authorId ?? null, tags: (s.tags ?? []).join(", "),
      featuredImage: s.featuredImage ?? "", featuredSrcSet: s.featuredSrcSet ?? null, featuredAlt: s.featuredAlt ?? "", featuredCredit: s.featuredCredit ?? "",
      featuredWidth: s.featuredWidth ?? null, featuredHeight: s.featuredHeight ?? null,
      metaTitle: s.metaTitle ?? "", metaDescription: s.metaDescription ?? "", focusKeyword: s.focusKeyword ?? "", canonicalUrl: s.canonicalUrl ?? "", noindex: !!s.noindex,
      ogTitle: s.ogTitle ?? "", ogDescription: s.ogDescription ?? "", ogImage: s.ogImage ?? "",
      booking: s.booking ?? null, faq: s.faq ?? [], relatedIds: s.relatedIds ?? [], featured: !!s.featured,
      revisionNote: "Restored an earlier revision",
    }));
    setEditorHtml(s.content ?? "");
    setEditorKey((k) => k + 1);
    setMsg({ kind: "ok", text: "Revision loaded into the form. Save to restore it." });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-4">
        <input
          value={f.title}
          onChange={(e) => { set("title", e.target.value); if (!slugTouched) set("slug", ""); }}
          placeholder="Post title"
          aria-label="Title"
          maxLength={200}
          className="w-full rounded-2xl border border-line bg-white px-5 py-3 font-serif text-[1.9rem] font-semibold leading-tight outline-none focus:border-brand"
        />
        <div className="flex flex-wrap items-center gap-2 text-[0.9rem]">
          <span className="text-muted">{SITE_URL}/blog/</span>
          <input
            value={slugTouched ? f.slug : slug}
            onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value) || e.target.value.toLowerCase()); }}
            aria-label="URL slug"
            className="h-9 min-w-48 flex-1 rounded-lg border border-line bg-white px-2 font-mono text-[0.88rem]"
          />
          <span className="text-muted">/</span>
        </div>
        {liveSlug && liveSlug !== slug && (
          <p className="rounded-xl bg-[#fff1dc] px-3 py-2 text-[0.88rem] text-amber-deep">
            Changing the URL of a live post: the old address will 301-redirect to the new one when you save.
          </p>
        )}
        <label className="block">
          <span className="text-[0.9rem] font-semibold">Excerpt <span className="font-normal text-muted">(shown on the blog list; {f.excerpt.length}/400)</span></span>
          <textarea value={f.excerpt} onChange={(e) => set("excerpt", e.target.value)} maxLength={400} rows={2} className={areaCls + " mt-1"} />
        </label>
        <RichEditor key={editorKey} initialHtml={editorHtml} onChange={(h) => set("content", h)} targets={props.targets} />
        <FaqEditor faq={f.faq} onChange={(v) => set("faq", v)} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pb-6">
        <Panel title="Publish">
          <p className="text-[0.9rem]">
            Status: <strong>{f.status === "scheduled" ? "Scheduled" : f.status === "published" ? "Published" : "Draft"}</strong>
            {dirty && <span className="ml-2 font-semibold text-amber-deep">· unsaved changes</span>}
          </p>
          <label className="mt-3 block text-[0.88rem] font-semibold">Publish date (your local time)
            <input type="datetime-local" value={f.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <p className="mt-1 text-[0.8rem] text-muted">Empty = now. A future date schedules the post.</p>
          <input value={f.revisionNote} onChange={(e) => set("revisionNote", e.target.value)} placeholder="Change note (optional)" aria-label="Change note" maxLength={120} className={inputCls + " mt-3"} />
          {msg && <p role={msg.kind === "err" ? "alert" : "status"} className={`mt-3 rounded-xl px-3 py-2 text-[0.88rem] font-semibold ${msg.kind === "err" ? "bg-alert/10 text-alert" : "bg-[#e3f3e8] text-[#1c6b3a]"}`}>{msg.text}</p>}
          <div className="mt-3 grid gap-2">
            {props.canPublish && (
              <button type="button" disabled={busy} onClick={() => save("published")} className="btn btn-primary h-11 disabled:opacity-60">
                {busy ? "Saving…" : future ? "Schedule" : isLive ? "Update" : "Publish"}
              </button>
            )}
            <button type="button" disabled={busy} onClick={() => save("draft")} className="btn btn-outline h-11 disabled:opacity-60">
              {isLive ? "Switch to draft (unpublish)" : "Save draft"}
            </button>
            {!props.canPublish && <p className="text-[0.82rem] text-muted">Writers save drafts. An editor or admin publishes.</p>}
            {id && (
              <a href={`/admin/posts/${id}/preview`} target="_blank" rel="noopener" className="btn btn-outline h-11">
                Preview{dirty ? " (last saved)" : ""} <ExternalLink className="size-4" aria-hidden />
              </a>
            )}
            {liveSlug && f.status === "published" && (
              <a href={`/blog/${liveSlug}/`} target="_blank" rel="noopener" className="text-center text-[0.88rem] font-semibold text-brand underline">View live post</a>
            )}
            {id && props.canPublish && (
              <button type="button" onClick={trash} className="mt-1 flex cursor-pointer items-center justify-center gap-1.5 text-[0.88rem] font-semibold text-alert hover:underline">
                <Trash2 className="size-4" aria-hidden /> Move to trash
              </button>
            )}
          </div>
        </Panel>

        <Panel title="SEO">
          <Field label="Focus keyword"><input value={f.focusKeyword} onChange={(e) => set("focusKeyword", e.target.value)} maxLength={80} className={inputCls} /></Field>
          <Field label={`Meta title (${(f.metaTitle || f.title).length}/60)`}><input value={f.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} placeholder={f.title} maxLength={70} className={inputCls} /></Field>
          <Field label={`Meta description (${(f.metaDescription || f.excerpt).length}/160)`}><textarea value={f.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} placeholder={f.excerpt} maxLength={170} rows={3} className={areaCls} /></Field>
          <div className="mt-3 rounded-xl border border-line p-3" aria-label="Google preview">
            <p className="text-[0.75rem] text-[#4d5156]">alhambratourticket.com › blog › {slug}</p>
            <p className="mt-0.5 line-clamp-1 text-[1.05rem] text-[#1a0dab]">{f.metaTitle || f.title || "Post title"}</p>
            <p className="mt-0.5 line-clamp-2 text-[0.82rem] text-[#4d5156]">{f.metaDescription || f.excerpt || "Meta description"}</p>
          </div>
          <ul className="mt-3 space-y-1.5">
            {checks.map((c) => (
              <li key={c.label} className="flex gap-2 text-[0.85rem]" title={c.tip}>
                {c.ok ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#1c6b3a]" aria-hidden /> : <Circle className="mt-0.5 size-4 shrink-0 text-amber-deep" aria-hidden />}
                <span><span className="sr-only">{c.ok ? "Pass: " : "To do: "}</span>{c.label}{!c.ok && c.tip ? <span className="block text-muted">{c.tip}</span> : null}</span>
              </li>
            ))}
          </ul>
          <details className="mt-3">
            <summary className="cursor-pointer text-[0.88rem] font-semibold">Advanced</summary>
            <Field label="Canonical URL (leave empty for this post)"><input value={f.canonicalUrl} onChange={(e) => set("canonicalUrl", e.target.value)} placeholder="https://" className={inputCls} /></Field>
            <label className="mt-3 flex items-center gap-2 text-[0.88rem]"><input type="checkbox" checked={f.noindex} onChange={(e) => set("noindex", e.target.checked)} /> Hide from Google (noindex, left out of the sitemap)</label>
          </details>
        </Panel>

        <Panel title="Featured image">
          <ImagePicker f={f} set={set} />
        </Panel>

        <Panel title="Social sharing">
          <Field label="Social title"><input value={f.ogTitle} onChange={(e) => set("ogTitle", e.target.value)} placeholder={f.metaTitle || f.title} maxLength={100} className={inputCls} /></Field>
          <Field label="Social description"><textarea value={f.ogDescription} onChange={(e) => set("ogDescription", e.target.value)} placeholder={f.metaDescription || f.excerpt} maxLength={200} rows={2} className={areaCls} /></Field>
          <Field label="Social image URL (default: featured image)"><input value={f.ogImage} onChange={(e) => set("ogImage", e.target.value)} placeholder="https://" className={inputCls} /></Field>
          <div className="mt-3 overflow-hidden rounded-xl border border-line" aria-label="Social preview">
            {(f.ogImage || f.featuredImage) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.ogImage || f.featuredImage} alt="" className="aspect-[1.91/1] w-full object-cover" />
            ) : <div className="flex aspect-[1.91/1] items-center justify-center bg-soft text-[0.85rem] text-muted">Site default image</div>}
            <div className="bg-soft/60 p-3">
              <p className="text-[0.72rem] uppercase text-muted">alhambratourticket.com</p>
              <p className="line-clamp-1 font-semibold">{f.ogTitle || f.metaTitle || f.title || "Post title"}</p>
              <p className="line-clamp-2 text-[0.82rem] text-muted">{f.ogDescription || f.metaDescription || f.excerpt}</p>
            </div>
          </div>
        </Panel>

        <Panel title="Category, tags & author">
          <Field label="Category">
            <select value={f.categoryId ?? ""} onChange={(e) => set("categoryId", e.target.value ? Number(e.target.value) : null)} className={inputCls + " cursor-pointer"}>
              <option value="">No category</option>
              {props.taxonomy.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="…or new category"><input value={f.newCategory} onChange={(e) => set("newCategory", e.target.value)} maxLength={60} className={inputCls} /></Field>
          <Field label="Tags (comma separated)"><input value={f.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Nasrid Palaces, tickets" className={inputCls} /></Field>
          <Field label="Author">
            <select value={f.authorId ?? ""} onChange={(e) => set("authorId", e.target.value ? Number(e.target.value) : null)} className={inputCls + " cursor-pointer"}>
              <option value="">Default author</option>
              {props.taxonomy.authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </Field>
          <label className="mt-3 flex items-center gap-2 text-[0.88rem]"><input type="checkbox" checked={f.featured} onChange={(e) => set("featured", e.target.checked)} /> Feature at the top of the blog</label>
        </Panel>

        <Panel title="Booking card (sidebar CTA)">
          <BookingPicker value={f.booking} onChange={(v) => set("booking", v)} targets={props.targets} />
        </Panel>

        <Panel title="Related posts">
          <p className="mb-2 text-[0.82rem] text-muted">Pick up to 6. Empty = chosen automatically from the same category.</p>
          <div className="max-h-56 space-y-1 overflow-y-auto">
            {props.taxonomy.posts.filter((p) => p.id !== id).map((p) => {
              const on = f.relatedIds.includes(p.id);
              return (
                <label key={p.id} className="flex items-start gap-2 text-[0.86rem]">
                  <input type="checkbox" checked={on} disabled={!on && f.relatedIds.length >= 6} onChange={() => set("relatedIds", on ? f.relatedIds.filter((x) => x !== p.id) : [...f.relatedIds, p.id])} className="mt-1" />
                  <span>{p.title}{p.status === "draft" && <span className="text-muted"> (draft)</span>}</span>
                </label>
              );
            })}
          </div>
        </Panel>

        {id && props.revisions.length > 0 && (
          <Panel title="Revisions">
            <ul className="max-h-56 space-y-1 overflow-y-auto">
              {props.revisions.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2 text-[0.84rem]">
                  <span>{new Date(r.createdAt).toLocaleString()} · {r.user ?? "—"}{r.note ? ` · ${r.note}` : ""}</span>
                  <button type="button" onClick={() => loadRevision(r.id)} className="shrink-0 cursor-pointer font-semibold text-brand hover:underline">Load</button>
                </li>
              ))}
            </ul>
          </Panel>
        )}
      </aside>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4">
      <h2 className="mb-2 text-[0.95rem] font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="mt-3 block text-[0.86rem] font-semibold first:mt-0">{label}<div className="mt-1 font-normal">{children}</div></label>;
}

function ImagePicker({ f, set }: { f: FormState; set: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  async function onFile(file: File) {
    setErr("");
    if (!f.featuredAlt.trim()) { setErr("Write the alt text first, then upload."); return; }
    try {
      setBusy(true);
      const up = await uploadImage(file, f.featuredAlt, f.featuredCredit);
      set("featuredImage", up.url);
      set("featuredSrcSet", null);
      set("featuredWidth", up.width);
      set("featuredHeight", up.height);
    } catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); if (fileRef.current) fileRef.current.value = ""; }
  }
  return (
    <>
      {f.featuredImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={f.featuredImage} alt={f.featuredAlt} className="aspect-[16/9] w-full rounded-xl object-cover" />
      ) : <div className="flex aspect-[16/9] items-center justify-center rounded-xl bg-soft text-[0.85rem] text-muted">No image</div>}
      <Field label="Alt text (required)"><input value={f.featuredAlt} onChange={(e) => set("featuredAlt", e.target.value)} maxLength={200} placeholder="Describe the photo" className={inputCls} /></Field>
      <Field label="Credit"><input value={f.featuredCredit} onChange={(e) => set("featuredCredit", e.target.value)} maxLength={200} placeholder="Photo: …" className={inputCls} /></Field>
      <div className="mt-3 flex gap-2">
        <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className="btn btn-outline h-10 flex-1 disabled:opacity-60"><Upload className="size-4" aria-hidden /> {busy ? "Uploading…" : "Upload"}</button>
        {f.featuredImage && <button type="button" onClick={() => { set("featuredImage", ""); set("featuredSrcSet", null); }} className="btn btn-outline h-10 px-3">Remove</button>}
      </div>
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="sr-only" tabIndex={-1} aria-label="Featured image file" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      <Field label="…or image URL"><input value={f.featuredImage} onChange={(e) => { set("featuredImage", e.target.value); set("featuredSrcSet", null); }} placeholder="https:// or /images/…" className={inputCls} /></Field>
      {err && <p role="alert" className="mt-2 text-[0.85rem] font-semibold text-alert">{err}</p>}
    </>
  );
}

function BookingPicker({ value, onChange, targets }: { value: FormState["booking"]; onChange: (v: FormState["booking"]) => void; targets: LinkTargets }) {
  const v = value ?? { title: "", text: "", label: "", query: "" };
  return (
    <>
      <select
        aria-label="Booking card preset"
        className={inputCls + " cursor-pointer"}
        value=""
        onChange={(e) => {
          if (e.target.value === "default") return onChange(null);
          const p = targets.presets[Number(e.target.value)];
          if (p) onChange({ title: p.title, text: p.text, label: p.label, query: p.query });
        }}
      >
        <option value="" disabled>Load a preset…</option>
        <option value="default">Site default (tours with tickets)</option>
        {targets.presets.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}
      </select>
      {value ? (
        <>
          <Field label="Title"><input value={v.title} onChange={(e) => onChange({ ...v, title: e.target.value })} maxLength={80} className={inputCls} /></Field>
          <Field label="Text"><input value={v.text} onChange={(e) => onChange({ ...v, text: e.target.value })} maxLength={200} className={inputCls} /></Field>
          <Field label="Button label"><input value={v.label} onChange={(e) => onChange({ ...v, label: e.target.value })} maxLength={40} className={inputCls} /></Field>
          <Field label="GetYourGuide product or search">
            <input list="gyg-keys-booking" value={v.query} onChange={(e) => onChange({ ...v, query: e.target.value })} maxLength={120} className={inputCls} />
            <datalist id="gyg-keys-booking">{targets.gyg.map((g) => <option key={g.key} value={g.key} />)}</datalist>
          </Field>
        </>
      ) : <p className="mt-2 text-[0.85rem] text-muted">Using the site default card.</p>}
    </>
  );
}

function FaqEditor({ faq, onChange }: { faq: { q: string; a: string }[]; onChange: (v: { q: string; a: string }[]) => void }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4">
      <h2 className="text-[0.95rem] font-bold">FAQ <span className="font-normal text-muted">(shown under the post and added as FAQ schema)</span></h2>
      <div className="mt-3 space-y-3">
        {faq.map((x, i) => (
          <div key={i} className="rounded-xl border border-line p-3">
            <input value={x.q} onChange={(e) => onChange(faq.map((y, j) => (j === i ? { ...y, q: e.target.value } : y)))} placeholder="Question" aria-label={`Question ${i + 1}`} maxLength={200} className={inputCls} />
            <textarea value={x.a} onChange={(e) => onChange(faq.map((y, j) => (j === i ? { ...y, a: e.target.value } : y)))} placeholder="Answer" aria-label={`Answer ${i + 1}`} maxLength={1000} rows={2} className={areaCls + " mt-2"} />
            <button type="button" onClick={() => onChange(faq.filter((_, j) => j !== i))} className="mt-1 cursor-pointer text-[0.85rem] font-semibold text-alert hover:underline">Remove</button>
          </div>
        ))}
      </div>
      {faq.length < 15 && (
        <button type="button" onClick={() => onChange([...faq, { q: "", a: "" }])} className="btn btn-outline mt-3 h-10 px-4"><Plus className="size-4" aria-hidden /> Add question</button>
      )}
    </section>
  );
}
