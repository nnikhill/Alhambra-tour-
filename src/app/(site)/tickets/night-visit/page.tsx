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
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: NIGHT_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <main id="main">
        <section className="bg-white">
          <div className="wrap pb-6 pt-8 sm:pt-10">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/tickets/", label: "Tickets" }, { href: "/tickets/night-visit/", label: "Night visit" }]} />
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
              <h1 className="font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em]">
                Alhambra night visit: the palaces after dark
              </h1>
              <p className="max-w-[26rem] text-sm leading-relaxed text-muted sm:text-base lg:justify-self-end lg:pb-2 lg:text-right">
                The Nasrid Palaces open after dark on set nights only. Pick your date to see if it runs and when.
              </p>
            </div>
            <div className="mt-8">
              <NightChecker />
            </div>
            {/* Disclosure + freshness right under the first booking button */}
            <div className="mt-3 flex flex-col gap-1 text-[0.85rem] text-muted sm:flex-row sm:items-baseline sm:gap-3">
              <span className="shrink-0">Updated {formatDate(LAST_CHECKED)}</span>
              <span aria-hidden className="hidden sm:inline">·</span>
              <AffiliateNote className="text-[0.85rem]" />
            </div>
          </div>
        </section>

        {/* Ways to book first, then the comparison and the plan */}
        <NightOptions />
        <DayVsNight />
        <NightPlan />
        <Faq items={NIGHT_FAQ} title="Alhambra night visit: common questions" />
        <FinalCta page="night" />
      </main>
    </>
  );
}
