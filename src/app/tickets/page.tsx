import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { FeaturedTickets } from "@/components/tickets/featured-tickets";
import { AllTickets } from "@/components/tickets/all-tickets";
import { SoldOutPlan, HowToBook } from "@/components/tickets/ticket-sections";
import { Offers } from "@/components/home/offers";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { KEY_FACTS, LAST_CHECKED, OFFICIAL_TICKETS } from "@/content/facts";
import { TICKETS_FAQ } from "@/content/tickets";
import { SITE, absoluteUrl } from "@/lib/site";
import { euro, formatDate } from "@/lib/format";

// Primary keyword: "alhambra ticket types". Also targets "alhambra tickets
// price 2026", "which alhambra ticket", "alhambra tickets sold out" (section),
// "how to buy alhambra tickets" (section), "nasrid palaces tickets" (matrix).

export const metadata: Metadata = {
  title: "Alhambra Ticket Types & Prices 2026: Which One to Buy",
  description:
    "All 8 official Alhambra tickets compared: prices, which include the Nasrid Palaces, which sell out first, and what to book when the General ticket is sold out.",
  alternates: { canonical: "/tickets/" },
};

const JUMP = [
  { href: "#all-tickets", label: "Compare all 8" },
  { href: "#sold-out", label: "Sold out?" },
  { href: "#tours", label: "Tours with tickets" },
];

export default function TicketsPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Alhambra ticket types and prices 2026",
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@type": "Organization", name: SITE.name },
            mainEntityOfPage: absoluteUrl("/tickets/"),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Official Alhambra tickets",
            itemListElement: OFFICIAL_TICKETS.map((t, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "Offer", name: t.name, price: t.price, priceCurrency: "EUR", description: t.includes },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: TICKETS_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <main id="main">
        {/* Hero — same language as the home hero (Wander Far layout) */}
        <section className="bg-white">
          <div className="wrap pb-6 pt-8 sm:pt-10">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/tickets/", label: "Tickets" }]} />

            <div className="hero-rise mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
              <h1 className="text-[clamp(2.2rem,5.4vw,4.4rem)] font-serif font-bold leading-[1] tracking-[-0.035em]">
                Alhambra ticket types &amp; prices 2026
              </h1>
              <p className="max-w-[26rem] text-[1.05rem] leading-relaxed text-muted lg:justify-self-end lg:pb-2 lg:text-right">
                There are 8 official tickets. Only 3 include the Nasrid Palaces by day. Here&rsquo;s which one to buy, and what to do if it&rsquo;s sold out.
              </p>
            </div>

            {/* Quick answer: written to be quoted by Google and AI answers */}
            <div className="mt-10 grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-[0_10px_30px_rgba(20,24,31,0.06)] sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-brand">Quick answer</p>
                <p className="mt-2 text-[1.12rem] leading-relaxed">
                  Buy the <strong>Alhambra General</strong> ticket ({euro(KEY_FACTS.generalPrice)}) on the official site as soon as your dates are fixed. It includes the Nasrid Palaces by day, the Generalife and the gardens. If it&rsquo;s sold out, try <strong>Alhambra Experiences</strong> or <strong>Dobla de Oro</strong>, then a guided tour with tickets included.
                </p>
                <p className="mt-3 text-sm text-muted">Checked {formatDate(LAST_CHECKED)} by {SITE.author.name}</p>
              </div>
              <ul className="grid gap-2">
                {JUMP.map((j) => (
                  <li key={j.href}>
                    <Link href={j.href} className="flex items-center justify-between rounded-xl bg-soft px-4 py-3 font-semibold no-underline transition-colors hover:bg-[#eceae5]">
                      {j.label}
                      <ArrowDown className="size-4 text-muted" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FeaturedTickets />
        <AllTickets />
        <SoldOutPlan />
        <div id="tours" className="scroll-mt-24">
          <Offers />
        </div>
        <HowToBook />
        <Faq items={TICKETS_FAQ} title="Alhambra tickets: common questions" />
        <FinalCta />
      </main>
    </>
  );
}
