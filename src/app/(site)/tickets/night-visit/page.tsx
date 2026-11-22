import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { NightHero } from "@/components/night/night-hero";
import { DayVsNight, NightOptions, NightPlan } from "@/components/night/night-sections";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { LAST_CHECKED } from "@/content/facts";
import { NIGHT_FAQ } from "@/content/night";
import { AUTHOR, SITE, absoluteUrl } from "@/lib/site";

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
            image: absoluteUrl("/images/night-hero.jpg"),
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
        {/* Full-bleed Illuminated Night Hero */}
        <NightHero />

        {/* 3 Ways to See Alhambra at Night */}
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
