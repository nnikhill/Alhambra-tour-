import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { TourMatcher } from "@/components/tours/tour-matcher";
import { WorthIt, TourTypes, Checklist, TourDay } from "@/components/tours/tour-sections";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { LAST_CHECKED } from "@/content/facts";
import { TOUR_TYPES, TOURS_FAQ } from "@/content/tours";
import { AUTHOR, SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { AffiliateNote } from "@/components/affiliate-note";
import { GYG_PRODUCTS } from "@/lib/gyg";

// Primary keyword: "alhambra guided tour".
// Also: "best alhambra tour", "alhambra private tour", "alhambra small group
// tour", "alhambra night tour", "is alhambra guided tour worth it",
// "alhambra tour price", "how long is alhambra tour".

export const metadata: Metadata = withOg({
  title: "Alhambra Guided Tours 2026: Compared, Tickets Included",
  description:
    "Compare Alhambra guided tours with tickets included: group, small-group, private and night tours. Length, group size, what's included and which one suits you.",
  alternates: { canonical: "/tours/" },
}, "/tours/");

export default function ToursPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Alhambra guided tours 2026: the best tours compared",
            image: absoluteUrl("/images/og-default.jpg"),
            datePublished: "2026-11-21",
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: AUTHOR.name, url: AUTHOR.url },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") } },
            mainEntityOfPage: absoluteUrl("/tours/"),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Alhambra tour types",
            itemListElement: TOUR_TYPES.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: GYG_PRODUCTS[t.query] ?? undefined })),
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
          <div className="wrap pb-8 pt-8 sm:pb-12 sm:pt-10">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/tours/", label: "Guided tours" }]} />
            
            <div className="mt-6 max-w-3xl">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.65rem] leading-[1.15]">
                Alhambra guided tours, compared
              </h1>
              <p className="mt-3 text-base text-muted sm:text-lg leading-relaxed">
                Every tour here includes the entry ticket. Tell us who&rsquo;s going and when, and we&rsquo;ll point you to the right kind of tour.
              </p>
            </div>

            <div className="mt-8">
              <TourMatcher />
            </div>

            {/* Disclosure + freshness right under the booking tool */}
            <div className="mt-3.5 flex flex-col gap-1 text-[0.82rem] text-muted sm:flex-row sm:items-baseline sm:gap-3">
              <span className="shrink-0">Updated {formatDate(LAST_CHECKED)}</span>
              <span aria-hidden className="hidden sm:inline">·</span>
              <AffiliateNote className="text-[0.82rem]" />
            </div>
          </div>
        </section>

        {/* Comparison first: it is what the title promises and where people book */}
        <TourTypes />
        <WorthIt />
        <TourDay />
        <Checklist />
        <Faq items={TOURS_FAQ} title="Alhambra tours: common questions" />
        <FinalCta page="tours" />
      </main>
    </>
  );
}
