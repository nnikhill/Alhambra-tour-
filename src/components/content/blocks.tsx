import Link from "next/link";
import { Check, Lightbulb } from "lucide-react";
import { RichText } from "@/components/blog/rich-text";
import type { Block } from "@/content/posts";
import { gygUrl } from "@/lib/gyg";

// Shared renderer for article bodies (blog posts and guide pages).
// pageId feeds the affiliate sub_id, e.g. blog_best-time… or guide.
export function renderBlock(b: Block, i: number, pageId: string) {
  switch (b.type) {
    case "answer":
      return (
        <div key={i} className="mb-10 rounded-2xl border-l-4 border-amber bg-[#fdf6ec] p-6 sm:p-7">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#8a4b0a]">Short answer</p>
          <p className="mt-2 text-[1.15rem] font-medium leading-relaxed text-ink">{b.text}</p>
        </div>
      );
    case "h2":
      return <h2 key={i} id={b.id} className="mb-4 mt-16 scroll-mt-28 font-serif text-[1.85rem] leading-tight text-ink">{b.text}</h2>;
    case "h3":
      return <h3 key={i} className="mb-2 mt-9 text-[1.2rem] text-ink">{b.text}</h3>;
    case "list": {
      const Tag = b.ordered ? "ol" : "ul";
      return (
        <Tag key={i} className="my-6 space-y-3">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3">
              <Check className="mt-1.5 size-4 shrink-0 text-amber" aria-hidden />
              <span><RichText text={it} /></span>
            </li>
          ))}
        </Tag>
      );
    }
    case "tip":
      return (
        <aside key={i} className="my-8 flex gap-4 rounded-2xl bg-soft p-6">
          <Lightbulb className="mt-1 size-5 shrink-0 text-amber" aria-hidden />
          <div>
            <p className="font-bold text-ink">{b.title}</p>
            <p className="mt-1 text-[1rem] leading-relaxed"><RichText text={b.text} /></p>
          </div>
        </aside>
      );
    case "table":
      return (
        <div key={i} className="my-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[30rem] text-left text-[0.95rem]">
            <thead className="bg-[#f6f8fc]">
              <tr>{b.head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold text-ink">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-line">
              {b.rows.map((r, ri) => (
                <tr key={`${r[0]}-${ri}`}>
                  {r.map((c, j) => j === 0
                    ? <th key={j} scope="row" className="px-4 py-3 font-semibold text-ink">{c}</th>
                    : <td key={j} className="px-4 py-3">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta":
      return (
        <aside key={i} className="my-12 rounded-2xl bg-brand p-7 text-white sm:p-8">
          <p className="font-serif text-[1.35rem] font-bold">{b.title}</p>
          <p className="mt-2 text-[1rem] leading-relaxed text-white/80">{b.text}</p>
          {b.query ? (
            <a href={gygUrl(b.query, { page: pageId, position: `inline_${i}` })} target="_blank" rel="sponsored nofollow noopener" className="btn btn-white mt-5 h-12" data-track="affiliate_click">
              {b.label}
            </a>
          ) : (
            <Link href={b.href!} className="btn btn-white mt-5 h-12">{b.label}</Link>
          )}
        </aside>
      );
    default:
      return <p key={i} className="my-5"><RichText text={b.text} /></p>;
  }
}
