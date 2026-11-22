import Link from "next/link";
import { ArrowRight, Check, Ship, X } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { DayPlanner } from "@/components/day-trips/day-planner";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { CITIES, DAY_TRIP_CHECKLIST, type City } from "@/content/day-trips";
import { LAST_CHECKED } from "@/content/facts";
import { PHOTOS } from "@/content/photos";
import { AUTHOR, SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { gygUrl } from "@/lib/gyg";
import { AffiliateNote } from "@/components/affiliate-note";

// One template, one data entry per departure city.
export function DayTripPage({ slug }: { slug: City["slug"] }) {
  const c = CITIES[slug];
  const coach = c.styles[0];
  const photo = slug === "seville" ? PHOTOS.myrtles : PHOTOS.generalife;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `Alhambra day trip from ${c.name}: tours, prices and how to do it`,
            image: absoluteUrl("/images/og-default.jpg"),
            datePublished: "2026-11-21",
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: AUTHOR.name, url: AUTHOR.url },
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") } },
            mainEntityOfPage: absoluteUrl(c.path),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <main id="main">
        {/* Hero */}
        <section className="bg-white">
          <div className="wrap pb-6 pt-8 sm:pt-10">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/day-trips/", label: "Day trips" }, { href: c.path, label: `From ${c.name}` }]} />
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
              <h1 className="font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em]">
                Alhambra day trip from {c.name}
              </h1>
              <p className="max-w-[26rem] text-sm leading-relaxed text-muted sm:text-base lg:justify-self-end lg:pb-2 lg:text-right">{c.intro}</p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-y-4 border-y border-line py-5 md:grid-cols-4">
              {c.facts.map((f, i) => (
                <div key={f.label} className={`flex flex-col-reverse px-1 md:px-5 ${i > 0 ? "md:border-l md:border-line" : ""}`}>
                  <dt className="mt-1.5 text-[0.88rem] text-muted">{f.label}</dt>
                  <dd className="font-serif text-[1.7rem] font-bold leading-none">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <DayPlanner slug={slug} />
            </div>
            {/* Disclosure + freshness right under the first booking button */}
            <div className="mt-3 flex flex-col gap-1 text-[0.85rem] text-muted sm:flex-row sm:items-baseline sm:gap-3">
              <span className="shrink-0">Updated {formatDate(LAST_CHECKED)}</span>
              <span aria-hidden className="hidden sm:inline">·</span>
              <AffiliateNote className="text-[0.85rem]" />
            </div>
          </div>
        </section>

        {/* Tour or DIY */}
        <section aria-labelledby="diy-title" className="py-14 sm:py-16">
          <div className="wrap">
            <h2 id="diy-title" className="section-title">Book a tour or go on your own?</h2>
            <p className="mt-2 max-w-[62ch] text-muted">The deciding question is whether you already have an Alhambra ticket.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-[1.2fr_1fr]">
              <div className="rounded-2xl bg-brand p-7 text-white">
                <h3 className="text-lg font-bold">Book a tour if</h3>
                <ul className="mt-4 space-y-3">
                  {c.tourIf.map((y) => (
                    <li key={y} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-[#9fb2ff]" aria-hidden />{y}</li>
                  ))}
                </ul>
                <a
                  href={gygUrl(coach.query!, { page: `daytrip_${slug}`, position: "tour_if" })}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="btn btn-white mt-7 h-12"
                  data-track="affiliate_click"
                >
                  See trips from {c.name}
                </a>
              </div>
              <div className="rounded-2xl border border-line p-7">
                <h3 className="text-lg font-bold">Go on your own if</h3>
                <ul className="mt-4 space-y-3 text-muted">
                  {c.diyIf.map((n) => (
                    <li key={n} className="flex gap-3"><X className="mt-0.5 size-5 shrink-0 text-[#9aa1ad]" aria-hidden />{n}</li>
                  ))}
                </ul>
                <table className="mt-6 w-full text-left text-[0.92rem]">
                  <caption className="sr-only">Getting from {c.name} to Granada</caption>
                  <tbody className="divide-y divide-line border-t border-line">
                    {c.transport.map((t) => (
                      <tr key={t.mode}>
                        <th scope="row" className="py-2.5 pr-3 font-semibold">{t.mode}</th>
                        <td className="py-2.5 pr-3 font-semibold whitespace-nowrap">{t.time}</td>
                        <td className="py-2.5 text-muted">{t.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section aria-labelledby="check-title" className="bg-soft py-14 sm:py-16">
          <div className="wrap">
            <h2 id="check-title" className="section-title">6 things to check before you book</h2>
            <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {DAY_TRIP_CHECKLIST.map((x) => (
                <div key={x.title} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#eef1f8]">
                    <Check className="size-4 text-brand" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold">{x.title}</h3>
                    <p className="mt-0.5 text-[0.95rem] text-muted">{x.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overnight / cruise */}
        <section aria-labelledby="stay-title" className="py-14 sm:py-16">
          <div className="wrap grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <img src={photo.src} width={photo.width} height={photo.height} srcSet={photo.srcSet} sizes="(min-width:1024px) 480px, 100vw" alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <div>
              <h2 id="stay-title" className="section-title">{c.overnight.title}</h2>
              <p className="mt-3 max-w-[54ch] text-muted">{c.overnight.text}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
                <Link href="/tickets/night-visit/" className="text-ink underline underline-offset-2">See the night visit</Link>
                <Link href="/tickets/" className="text-ink underline underline-offset-2">Compare tickets</Link>
              </div>
              {c.extra && (
                <div className="mt-8 flex gap-4 rounded-xl border border-line p-5">
                  <Ship className="mt-0.5 size-6 shrink-0 text-brand" aria-hidden />
                  <div>
                    <h3 className="font-bold">{c.extra.title}</h3>
                    <p className="mt-1 text-[0.95rem] text-muted">{c.extra.text}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Faq items={c.faq} title={`Day trips from ${c.name}: common questions`} />

        <div className="wrap -mt-6 pb-12 text-center">
          <Link href={c.other.path} className="inline-flex items-center gap-2 font-semibold text-ink underline underline-offset-2">
            Leaving from {c.other.name} instead? <ArrowRight className="size-4" aria-hidden />
          </Link>
          <p className="mt-3 text-[0.95rem] text-muted">
            Staying overnight? Plan <Link href="/blog/granada-in-one-day/" className="font-semibold text-ink underline underline-offset-2">Granada in one day</Link>.
          </p>
        </div>

        <FinalCta page={`daytrip_${slug}`} />
      </main>
    </>
  );
}
