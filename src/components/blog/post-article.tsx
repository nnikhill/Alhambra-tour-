import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CategoryTag } from "@/components/blog/category-tag";
import { PostCard } from "@/components/blog/post-card";
import { AffiliateNote } from "@/components/affiliate-note";
import { renderPostHtml, splitAfterAnswer, tocFromHtml } from "@/lib/blog/render";
import type { PostView } from "@/lib/blog/types";
import type { BookingCta } from "@/db/schema";
import { AUTHOR, SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { gygUrl } from "@/lib/gyg";

// One article layout for the public post page and the admin preview.

const NEXT_STEPS = [
  { href: "/tickets/", title: "Alhambra tickets compared", text: "Every ticket type, price and what it includes." },
  { href: "/tours/", title: "Guided tours with tickets", text: "Group, small-group, private and night tours." },
  { href: "/plan/", title: "Plan your visit", text: "Hours, getting there and a day built around your slot." },
];

const DEFAULT_BOOKING: BookingCta = {
  title: "Tickets sold out for your date?",
  text: "Guided tours include the entry ticket and a Nasrid Palaces time.",
  label: "Check tours for your date",
  query: "Alhambra guided tour Nasrid Palaces",
};

export function PostArticle({ p, related, preview = false }: { p: PostView; related: PostView[]; preview?: boolean }) {
  const pageId = `blog_${p.slug}`;
  const html = renderPostHtml(p.content, pageId);
  const toc = tocFromHtml(p.content);
  const [beforeCard, afterCard] = splitAfterAnswer(html);
  const ogImg = p.ogImage ?? p.image?.src;

  return (
    <>
      {!preview && (
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: p.title,
              description: p.metaDescription,
              datePublished: p.publishedAt,
              dateModified: p.updatedAt,
              ...(ogImg ? { image: absoluteUrl(ogImg) } : {}),
              author: { "@type": "Organization", name: p.author.name, url: AUTHOR.url, description: p.author.bio },
              publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") } },
              mainEntityOfPage: absoluteUrl(`/blog/${p.slug}/`),
              ...(p.focusKeyword ? { keywords: p.focusKeyword } : {}),
            },
          ]}
        />
      )}
      <main id="main">
        {preview && (
          <div className="sticky top-0 z-50 bg-amber-deep px-4 py-2 text-center text-[0.9rem] font-semibold text-white">
            Preview: this is how the post will look. It isn&rsquo;t public until you publish it.
          </div>
        )}
        <article>
          <header className="bg-[#faf4ec] pb-28 pt-8 sm:pb-36 sm:pt-10">
            <div className="wrap">
              <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/blog/", label: "Blog" }, { href: `/blog/${p.slug}/`, label: p.title }]} />
              <div className="mx-auto mt-8 max-w-[46rem] text-center">
                <p className="flex items-center justify-center gap-3 text-[0.9rem] text-muted">
                  <CategoryTag c={p.category} /> <span>{p.readMins} min read</span>
                </p>
                <h1 className="mt-4 text-balance font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em] text-ink">{p.title}</h1>
                {p.excerpt && <p className="mx-auto mt-3 max-w-[38rem] text-pretty text-sm leading-relaxed text-[#3d4450] sm:text-base">{p.excerpt}</p>}
                <div className="mt-6 inline-flex items-center gap-3 text-left text-[0.9rem]">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-[#ecdcc8]">
                    <svg viewBox="0 0 28 32" className="h-5 w-5 text-amber" aria-hidden>
                      <path d="M3 31V14C3 7.4 7.9 2 14 2s11 5.4 11 12v17" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                  </span>
                  <span className="leading-snug">
                    By <Link href="/about/" className="font-semibold text-ink no-underline hover:underline">{p.author.name}</Link>
                    <span className="block text-muted">Updated {formatDate(p.updatedAt)} · checked against the official Alhambra site</span>
                  </span>
                </div>
                {/* Mobile: a booking path in the first screen (desktop has the sidebar card). */}
                <div className="mt-5 lg:hidden">
                  <a
                    href={gygUrl((p.booking ?? DEFAULT_BOOKING).query, { page: `blog_${p.slug}`, position: "header" })}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn btn-primary h-11 px-5 text-[0.95rem]"
                    data-track="affiliate_click"
                  >
                    {(p.booking ?? DEFAULT_BOOKING).label} <ArrowRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </header>

          {p.image ? (
            <figure className="wrap -mt-20 max-w-[1120px] sm:-mt-28">
              <img src={p.image.src} srcSet={p.image.srcSet ?? undefined} width={p.image.width} height={p.image.height} sizes="(min-width:1120px) 1120px, 100vw" alt={p.image.alt} fetchPriority="high" className="aspect-[16/9] w-full rounded-3xl object-cover shadow-[0_24px_60px_rgba(40,24,8,0.18)] sm:aspect-[21/9]" />
              {(p.image.credit || p.image.alt) && <figcaption className="mt-2.5 text-center text-[0.8rem] text-muted">{p.image.alt}{p.image.credit ? `. Photo: ${p.image.credit}` : ""}</figcaption>}
            </figure>
          ) : (
            <div className="-mt-20 sm:-mt-28" />
          )}

          <div className="wrap mt-12 grid max-w-[1120px] grid-cols-[minmax(0,1fr)] gap-14 pb-16 lg:grid-cols-[minmax(0,700px)_1fr]">
            <div>
              {toc.length > 2 && (
                <details className="mb-8 rounded-2xl border border-line px-5 py-4 text-[1rem] lg:hidden">
                  <summary className="flex min-h-6 cursor-pointer list-none items-center justify-between font-semibold text-ink">
                    On this page <ChevronDown className="size-5 text-muted" aria-hidden />
                  </summary>
                  <ol className="mt-3 space-y-2">
                    {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-muted no-underline hover:text-ink">{h.text}</a></li>)}
                  </ol>
                </details>
              )}
              {beforeCard && <div className="post-body" dangerouslySetInnerHTML={{ __html: beforeCard }} />}
              {/* Phones have no sidebar: booking card right after the short answer */}
              <BookingCard slug={p.slug} booking={p.booking} position="mobile_card" className={beforeCard ? "mb-10 lg:hidden" : "mb-10 lg:hidden"} />
              <div className="post-body" dangerouslySetInnerHTML={{ __html: afterCard }} />

              {p.faq.length > 0 && (
                <section aria-labelledby="post-faq" className="mt-16">
                  <h2 id="post-faq" className="mb-5 scroll-mt-28 font-serif text-[1.85rem]">Questions people ask</h2>
                  <div className="divide-y divide-line rounded-2xl border border-line bg-white">
                    {p.faq.map((f) => (
                      <details key={f.q} className="group px-5 py-4">
                        <summary className="flex min-h-6 cursor-pointer list-none items-center justify-between gap-4 text-[1.02rem] font-semibold text-ink">
                          {f.q}
                          <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
                        </summary>
                        <p className="mt-2 text-[1rem] leading-relaxed text-[#2b313b]">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <section aria-labelledby="about-guide" className="mt-12 flex gap-4 rounded-2xl bg-[#faf4ec] p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-[#ecdcc8]">
                  <svg viewBox="0 0 28 32" className="h-6 w-6 text-amber" aria-hidden>
                    <path d="M3 31V14C3 7.4 7.9 2 14 2s11 5.4 11 12v17" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </span>
                <div className="text-[1rem] leading-relaxed">
                  <h2 id="about-guide" className="text-[1.05rem] font-bold text-ink">About this guide</h2>
                  <p className="mt-1 text-[#3d4450]">{p.author.bio}</p>
                  <Link href="/about/" className="mt-2 inline-flex min-h-6 items-center gap-1.5 font-semibold text-ink underline-offset-2 hover:underline">
                    More about us <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </section>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {toc.length > 2 && (
                  <nav aria-label="On this page" className="border-l-2 border-line pl-5">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-muted">On this page</p>
                    <ol className="mt-3 space-y-2.5 text-[0.94rem]">
                      {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-[#3d4450] no-underline hover:text-ink">{h.text}</a></li>)}
                    </ol>
                  </nav>
                )}
                <BookingCard slug={p.slug} booking={p.booking} position="sidebar" />
              </div>
            </aside>
          </div>
        </article>

        <section aria-labelledby="next-title" className="bg-soft py-14 sm:py-16">
          <div className="wrap max-w-[1120px]">
            <h2 id="next-title" className="section-title">Plan the rest of your visit</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {NEXT_STEPS.map((n) => (
                <Link key={n.href} href={n.href} className="group rounded-2xl border border-line bg-white p-5 no-underline transition-colors hover:border-ink">
                  <p className="flex items-center justify-between font-bold text-ink">{n.title}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden /></p>
                  <p className="mt-1 text-[0.93rem] text-muted">{n.text}</p>
                </Link>
              ))}
            </div>
            {related.length > 0 && (
              <>
                <h2 className="section-title mt-14">Keep reading</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((m) => <PostCard key={m.slug} p={m} />)}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function BookingCard({ slug, booking, position, className = "" }: { slug: string; booking: BookingCta | null; position: string; className?: string }) {
  const b = booking ?? DEFAULT_BOOKING;
  return (
    <div className={`rounded-2xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(20,24,31,0.07)] ${className}`}>
      <p className="font-serif text-[1.2rem] font-bold leading-snug text-ink">{b.title}</p>
      {b.text && <p className="mt-1.5 text-[0.94rem] leading-relaxed text-muted">{b.text}</p>}
      <a href={gygUrl(b.query, { page: `blog_${slug}`, position })} target="_blank" rel="sponsored nofollow noopener" className="btn btn-primary mt-4 h-12 w-full" data-track="affiliate_click">
        {b.label}
      </a>
      <AffiliateNote className="mt-3 text-[0.78rem]!" />
    </div>
  );
}

/** Related posts: hand-picked first, then same category, then newest. */
export function pickRelated(p: PostView, all: PostView[], picked: PostView[]) {
  const out = [...picked];
  const add = (x: PostView) => { if (x.id !== p.id && !out.some((o) => o.id === x.id) && out.length < 3) out.push(x); };
  all.filter((x) => p.category && x.category?.slug === p.category.slug).forEach(add);
  all.forEach(add);
  return out.slice(0, 3);
}
