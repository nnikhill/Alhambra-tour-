"use client";

import { useMemo, useState } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Link2, Unlink, ImagePlus, Table2, Undo2, Redo2,
  Minus, MessageSquareQuote, Lightbulb, Ticket, Code2, Rows3, Columns3, Trash2,
} from "lucide-react";
import { editorExtensions } from "./editor-extensions";
import { Modal } from "./modal";
import { uploadImage } from "./upload";

export type LinkTargets = {
  internal: { href: string; label: string }[];
  gyg: { key: string; label: string }[];
  presets: { name: string; title: string; text: string; label: string; query: string }[];
};

// Remount (change `key`) to load different content, e.g. a revision.
export function RichEditor({ initialHtml, onChange, targets }: { initialHtml: string; onChange: (html: string) => void; targets: LinkTargets }) {
  const [source, setSource] = useState(false);
  const [html, setHtml] = useState(initialHtml);
  const editor = useEditor({
    extensions: useMemo(() => editorExtensions(), []),
    content: initialHtml,
    immediatelyRender: false,
    editorProps: { attributes: { class: "post-body ed-content min-h-[60vh] px-6 py-5 outline-none", "aria-label": "Post content" } },
    onUpdate: ({ editor }) => {
      const h = editor.getHTML();
      setHtml(h);
      onChange(h);
    },
  });

  return (
    <div className="rounded-2xl border border-line bg-white">
      <Toolbar editor={editor} source={source} toggleSource={() => {
        if (source && editor) {
          editor.commands.setContent(html, { emitUpdate: true });
        }
        setSource(!source);
      }} targets={targets} />
      {source ? (
        <textarea
          value={html}
          onChange={(e) => { setHtml(e.target.value); onChange(e.target.value); }}
          spellCheck={false}
          aria-label="HTML source"
          className="block min-h-[60vh] w-full resize-y rounded-b-2xl border-0 bg-[#0f1420] p-5 font-mono text-[0.85rem] leading-relaxed text-[#e6e9ef] outline-none"
        />
      ) : (
        <EditorContent editor={editor} />
      )}
      <div className="flex justify-between border-t border-line px-4 py-2 text-[0.8rem] text-muted">
        <span>{source ? "HTML mode: paste exact HTML here. It is cleaned on save (scripts and styles are removed)." : "Tip: paste from Google Docs, Word or a web page and the formatting is kept."}</span>
        <span>{editor ? `${editor.storage.characterCount.words()} words` : ""}</span>
      </div>
    </div>
  );
}

