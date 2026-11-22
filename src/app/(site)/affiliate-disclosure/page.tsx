import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import Link from "next/link";
import { Info, CheckCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = withOg({
  title: "Affiliate Disclosure & Transparency | Alhambra Tour Ticket",
  description:
    "Full disclosure on how Alhambra Tour Ticket earns revenue, our partnership with GetYourGuide, and our strict commitment to editorial independence.",
  alternates: { canonical: "/affiliate-disclosure/" },
}, "/affiliate-disclosure/");

export default function AffiliateDisclosurePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Affiliate Disclosure - ${SITE.name}`,
          url: absoluteUrl("/affiliate-disclosure/"),
          description:
            "Full disclosure on how Alhambra Tour Ticket earns revenue through affiliate partnerships while maintaining total editorial independence.",
        }}
      />
      <main id="main">
        {/* Header */}
        <section className="border-b border-line/60 bg-soft py-12 sm:py-16">
          <div className="wrap max-w-4xl">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/affiliate-disclosure/", label: "Affiliate disclosure" }]} />
            <h1 className="mt-4 font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-tight text-ink leading-[1.12]">
              Affiliate Disclosure &amp; Transparency Policy
            </h1>
            <p className="mt-3.5 text-base leading-relaxed text-muted sm:text-lg">
              We believe in 100% transparency. Here is a clear explanation of how this website earns money, how we choose our partners, and why our recommendations remain strictly honest.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="wrap max-w-4xl">
            <div className="prose prose-slate max-w-none space-y-10 text-[1.05rem] leading-relaxed text-[#2c3340]">
              
              {/* Highlight Box */}
              <div className="rounded-2xl border-l-4 border-l-brand bg-brand/5 p-6 sm:p-7">
                <div className="flex gap-3.5">
                  <Info className="size-6 shrink-0 text-brand" />
                  <div>
                    <h2 className="text-lg font-bold text-ink">In Brief</h2>
                    <p className="mt-1 text-sm sm:text-base text-muted">
                      Some links on {SITE.name} are affiliate links. If you click on one of these links and purchase a tour or ticket, we may receive a small commission at <strong>no extra cost to you</strong>. This funding allows us to keep our independent guides free, up-to-date, and ad-free.
                    </p>
                  </div>
                </div>
              </div>

              {/* What is an affiliate link */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">What Are Affiliate Links?</h2>
                <p className="mt-3">
                  An affiliate link contains a tracking code (such as a partner ID or campaign parameter). When you click a tour recommendation on our site and complete a booking on a verified provider&rsquo;s platform (such as GetYourGuide), the booking platform pays us a referral percentage.
                </p>
                <p className="mt-3">
                  <strong>Crucially: You pay the exact same price</strong> as you would going directly to the provider&rsquo;s website. Many listings on partner sites also offer free cancellation up to 24 hours in advance and mobile tickets; check the terms on each listing.
                </p>
              </div>

              {/* Official tickets first */}
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Our &ldquo;Official Tickets First&rdquo; Commitment
                </h2>
                <p className="mt-3">
                  We are open about how ticket prices compare.
                </p>
                <ul className="mt-4 space-y-2.5 text-sm sm:text-base text-muted">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="mt-1 size-4 shrink-0 text-brand" />
                    <span>
                      The official face value of the General ticket is €22.27, set by the <em>Patronato de la Alhambra y Generalife</em>. We show official prices on our ticket pages so you can compare.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="mt-1 size-4 shrink-0 text-brand" />
                    <span>
                      Our ticket and tour links go to <strong>GetYourGuide</strong>, our affiliate partner. Tickets there cost more than face value because of a booking fee (and a guide, on tours), and we earn a commission when you book.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="mt-1 size-4 shrink-0 text-brand" />
                    <span>
                      We recommend guided tours only when travelers want expert narration, transportation from Seville/Málaga, or when official tickets are completely sold out for their dates.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Our Partners */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Our Booking Partners</h2>
                <p className="mt-3">
                  We only partner with established, licensed, and highly rated booking platforms:
                </p>
                <div className="mt-4 rounded-2xl border border-line p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-ink">GetYourGuide</h3>
                      <p className="mt-1 text-sm text-muted">
                        One of the world&rsquo;s largest and most trusted platforms for travel activities and guided tours, with flexible cancellation policies and 24/7 multilingual customer support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial Independence */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Editorial Independence</h2>
                <p className="mt-3">
                  Our reviews, comparison tables, and guides are written independently. No tour operator can pay for a positive review or higher ranking on our comparison charts. We only recommend tours that have:
                </p>
                <ul className="mt-3 list-disc pl-6 space-y-2 text-muted">
                  <li>Guaranteed access to the Nasrid Palaces (unless clearly noted otherwise)</li>
                  <li>Official, licensed Andalusia tour guides</li>
                  <li>Consistently high customer ratings (typically 4.6/5 or higher)</li>
                  <li>Clear, fair cancellation policies</li>
                </ul>
              </div>

              {/* Questions */}
              <div className="border-t border-line pt-8">
                <h3 className="text-xl font-bold text-ink">Questions About Our Commercial Policies?</h3>
                <p className="mt-2 text-muted">
                  If you have any questions or feedback regarding our affiliate partnerships, please reach out via our{" "}
                  <Link href="/contact/" className="font-semibold text-ink underline underline-offset-2">
                    contact page
                  </Link>.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}