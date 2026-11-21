import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronDown, Lightbulb } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CategoryTag } from "@/components/blog/category-tag";
import { RichText } from "@/components/blog/rich-text";
import { POSTS, getPost, type Block } from "@/content/posts";
import { SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { gygUrl } from "@/lib/gyg";

export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: { absolute: p.seoTitle },
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: { type: "article", title: p.seoTitle, description: p.excerpt, images: [p.photo.src] },
  };
}

// Money pages every post points readers on to.
const NEXT_STEPS = [
  { href: "/tickets/", title: "Alhambra tickets compared", text: "Every ticket type, price and what it includes." },
  { href: "/tours/", title: "Guided tours with tickets", text: "Group, small-group, private and night tours." },
  { href: "/plan/", title: "Plan your visit", text: "Hours, getting there and a day built around your slot." },
];

function renderBlock(b: Block, i: number, slug: string) {
  switch (b.type) {
    case "answer":
      return (
        <div key={i} className="mb-10 rounded-2xl border border-[#efd5b5] bg-[#fdf6ec] p-6">
          <p className="text-[0.85rem] font-semibold text-[#8a4b0a]">Short answer</p>
          <p className="mt-2 text-[1.12rem] font-medium leading-relaxed text-ink">{b.text}</p>
        </div>
      );
    case "h2":
      return <h2 key={i} id={b.id} className="mb-4 mt-14 scroll-mt-28 text-[1.7rem] leading-tight">{b.text}</h2>;
    case "h3":
      return <h3 key={i} className="mb-2 mt-8 text-[1.25rem]">{b.text}</h3>;
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
              {b.rows.map((r) => (
                <tr key={r[0]}>
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
        <aside key={i} className="my-10 rounded-2xl bg-brand p-7 text-white">
          <p className="font-serif text-[1.35rem] font-bold">{b.title}</p>
          <p className="mt-2 text-[1rem] leading-relaxed text-white/80">{b.text}</p>
          {b.query ? (
            <a href={gygUrl(b.query, { page: `blog_${slug}`, position: `inline_${i}` })} target="_blank" rel="sponsored nofollow noopener" className="btn btn-amber mt-5 h-12" data-track="affiliate_click">
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

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const toc = p.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const more = POSTS.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.published,
            dateModified: p.updated,
            image: p.photo.src,
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
            mainEntityOfPage: absoluteUrl(`/blog/${p.slug}/`),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <main id="main">
        <article>
          {/* Header */}
          <header className="wrap max-w-[760px] pt-8 sm:pt-10">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/blog/", label: "Blog" }, { href: `/blog/${p.slug}/`, label: p.title }]} />
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9rem] text-muted">
              <CategoryTag c={p.category} />
              <span>{p.readMins} min read</span>
            </div>
            <h1 className="hero-rise mt-4 font-serif text-[clamp(2rem,4.2vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">{p.title}</h1>
            <p className="mt-4 text-[1.15rem] leading-relaxed text-muted">{p.excerpt}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-5 text-[0.92rem]">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#fdf6ec]">
                <svg viewBox="0 0 28 32" className="h-5 w-5 text-amber" aria-hidden>
                  <path d="M3 31V14C3 7.4 7.9 2 14 2s11 5.4 11 12v17" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </span>
              <div className="leading-snug">
                <p>By <Link href="/" className="font-semibold text-ink no-underline hover:underline">{SITE.name}</Link></p>
                <p className="text-muted">Updated {formatDate(p.updated)}, checked against the official Alhambra site</p>
              </div>
            </div>
          </header>

          <figure className="wrap mt-8 max-w-[1080px]">
            <img src={p.photo.src} srcSet={p.photo.srcSet} sizes="(min-width:1080px) 1080px, 100vw" alt={p.photo.alt} fetchPriority="high" className="aspect-[2/1] w-full rounded-2xl object-cover" />
            <figcaption className="mt-2 text-[0.8rem] text-muted">{p.photo.alt}. Photo: {p.photo.credit}</figcaption>
          </figure>

          {/* Body + sidebar */}
          <div className="wrap mt-10 grid max-w-[1080px] gap-12 pb-16 lg:grid-cols-[minmax(0,680px)_1fr]">
            <div className="text-[1.125rem] leading-[1.8] text-[#2b313b]">
              {toc.length > 2 && (
                <details className="mb-8 rounded-2xl border border-line px-5 py-4 lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink">
                    On this page <ChevronDown className="size-5 text-muted" aria-hidden />
                  </summary>
                  <ol className="mt-3 space-y-2 text-[1rem]">
                    {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-muted no-underline hover:text-ink">{h.text}</a></li>)}
                  </ol>
                </details>
              )}
              {p.body.map((b, i) => renderBlock(b, i, p.slug))}

              {/* FAQ */}
              <section aria-labelledby="post-faq" className="mt-14">
                <h2 id="post-faq" className="mb-4 scroll-mt-28 text-[1.7rem]">Questions people ask</h2>
                <div className="divide-y divide-line rounded-2xl border border-line">
                  {p.faq.map((f) => (
                    <details key={f.q} className="group px-5 py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.02rem] font-semibold text-ink">
                        {f.q}
                        <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
                      </summary>
                      <p className="mt-2 text-[1rem]">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {toc.length > 2 && (
                  <nav aria-label="On this page" className="border-l-2 border-line pl-5">
                    <p className="text-[0.85rem] font-semibold text-ink">On this page</p>
                    <ol className="mt-3 space-y-2.5 text-[0.92rem]">
                      {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-muted no-underline hover:text-ink">{h.text}</a></li>)}
                    </ol>
                  </nav>
                )}
                <div className="rounded-2xl bg-[#fdf6ec] p-5 ring-1 ring-[#efd5b5]">
                  <p className="font-serif text-[1.2rem] font-bold leading-snug text-ink">Tickets sold out for your date?</p>
                  <p className="mt-2 text-[0.92rem] text-muted">Tours with the entry ticket included, from €49.</p>
                  <a href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: `blog_${p.slug}`, position: "sidebar" })} target="_blank" rel="sponsored nofollow noopener" className="btn btn-amber mt-4 h-11 w-full" data-track="affiliate_click">
                    Check availability
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* Next steps: interlinks to money pages */}
        <section aria-labelledby="next-title" className="border-t border-line py-14">
          <div className="wrap max-w-[1080px]">
            <h2 id="next-title" className="section-title">Plan the rest of your visit</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {NEXT_STEPS.map((n) => (
                <Link key={n.href} href={n.href} className="group rounded-2xl border border-line p-5 no-underline transition-colors hover:border-ink">
                  <p className="flex items-center justify-between font-bold text-ink">{n.title}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></p>
                  <p className="mt-1 text-[0.93rem] text-muted">{n.text}</p>
                </Link>
              ))}
            </div>

            <h2 className="section-title mt-14">Keep reading</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {more.map((m) => (
                <Link key={m.slug} href={`/blog/${m.slug}/`} className="group grid grid-cols-[7rem_1fr] items-center gap-5 no-underline sm:grid-cols-[10rem_1fr]">
                  <img src={m.photo.src} srcSet={m.photo.srcSet} sizes="160px" alt={m.photo.alt} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
                  <div>
                    <CategoryTag c={m.category} />
                    <p className="mt-2 text-[1.05rem] font-bold leading-snug text-ink group-hover:underline">{m.title}</p>
                    <p className="mt-1 text-[0.88rem] text-muted">{m.readMins} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