function Btn({ on, active, label, children, disabled }: { on: () => void; active?: boolean; label: string; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={on}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={`flex size-9 cursor-pointer items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${active ? "bg-ink text-white" : "text-ink hover:bg-soft"}`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, source, toggleSource, targets }: { editor: Editor | null; source: boolean; toggleSource: () => void; targets: LinkTargets }) {
  const st = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      e
        ? {
            block: e.isActive("heading", { level: 2 }) ? "h2" : e.isActive("heading", { level: 3 }) ? "h3" : e.isActive("heading", { level: 4 }) ? "h4" : "p",
            bold: e.isActive("bold"), italic: e.isActive("italic"), underline: e.isActive("underline"), strike: e.isActive("strike"),
            ul: e.isActive("bulletList"), ol: e.isActive("orderedList"), quote: e.isActive("blockquote"), link: e.isActive("link"),
            table: e.isActive("table"), canUndo: e.can().undo(), canRedo: e.can().redo(),
          }
        : null,
  });
  const [dialog, setDialog] = useState<null | "link" | "image" | "cta" | "tip">(null);
  const off = !editor || source;
  const c = () => editor!.chain().focus();
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 rounded-t-2xl border-b border-line bg-white/95 px-2 py-1.5 backdrop-blur">
      <select
        aria-label="Text style"
        disabled={off}
        value={st?.block ?? "p"}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "p") c().setParagraph().run();
          else c().toggleHeading({ level: Number(v.slice(1)) as 2 | 3 | 4 }).run();
        }}
        className="h-9 cursor-pointer rounded-lg border border-line bg-white px-2 text-[0.9rem]"
      >
        <option value="p">Paragraph</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
      </select>
      <span className="mx-1 h-6 w-px bg-line" />
      <Btn label="Bold" on={() => c().toggleBold().run()} active={st?.bold} disabled={off}><Bold className="size-4" /></Btn>
      <Btn label="Italic" on={() => c().toggleItalic().run()} active={st?.italic} disabled={off}><Italic className="size-4" /></Btn>
      <Btn label="Underline" on={() => c().toggleUnderline().run()} active={st?.underline} disabled={off}><Underline className="size-4" /></Btn>
      <Btn label="Strikethrough" on={() => c().toggleStrike().run()} active={st?.strike} disabled={off}><Strikethrough className="size-4" /></Btn>
      <span className="mx-1 h-6 w-px bg-line" />
      <Btn label="Bulleted list" on={() => c().toggleBulletList().run()} active={st?.ul} disabled={off}><List className="size-4" /></Btn>
      <Btn label="Numbered list" on={() => c().toggleOrderedList().run()} active={st?.ol} disabled={off}><ListOrdered className="size-4" /></Btn>
      <Btn label="Quote" on={() => c().toggleBlockquote().run()} active={st?.quote} disabled={off}><Quote className="size-4" /></Btn>
      <Btn label="Divider" on={() => c().setHorizontalRule().run()} disabled={off}><Minus className="size-4" /></Btn>
      <span className="mx-1 h-6 w-px bg-line" />
      <Btn label="Link (site pages, GetYourGuide or URL)" on={() => setDialog("link")} active={st?.link} disabled={off}><Link2 className="size-4" /></Btn>
      <Btn label="Remove link" on={() => c().unsetLink().run()} disabled={off || !st?.link}><Unlink className="size-4" /></Btn>
      <Btn label="Image" on={() => setDialog("image")} disabled={off}><ImagePlus className="size-4" /></Btn>
      <Btn label="Table" on={() => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} disabled={off}><Table2 className="size-4" /></Btn>
      {st?.table && !off && (
        <>
          <Btn label="Add row" on={() => c().addRowAfter().run()}><Rows3 className="size-4" /></Btn>
          <Btn label="Add column" on={() => c().addColumnAfter().run()}><Columns3 className="size-4" /></Btn>
          <Btn label="Delete table" on={() => c().deleteTable().run()}><Trash2 className="size-4" /></Btn>
        </>
      )}
      <span className="mx-1 h-6 w-px bg-line" />
      <Btn label="Short answer box" on={() => c().insertContent({ type: "callout", attrs: { variant: "answer" }, content: [{ type: "paragraph", content: [{ type: "text", text: "Answer the question in 2–3 sentences." }] }] }).run()} disabled={off}><MessageSquareQuote className="size-4" /></Btn>
      <Btn label="Tip box" on={() => setDialog("tip")} disabled={off}><Lightbulb className="size-4" /></Btn>
      <Btn label="Booking box (GetYourGuide)" on={() => setDialog("cta")} disabled={off}><Ticket className="size-4" /></Btn>
      <span className="mx-1 h-6 w-px bg-line" />
      <Btn label="Undo" on={() => c().undo().run()} disabled={off || !st?.canUndo}><Undo2 className="size-4" /></Btn>
      <Btn label="Redo" on={() => c().redo().run()} disabled={off || !st?.canRedo}><Redo2 className="size-4" /></Btn>
      <span className="ml-auto" />
      <Btn label={source ? "Back to visual editor" : "Edit HTML source"} on={toggleSource} active={source}><Code2 className="size-4" /></Btn>

      <LinkDialog open={dialog === "link"} onClose={() => setDialog(null)} editor={editor} targets={targets} />
      <ImageDialog open={dialog === "image"} onClose={() => setDialog(null)} editor={editor} />
      <CtaDialog open={dialog === "cta"} onClose={() => setDialog(null)} editor={editor} targets={targets} />
      <TipDialog open={dialog === "tip"} onClose={() => setDialog(null)} editor={editor} />
    </div>
  );
}

const inputCls = "h-11 w-full rounded-xl border border-line bg-white px-3 text-[0.95rem] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

