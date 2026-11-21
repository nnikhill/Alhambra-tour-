import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Offers } from "@/components/home/offers";
import { Compare } from "@/components/home/compare";
import { Highlights } from "@/components/home/highlights";
import { KnowBefore } from "@/components/home/know-before";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { StickyCta } from "@/components/sticky-cta";
import { JsonLd } from "@/components/json-ld";
import { HOME_FAQ } from "@/content/faq";
import { LAST_CHECKED, OFFICIAL_TICKETS } from "@/content/facts";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Alhambra Tickets & Guided Tours 2026 | Granada" },
  description:
    "Alhambra tickets sell out weeks ahead. Compare the official ticket with guided tours that include entry and the Nasrid Palaces, and book for your date.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: "Alhambra",
            description: "Palace and fortress complex in Granada, Spain.",
            address: { "@type": "PostalAddress", streetAddress: "Calle Real de la Alhambra, s/n", addressLocality: "Granada", postalCode: "18009", addressCountry: "ES" },
            geo: { "@type": "GeoCoordinates", latitude: 37.1761, longitude: -3.5881 },
            isAccessibleForFree: false,
            offers: OFFICIAL_TICKETS.map((t) => ({ "@type": "Offer", name: t.name, price: t.price, priceCurrency: "EUR" })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: HOME_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Alhambra Tickets & Guided Tours",
            url: absoluteUrl("/"),
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
          },
        ]}
      />
      <main id="main">
        <Hero />
        <Offers />
        <Compare />
        <Highlights />
        <KnowBefore />
        <Faq />
        <FinalCta />
      </main>
      <StickyCta />
    </>
  );
}
