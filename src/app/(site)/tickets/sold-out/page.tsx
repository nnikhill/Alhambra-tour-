import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import { ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { OptionFinder } from "@/components/sold-out/option-finder";
import { Offers } from "@/components/home/offers";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { KEY_FACTS, LAST_CHECKED } from "@/content/facts";
import { DONT, SOLD_OUT_FAQ } from "@/content/sold-out";
import { PHOTOS } from "@/content/photos";
import { AUTHOR, SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { gygUrl } from "@/lib/gyg";
import { AffiliateNote } from "@/components/affiliate-note";

// Primary keyword: "alhambra tickets sold out".
// Also: "last minute alhambra tickets", "alhambra sold out what to do",
// "alhambra cancelled tickets midnight", "granada card alhambra".
// Intent: urgent and transactional — the highest-converting page on the site.

export const metadata: Metadata = withOg({
  title: "Alhambra Tickets Sold Out? 7 Ways to Still Get In (2026)",
  description:
    "Alhambra tickets sold out for your date? 7 ways in that still work, ranked by how soon you go: tours with tickets, night visits, other ticket types and more.",
  alternates: { canonical: "/tickets/sold-out/" },
}, "/tickets/sold-out/");

export default function SoldOutPage() {
  const p = PHOTOS.lions;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Alhambra tickets sold out? 7 ways to still get in",
            image: absoluteUrl("/images/og-default.jpg"),
            datePublished: "2026-11-21",
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: AUTHOR.name, url: AUTHOR.url },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") } },
            mainEntityOfPage: absoluteUrl("/tickets/sold-out/"),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: SOLD_OUT_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <main id="main">
        {/* Hero */}
        <section className="bg-white">
          <div className="wrap pt-8 sm:pt-10">
            <Breadcrumbs
              items={[
                { href: "/", label: "Home" },
                { href: "/tickets/", label: "Tickets" },
                { href: "/tickets/sold-out/", label: "Sold out" },
              ]}
            />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#fde8e7] px-3 py-1 text-sm font-semibold text-[#a3261c]">
                  <span className="size-2 rounded-full bg-[#d92d20]" aria-hidden />
                  Sold out on the official site?
                </p>
                <h1 className="mt-5 text-[clamp(2.2rem,5.2vw,4.2rem)] font-serif font-bold leading-[1] tracking-[-0.035em]">
                  Alhambra tickets sold out? You can still get in.
                </h1>
                <p className="mt-5 max-w-[34rem] text-[1.08rem] leading-relaxed text-muted">
                  &ldquo;Sold out&rdquo; almost always means the General ticket is gone, not that the Alhambra is full. Here are the 7 ways in that still work, ranked for how soon you&rsquo;re going.
                </p>
                <AffiliateNote className="mt-3 max-w-[34rem]" />
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "sold-out", position: "hero" })}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn btn-primary h-14 px-7 text-lg"
                    data-track="affiliate_click"
                  >
                    Find tours with tickets
                  </a>
                  <a href="#options" className="btn btn-outline h-14 px-7 text-lg">See my options</a>
                </div>
                <p className="mt-4 text-sm text-muted">Checked {formatDate(LAST_CHECKED)} by {SITE.author.name}</p>
              </div>

              <div className="relative">
                <img src={p.src} width={p.width} height={p.height} srcSet={p.srcSet} sizes="(min-width:1024px) 480px, 100vw" alt={p.alt} fetchPriority="high" className="aspect-[4/3] w-full rounded-2xl object-cover lg:aspect-[4/5]" />
                <dl className="absolute inset-x-4 bottom-4 grid grid-cols-3 divide-x divide-line rounded-xl bg-white/95 p-3 text-center shadow-sm backdrop-blur">
                  <div className="px-1">
                    <dt className="text-[0.72rem] text-muted">Official General ticket</dt>
                    <dd className="text-lg font-extrabold">€{KEY_FACTS.generalPrice}</dd>
                  </div>
                  <div className="px-1">
                    <dt className="text-[0.72rem] text-muted">Online sales close</dt>
                    <dd className="text-lg font-extrabold">23:59</dd>
                    <dd className="text-[0.72rem] text-muted">the day before</dd>
                  </div>
                  <div className="px-1">
                    <dt className="text-[0.72rem] text-muted">Palace entry times</dt>
                    <dd className="text-lg font-extrabold">Fixed</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <OptionFinder />

        <div id="tours" className="scroll-mt-24">
          <Offers page="sold-out" />
        </div>
        {/* Don't get caught out */}
        <section aria-labelledby="dont-title" className="bg-soft py-14 sm:py-16">
          <div className="wrap">
            <h2 id="dont-title" className="section-title">Three mistakes to avoid when you&rsquo;re desperate</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {DONT.map((d) => (
                <div key={d.title} className="rounded-2xl border border-line bg-white p-6">
                  <ShieldAlert className="size-7 text-alert" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold">{d.title}</h3>
                  <p className="mt-1 text-[0.95rem] text-muted">{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Faq items={SOLD_OUT_FAQ} title="Sold-out Alhambra tickets: your questions" />
        <FinalCta page="sold-out" />
      </main>
    </>
  );
}