function LinkDialog({ open, onClose, editor, targets }: { open: boolean; onClose: () => void; editor: Editor | null; targets: LinkTargets }) {
  const [tab, setTab] = useState<"site" | "gyg" | "url">("site");
  const [q, setQ] = useState("");
  const [url, setUrl] = useState("");
  const [gygSearch, setGygSearch] = useState("");
  const set = (href: string) => {
    if (!editor) return;
    const { empty } = editor.state.selection;
    if (empty && !editor.isActive("link")) {
      editor.chain().focus().insertContent({ type: "text", text: href.startsWith("gyg:") ? decodeURIComponent(href.slice(4)) : href, marks: [{ type: "link", attrs: { href } }] }).run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    onClose();
  };
  const ql = q.toLowerCase();
  return (
    <Modal open={open} onClose={onClose} title="Insert link" wide>
      <div role="group" aria-label="Link type" className="mb-4 flex gap-1 rounded-xl bg-soft p-1">
        {([["site", "Site pages"], ["gyg", "GetYourGuide"], ["url", "Other URL"]] as const).map(([k, l]) => (
          <button key={k} type="button" aria-pressed={tab === k} onClick={() => setTab(k)} className={`h-10 flex-1 cursor-pointer rounded-lg text-[0.92rem] font-semibold ${tab === k ? "bg-white shadow-sm" : "text-muted"}`}>{l}</button>
        ))}
      </div>
      {tab !== "url" && <input className={inputCls} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />}
      {tab === "site" && (
        <ul className="mt-3 max-h-80 divide-y divide-line overflow-y-auto rounded-xl border border-line">
          {targets.internal.filter((t) => !ql || t.label.toLowerCase().includes(ql) || t.href.includes(ql)).map((t) => (
            <li key={t.href}><button type="button" onClick={() => set(t.href)} className="block w-full cursor-pointer px-4 py-2.5 text-left hover:bg-soft"><span className="font-semibold">{t.label}</span> <span className="text-[0.85rem] text-muted">{t.href}</span></button></li>
          ))}
        </ul>
      )}
      {tab === "gyg" && (
        <>
          <p className="mt-3 text-[0.88rem] text-muted">Links are tracked automatically: partner ID, UTM tags and a sub_id for this post and position are added when the page is shown, with rel=&quot;sponsored&quot;.</p>
          <ul className="mt-3 max-h-64 divide-y divide-line overflow-y-auto rounded-xl border border-line">
            {targets.gyg.filter((t) => !ql || t.label.toLowerCase().includes(ql)).map((t) => (
              <li key={t.key}><button type="button" onClick={() => set(`gyg:${encodeURIComponent(t.key)}`)} className="block w-full cursor-pointer px-4 py-2.5 text-left hover:bg-soft">{t.label}</button></li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <input className={inputCls} placeholder="Or a GetYourGuide search, e.g. Alhambra tapas tour" value={gygSearch} onChange={(e) => setGygSearch(e.target.value)} aria-label="GetYourGuide search phrase" />
            <button type="button" disabled={!gygSearch.trim()} onClick={() => set(`gyg:${encodeURIComponent(gygSearch.trim())}`)} className="btn btn-primary h-11 shrink-0 px-4 disabled:opacity-50">Link</button>
          </div>
        </>
      )}
      {tab === "url" && (
        <form onSubmit={(e) => { e.preventDefault(); if (/^(https:\/\/|\/|mailto:)/.test(url.trim())) set(url.trim()); }} className="flex gap-2">
          <input className={inputCls} placeholder="https://… or /path/" value={url} onChange={(e) => setUrl(e.target.value)} aria-label="URL" />
          <button type="submit" className="btn btn-primary h-11 shrink-0 px-4">Link</button>
        </form>
      )}
    </Modal>
  );
}

function ImageDialog({ open, onClose, editor }: { open: boolean; onClose: () => void; editor: Editor | null }) {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [credit, setCredit] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function insert() {
    setErr("");
    if (!alt.trim()) return setErr("Alt text is required: describe the image for people who can't see it.");
    try {
      setBusy(true);
      let url = src.trim();
      if (file) url = (await uploadImage(file, alt.trim(), credit)).url;
      if (!url) return setErr("Choose a file or paste an image URL.");
      if (!/^(https:\/\/|\/)/.test(url)) return setErr("Image URL must start with https://");
      editor?.chain().focus().setImage({ src: url, alt: alt.trim() }).run();
      setFile(null); setSrc(""); setAlt(""); setCredit("");
      onClose();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal open={open} onClose={onClose} title="Insert image">
      <div className="space-y-3">
        <label className="block text-[0.9rem] font-semibold">Upload (JPEG, PNG, WebP, AVIF or GIF, max 5 MB)
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-1 block w-full text-[0.9rem]" />
        </label>
        <label className="block text-[0.9rem] font-semibold">…or image URL
          <input className={inputCls + " mt-1"} value={src} onChange={(e) => setSrc(e.target.value)} placeholder="https://" />
        </label>
        <label className="block text-[0.9rem] font-semibold">Alt text (required)
          <input className={inputCls + " mt-1"} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="e.g. The Court of the Lions fountain" maxLength={200} />
        </label>
        <label className="block text-[0.9rem] font-semibold">Photo credit
          <input className={inputCls + " mt-1"} value={credit} onChange={(e) => setCredit(e.target.value)} placeholder="Own photo" maxLength={200} />
        </label>
        {err && <p role="alert" className="text-[0.9rem] font-semibold text-alert">{err}</p>}
        <button type="button" onClick={insert} disabled={busy} className="btn btn-primary h-11 w-full disabled:opacity-60">{busy ? "Uploading…" : "Insert image"}</button>
      </div>
    </Modal>
  );
}

function CtaDialog({ open, onClose, editor, targets }: { open: boolean; onClose: () => void; editor: Editor | null; targets: LinkTargets }) {
  const [v, setV] = useState({ title: "", text: "", label: "", query: "" });
  return (
    <Modal open={open} onClose={onClose} title="Booking box">
      <div className="space-y-3">
        <label className="block text-[0.9rem] font-semibold">Start from a preset
          <select className={inputCls + " mt-1 cursor-pointer"} defaultValue="" onChange={(e) => { const p = targets.presets[Number(e.target.value)]; if (p) setV({ title: p.title, text: p.text, label: p.label, query: p.query }); }}>
            <option value="" disabled>Choose…</option>
            {targets.presets.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}
          </select>
        </label>
        <input className={inputCls} placeholder="Title" value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} maxLength={80} aria-label="Title" />
        <input className={inputCls} placeholder="Short text" value={v.text} onChange={(e) => setV({ ...v, text: e.target.value })} maxLength={200} aria-label="Text" />
        <input className={inputCls} placeholder="Button label" value={v.label} onChange={(e) => setV({ ...v, label: e.target.value })} maxLength={40} aria-label="Button label" />
        <label className="block text-[0.9rem] font-semibold">GetYourGuide product or search
          <input className={inputCls + " mt-1"} list="gyg-keys" value={v.query} onChange={(e) => setV({ ...v, query: e.target.value })} maxLength={120} />
          <datalist id="gyg-keys">{targets.gyg.map((g) => <option key={g.key} value={g.key} />)}</datalist>
        </label>
        <button type="button" disabled={!v.title || !v.label || !v.query} onClick={() => { editor?.chain().focus().insertContent([{ type: "ctaBlock", attrs: v }, { type: "paragraph" }]).run(); onClose(); }} className="btn btn-primary h-11 w-full disabled:opacity-50">Insert booking box</button>
      </div>
    </Modal>
  );
}

function TipDialog({ open, onClose, editor }: { open: boolean; onClose: () => void; editor: Editor | null }) {
  const [title, setTitle] = useState("");
  return (
    <Modal open={open} onClose={onClose} title="Tip box">
      <div className="space-y-3">
        <input className={inputCls} placeholder="Tip title, e.g. Book a morning slot" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} aria-label="Tip title" />
        <button type="button" onClick={() => { editor?.chain().focus().insertContent({ type: "callout", attrs: { variant: "tip", title: title || null }, content: [{ type: "paragraph", content: [{ type: "text", text: "Write the tip here." }] }] }).run(); setTitle(""); onClose(); }} className="btn btn-primary h-11 w-full">Insert tip box</button>
      </div>
    </Modal>
  );
}
