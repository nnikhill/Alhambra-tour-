import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, HelpCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ContactForm } from "@/components/contact/contact-form";
import { SITE, absoluteUrl } from "@/lib/site";
import { OFFICIAL_TICKET_URL } from "@/content/facts";

export const metadata: Metadata = {
  title: "Contact Us | Alhambra Tour",
  description:
    "Get in touch with the Alhambra Tour team for visit planning questions, tour advice, or site feedback.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${SITE.name}`,
          url: absoluteUrl("/contact/"),
          description: "Get in touch with the Alhambra Tour team.",
        }}
      />
      <main id="main">
        {/* Header */}
        <section className="border-b border-line/60 bg-soft py-12 sm:py-16">
          <div className="wrap max-w-4xl">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/contact/", label: "Contact" }]} />
            <h1 className="mt-5 font-serif text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted sm:text-xl">
              Have a question about planning your visit to the Alhambra, finding tickets for sold-out dates, or feedback on our guides? We&rsquo;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="wrap max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
              {/* Form Column */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-ink">Send Us a Message</h2>
                <p className="mt-2 text-sm text-muted">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
                <div className="mt-6 rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-sm">
                  <ContactForm />
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Important Notice */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
                  <div className="flex gap-3">
                    <AlertCircle className="size-5 shrink-0 text-amber-deep mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-ink">Existing Booking Help?</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        We are an independent informational guide. If you have questions about an existing ticket or tour purchase:
                      </p>
                      <ul className="mt-2 text-xs space-y-1 text-muted">
                        <li>
                          &bull; <strong>Official tickets:</strong> Contact the Patronato directly via{" "}
                          <a href={OFFICIAL_TICKET_URL} target="_blank" rel="noopener" className="underline font-semibold text-ink">
                            official site
                          </a>.
                        </li>
                        <li>
                          &bull; <strong>GetYourGuide bookings:</strong> Use the 24/7 support link in your confirmation voucher.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Email info */}
                <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">Direct Email</p>
                      <p className="font-bold text-ink">contact@alhambratour.com</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 border-t border-line/60 pt-4 text-xs text-muted">
                    <Clock className="size-4 shrink-0 text-brand" />
                    <span>Typical reply time: 24 to 48 hours</span>
                  </div>
                </div>

                {/* Quick Help Links */}
                <div className="rounded-2xl border border-line bg-soft/50 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                    <HelpCircle className="size-4 text-brand" /> Quick Answers
                  </h3>
                  <div className="mt-3 space-y-2 text-sm">
                    <Link
                      href="/tickets/sold-out/"
                      className="group flex items-center justify-between text-muted hover:text-ink"
                    >
                      <span>Official tickets sold out?</span>
                      <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/plan/"
                      className="group flex items-center justify-between text-muted hover:text-ink"
                    >
                      <span>How palace time slots work</span>
                      <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/tours/"
                      className="group flex items-center justify-between text-muted hover:text-ink"
                    >
                      <span>Compare tour options</span>
                      <ArrowRight className="size-3.5 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}