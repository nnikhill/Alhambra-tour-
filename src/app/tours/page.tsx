import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { TourMatcher } from "@/components/tours/tour-matcher";
import { WorthIt, TourTypes, Checklist, TourDay } from "@/components/tours/tour-sections";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { LAST_CHECKED } from "@/content/facts";
import { TOUR_TYPES, TOURS_FAQ } from "@/content/tours";
import { SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";

// Primary keyword: "alhambra guided tour".
// Also: "best alhambra tour", "alhambra private tour", "alhambra small group
// tour", "alhambra night tour", "is alhambra guided tour worth it",
// "alhambra tour price", "how long is alhambra tour".

export const metadata: Metadata = {
  title: "Alhambra Guided Tours 2026: Best Tours Compared (with Tickets)",
  description:
    "Compare Alhambra guided tours with tickets included: group, small-group, private and night tours. Prices, length, what's included and which one suits you.",
  alternates: { canonical: "/tours/" },
};

export default function ToursPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Alhambra guided tours 2026: the best tours compared",
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@type": "Organization", name: SITE.name },
            mainEntityOfPage: absoluteUrl("/tours/"),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Alhambra tour types",
            itemListElement: TOUR_TYPES.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: TOURS_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <main id="main">
        <section className="bg-white">
          <div className="wrap pb-6 pt-8 sm:pt-10">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/tours/", label: "Guided tours" }]} />
            <p className="mt-6 text-[0.9rem] text-muted">Updated {formatDate(LAST_CHECKED)}</p>
            <div className="hero-rise mt-3 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
              <h1 className="text-[clamp(2.2rem,5.4vw,4.4rem)] font-serif font-bold leading-[1] tracking-[-0.035em]">
                Alhambra guided tours, compared
              </h1>
              <p className="max-w-[26rem] text-[1.05rem] leading-relaxed text-muted lg:justify-self-end lg:pb-2 lg:text-right">
                Every tour here includes the entry ticket. Tell us who&rsquo;s going and when, and we&rsquo;ll point you to the right kind of tour.
              </p>
            </div>
            <div className="hero-rise mt-8">
              <TourMatcher />
            </div>
          </div>
        </section>

        <WorthIt />
        <TourTypes />
        <Checklist />
        <TourDay />
        <Faq items={TOURS_FAQ} title="Alhambra tours: common questions" />
        <FinalCta />
      </main>
    </>
  );
}
