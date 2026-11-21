import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
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
import { AUTHOR, SITE, absoluteUrl } from "@/lib/site";
import { euro, formatDate } from "@/lib/format";
import { AffiliateNote } from "@/components/affiliate-note";
import { gygUrl } from "@/lib/gyg";

// Primary keyword: "alhambra ticket types". Also targets "alhambra tickets
// price 2026", "which alhambra ticket", "alhambra tickets sold out" (section),
// "how to buy alhambra tickets" (section), "nasrid palaces tickets" (matrix).

export const metadata: Metadata = withOg({
  title: "Alhambra Ticket Types & Prices 2026: Which One to Buy",
  description:
    "All 8 official Alhambra tickets compared: prices, which include the Nasrid Palaces, which sell out first, and what to book when the General ticket is sold out.",
  alternates: { canonical: "/tickets/" },
}, "/tickets/");

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
            image: absoluteUrl("/images/og-default.jpg"),
            datePublished: "2026-11-21",
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: AUTHOR.name, url: AUTHOR.url },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") } },
            mainEntityOfPage: absoluteUrl("/tickets/"),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Official Alhambra tickets",
            itemListElement: OFFICIAL_TICKETS.map((t, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: t.name,
              description: `${t.includes}. Official price €${t.price}.`,
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

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
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
                  Get a ticket that includes the <strong>Nasrid Palaces by day</strong> (the Alhambra General ticket, official price {euro(KEY_FACTS.generalPrice)}) as soon as your dates are fixed. It covers the palaces, the Alcazaba (on an adapted route since 23 Sep 2026), the Generalife and the gardens. If entry tickets are gone, a <strong>guided tour with the ticket included</strong> is the most reliable way in.
                </p>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <a href={gygUrl("Alhambra entry ticket", { page: "tickets", position: "quick_primary" })} target="_blank" rel="sponsored nofollow noopener" className="btn btn-primary h-12" data-track="affiliate_click">
                    See entry tickets
                  </a>
                  <a href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "tickets", position: "quick_secondary" })} target="_blank" rel="sponsored nofollow noopener" className="btn btn-outline h-12" data-track="affiliate_click">
                    Sold out? Tours with tickets
                  </a>
                </div>
                <p className="mt-3"><Link href="/tickets/nasrid-palaces/" className="font-semibold text-ink underline underline-offset-2">How the Nasrid Palaces entry time works</Link></p>
                <p className="mt-3 text-sm text-muted">Checked {formatDate(LAST_CHECKED)} by {SITE.author.name}</p>
                <AffiliateNote className="mt-2" />
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
          <Offers page="tickets" />
        </div>
        <HowToBook />
        <Faq items={TICKETS_FAQ} title="Alhambra tickets: common questions" />
        <FinalCta page="tickets" />
      </main>
    </>
  );
}
