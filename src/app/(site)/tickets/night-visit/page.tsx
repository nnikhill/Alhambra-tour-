import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { NightChecker } from "@/components/night/night-checker";
import { DayVsNight, NightOptions, NightPlan } from "@/components/night/night-sections";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { LAST_CHECKED } from "@/content/facts";
import { NIGHT_FAQ } from "@/content/night";
import { AUTHOR, SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { AffiliateNote } from "@/components/affiliate-note";

// Primary keyword: "alhambra night visit".
// Also: "alhambra at night", "alhambra night tour", "alhambra night visit
// tickets", "nasrid palaces night visit", "alhambra night visit times",
// "is the alhambra night visit worth it".

export const metadata: Metadata = withOg({
  title: "Alhambra Night Visit 2026: Days, Times, Tickets & Tours",
  description:
    "When the Alhambra night visit runs (check your date), what you see, the €12.73 official ticket vs guided night tours, and how to plan the evening.",
  alternates: { canonical: "/tickets/night-visit/" },
}, "/tickets/night-visit/");

export default function NightVisitPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Alhambra night visit 2026: days, times, tickets and tours",
            image: absoluteUrl("/images/og-default.jpg"),
            datePublished: "2026-11-21",
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: AUTHOR.name, url: AUTHOR.url },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") } },
            mainEntityOfPage: absoluteUrl("/tickets/night-visit/"),
          },
          // No FAQPage markup: since Aug 2023 Google shows FAQ rich results only for
          // well-known government and health sites. The FAQ stays on the page.
        ]}
      />

      <main id="main">
        {/* Simple clean hero section */}
        <section className="bg-white">
          <div className="wrap pb-8 pt-8 sm:pb-12 sm:pt-10">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/tickets/", label: "Tickets" }, { href: "/tickets/night-visit/", label: "Night visit" }]} />
            
            <div className="mt-6 max-w-3xl">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.65rem] leading-[1.15]">
                Alhambra night visit: the palaces after dark
              </h1>
              <p className="mt-3 text-base text-muted sm:text-lg leading-relaxed">
                The Nasrid Palaces open after dark on set nights only. Pick your date to see if it runs and when.
              </p>
            </div>

            <div className="mt-8">
              <NightChecker />
            </div>

            {/* Disclosure + freshness right under the booking tool */}
            <div className="mt-3.5 flex flex-col gap-1 text-[0.82rem] text-muted sm:flex-row sm:items-baseline sm:gap-3">
              <span className="shrink-0">Updated {formatDate(LAST_CHECKED)}</span>
              <span aria-hidden className="hidden sm:inline">·</span>
              <AffiliateNote className="text-[0.82rem]" />
            </div>
          </div>
        </section>

        {/* 3 Ways to See Alhambra at Night (keeping the ticket photos) */}
        <NightOptions />

        {/* Day vs Night Comparison Table */}
        <DayVsNight />

        {/* How to Plan Your Night Step-by-Step */}
        <NightPlan />

        {/* Existing FAQ and Final CTA */}
        <Faq items={NIGHT_FAQ} title="Alhambra night visit: common questions" />
        <FinalCta page="night" />
      </main>
    </>
  );
}
