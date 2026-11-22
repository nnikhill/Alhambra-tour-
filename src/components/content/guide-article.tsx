import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { renderBlock } from "@/components/content/blocks";
import type { Block } from "@/content/posts";
import type { Guide } from "@/content/guides";
import { AUTHOR, SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { gygUrl } from "@/lib/gyg";

// Layout for evergreen guide pages (/guide/, /plan/opening-hours/, …).
// Same reading layout as blog posts, plus a sources list and a visible
// independence + affiliate note before the first booking link.
export function GuideArticle({ g }: { g: Guide }) {
  const toc = g.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.description,
            datePublished: g.updated,
            dateModified: g.updated,
            image: absoluteUrl(g.ogImage ?? g.photo.src),
            author: { "@type": "Organization", name: AUTHOR.name, url: AUTHOR.url, description: AUTHOR.bio },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") } },
            mainEntityOfPage: absoluteUrl(g.path),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
          ...(g.schema ?? []),
        ]}
      />
      <main id="main">
        <article>
          <header className="wrap max-w-[760px] pt-8 sm:pt-10">
            <Breadcrumbs items={g.crumbs} />
            <h1 className="hero-rise mt-5 font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.12] tracking-tight">{g.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{g.intro}</p>
            <p className="mt-6 border-t border-line pt-5 text-[0.9rem] text-muted">
              By <Link href="/about/" className="font-semibold text-ink no-underline hover:underline">{AUTHOR.name}</Link>. Last checked {formatDate(g.updated)} against the official Alhambra website. We are an independent guide, not the official
              ticket seller. Some links are <Link href="/affiliate-disclosure/" className="underline underline-offset-2">affiliate links</Link>.
            </p>
          </header>

          <figure className="wrap mt-8 max-w-[1080px]">
            <img src={g.photo.src} width={g.photo.width} height={g.photo.height} srcSet={g.photo.srcSet} sizes="(min-width:1080px) 1080px, 100vw" alt={g.photo.alt} fetchPriority="high" className="aspect-[2/1] w-full rounded-2xl object-cover" />
            <figcaption className="mt-2 text-[0.8rem] text-muted">{g.photo.alt}. Photo: {g.photo.credit}</figcaption>
          </figure>

          <div className="wrap mt-10 grid max-w-[1080px] grid-cols-[minmax(0,1fr)] gap-12 pb-16 lg:grid-cols-[minmax(0,680px)_1fr]">
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
              {g.body.map((b, i) => renderBlock(b, i, g.pageId))}

              <section aria-labelledby="guide-faq" className="mt-14">
                <h2 id="guide-faq" className="mb-4 scroll-mt-28 text-[1.7rem]">Questions people ask</h2>
                <div className="divide-y divide-line rounded-2xl border border-line">
                  {g.faq.map((f) => (
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

              <section aria-labelledby="guide-sources" className="mt-12 rounded-2xl bg-soft p-6 text-[0.95rem] leading-relaxed">
                <h2 id="guide-sources" className="text-[1.1rem]">Sources we checked</h2>
                <ul className="mt-3 space-y-1.5">
                  {g.sources.map((s) => (
                    <li key={s.url}><a href={s.url} target="_blank" rel="noopener" className="text-ink underline underline-offset-2">{s.label}</a></li>
                  ))}
                </ul>
                <p className="mt-3 text-muted">Hours and routes can change at short notice. Check the official site in the days before you go.</p>
                <p className="mt-4 border-t border-line pt-4 text-muted"><span className="font-semibold text-ink">About the author.</span> {AUTHOR.bio}</p>
              </section>
            </div>

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
                  <p className="font-serif text-[1.2rem] font-bold leading-snug text-ink">{g.sidebar.title}</p>
                  <p className="mt-2 text-[0.92rem] text-muted">{g.sidebar.text}</p>
                  <a href={gygUrl(g.sidebar.product, { page: g.pageId, position: "sidebar" })} target="_blank" rel="sponsored nofollow noopener" className="btn btn-primary mt-4 h-11 w-full" data-track="affiliate_click">
                    {g.sidebar.label}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </article>

        <section aria-labelledby="next-title" className="border-t border-line py-14">
          <div className="wrap max-w-[1080px]">
            <h2 id="next-title" className="section-title">Plan the rest of your visit</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {g.next.map((n) => (
                <Link key={n.href} href={n.href} className="group rounded-2xl border border-line p-5 no-underline transition-colors hover:border-ink">
                  <p className="flex items-center justify-between font-bold text-ink">{n.title}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></p>
                  <p className="mt-1 text-[0.93rem] text-muted">{n.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
