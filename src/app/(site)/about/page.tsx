import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import Link from "next/link";
import { Compass, CheckCircle2, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = withOg({
  title: "About Us | Independent Guide to the Alhambra",
  description:
    "Learn about Alhambra Tour Ticket: our mission, editorial independence, and how we help travelers explore the Alhambra without sold-out stress.",
  alternates: { canonical: "/about/" },
}, "/about/");

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${SITE.name}`,
          url: absoluteUrl("/about/"),
          description: SITE.description,
          publisher: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
          },
        }}
      />
      <main id="main">
        {/* Header */}
        <section className="border-b border-line/60 bg-soft py-12 sm:py-16">
          <div className="wrap max-w-4xl">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/about/", label: "About us" }]} />
            <h1 className="mt-4 font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-tight text-ink leading-[1.12]">
              Making Alhambra visits simple, clear, and stress-free.
            </h1>
            <p className="mt-3.5 text-base leading-relaxed text-muted sm:text-lg">
              The Alhambra is Spain&rsquo;s most visited monument. Yet getting tickets is often one of the most frustrating parts of visiting Spain. We built {SITE.name} to change that.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="wrap max-w-4xl">
            <div className="prose prose-slate max-w-none space-y-10 text-[1.05rem] leading-relaxed text-[#2c3340]">
              
              {/* Story */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Why We Built {SITE.name}</h2>
                <p className="mt-4">
                  The Alhambra in Granada is Spain&rsquo;s most visited monument, but planning a visit can feel like navigating a maze. Tickets with the Nasrid Palaces often sell out weeks ahead in busy months, and the palaces can only be entered at the time printed on your ticket, so arriving without a plan can mean missing them.
                </p>
                <p className="mt-3">
                  We created <strong>{SITE.name}</strong> as an independent, traveler-first resource. Our goal is simple: provide clear, transparent, and actionable advice so you can secure access to the Nasrid Palaces and Generalife gardens, even when the official ticket portal appears completely sold out.
                </p>
              </div>

              {/* Guiding Principles */}
              <div className="rounded-3xl border border-line bg-soft/50 p-6 sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Our Editorial Principles</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-sm">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <ShieldCheck className="size-5" />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-ink">Independent</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      We are independent and not affiliated with the <em>Patronato de la Alhambra y Generalife</em>. We earn a commission from GetYourGuide when you book, and we say so on every page with booking links.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-sm">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-amber/15 text-amber-deep">
                      <Compass className="size-5" />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-ink">Honest Prices</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      We show the official price of every ticket (€22.27 for the General ticket), checked against the Patronato&rsquo;s price list, so you can see what a resale ticket or tour adds.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-sm">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <CheckCircle2 className="size-5" />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-ink">Tours That Include the Palaces</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      When entry tickets sell out, tour companies often still have places. We link to tours whose listings say they include the Nasrid Palaces, and we say when an option doesn&rsquo;t include them.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-sm">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                      <HeartHandshake className="size-5" />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-ink">Clear Transparency</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      We clearly disclose our affiliate partnerships. When you book a tour through our partner links, we may earn a small referral fee at zero extra cost to you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Affiliate Disclosure Notice */}
              <div className="rounded-2xl border-l-4 border-l-amber-500 bg-amber-50/70 p-6 sm:p-7">
                <div className="flex gap-3.5">
                  <HeartHandshake className="size-6 shrink-0 text-amber-deep" />
                  <div>
                    <h2 className="text-lg font-bold text-ink">We Are an Affiliate Website</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#3d4450] sm:text-base">
                      {SITE.name} is an independent travel guide and affiliate website. Our booking links go to GetYourGuide, our affiliate partner. When you click our links and book a tour or ticket, we may earn an affiliate commission at zero additional cost to you. This support allows us to maintain and update these visitor guides completely free of charge. For complete details, see our{" "}
                      <Link href="/affiliate-disclosure/" className="font-semibold text-ink underline underline-offset-2">
                        Affiliate Disclosure
                      </Link>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Who We Are */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Who We Are</h2>
                <p className="mt-4">
                  {SITE.name} is run by a small independent team that works with attraction tickets and tour bookings. We are not tour guides and we don&rsquo;t sell tickets ourselves. Every ticket rule, price and opening time on this site is checked against the official Patronato de la Alhambra y Generalife website, each page shows the date it was last checked, and we update pages when the official information changes. If you spot something out of date, please <Link href="/contact/" className="font-semibold underline">tell us</Link>.
                </p>
              </div>

              {/* Quick Navigation Cards */}
              <div className="border-t border-line pt-8">
                <h3 className="text-xl font-bold text-ink">Ready to plan your visit?</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <Link
                    href="/tickets/"
                    className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:border-brand hover:shadow-md"
                  >
                    <div>
                      <p className="font-bold text-ink group-hover:text-brand">Ticket Options</p>
                      <p className="mt-1 text-sm text-muted">Compare all 8 official tickets: day, night and gardens only.</p>
                    </div>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
                      View tickets <ArrowRight className="ml-1 size-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>

                  <Link
                    href="/tours/"
                    className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:border-brand hover:shadow-md"
                  >
                    <div>
                      <p className="font-bold text-ink group-hover:text-brand">Guided Tours</p>
                      <p className="mt-1 text-sm text-muted">Compare small groups, private guides, and night visits.</p>
                    </div>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
                      Explore tours <ArrowRight className="ml-1 size-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>

                  <Link
                    href="/plan/"
                    className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:border-brand hover:shadow-md"
                  >
                    <div>
                      <p className="font-bold text-ink group-hover:text-brand">Visit Planner</p>
                      <p className="mt-1 text-sm text-muted">Custom routes built around your palace entry time slot.</p>
                    </div>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
                      Plan your day <ArrowRight className="ml-1 size-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}