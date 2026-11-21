import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
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
import { LAST_CHECKED } from "@/content/facts";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = withOg({
  title: { absolute: "Visit the Alhambra 2026: Tickets, Tours & Planning Guide" },
  description:
    "Plan your visit to the Alhambra in Granada: which ticket to get, guided tours with the Nasrid Palaces, opening hours and what to do when tickets sell out.",
  alternates: { canonical: "/" },
}, "/");

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
            url: "https://www.alhambra-patronato.es/",
            sameAs: ["https://en.wikipedia.org/wiki/Alhambra"],
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
