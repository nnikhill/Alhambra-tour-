import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { NightChecker } from "@/components/night/night-checker";
import { DayVsNight, NightOptions, NightPlan } from "@/components/night/night-sections";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { LAST_CHECKED } from "@/content/facts";
import { NIGHT_FAQ } from "@/content/night";
import { SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";

// Primary keyword: "alhambra night visit".
// Also: "alhambra at night", "alhambra night tour", "alhambra night visit
// tickets", "nasrid palaces night visit", "alhambra night visit times",
// "is the alhambra night visit worth it".

export const metadata: Metadata = {
  title: "Alhambra Night Visit 2026: Days, Times, Tickets & Tours",
  description:
    "When the Alhambra night visit runs (check your date), what you see, the €12.73 official ticket vs guided night tours, and how to plan the evening.",
  alternates: { canonical: "/tickets/night-visit/" },
};

export default function NightVisitPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Alhambra night visit 2026: days, times, tickets and tours",
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@type": "Organization", name: SITE.name },
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
            <p className="mt-6 text-[0.9rem] text-muted">Updated {formatDate(LAST_CHECKED)}</p>
            <div className="hero-rise mt-3 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
              <h1 className="font-serif text-[clamp(2.3rem,5.6vw,4.6rem)] font-bold leading-[1] tracking-[-0.03em]">
                The Alhambra at night
              </h1>
              <p className="max-w-[26rem] text-[1.05rem] leading-relaxed text-muted lg:justify-self-end lg:pb-2 lg:text-right">
                The Nasrid Palaces open after dark on set nights only. Pick your date to see if it runs and when.
              </p>
            </div>
            <div className="hero-rise mt-8">
              <NightChecker />
            </div>
          </div>
        </section>

        <DayVsNight />
        <NightOptions />
        <NightPlan />
        <Faq items={NIGHT_FAQ} title="Alhambra night visit: common questions" />
        <FinalCta />
      </main>
    </>
  );
}
