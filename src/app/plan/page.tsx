import type { Metadata } from "next";
import Link from "next/link";
import { Bus, Car, Check, Footprints } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { VisitPlanner } from "@/components/plan/visit-planner";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { LAST_CHECKED } from "@/content/facts";
import { GETTING_THERE, HOURS, PLAN_FACTS, PLAN_FAQ, RULES, SEASONS } from "@/content/plan";
import { PHOTOS } from "@/content/photos";
import { SITE, absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/format";

// Primary keyword: "how to visit the alhambra" / "alhambra visit guide".
// Also: "alhambra opening hours", "how long to visit alhambra", "best time to
// visit alhambra", "how to get to the alhambra", "alhambra rules", "alhambra tips".

export const metadata: Metadata = {
  title: "Plan Your Alhambra Visit 2026: Hours, Getting There & Tips",
  description:
    "Plan your day at the Alhambra: opening hours, how long you need, the best time to go, how to get up the hill and the rules at the gate. Plus a route built around your palace slot.",
  alternates: { canonical: "/plan/" },
};

const ICONS = { walk: Footprints, bus: Bus, taxi: Car } as const;

export default function PlanPage() {
  const photo = PHOTOS.generalife;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Plan your Alhambra visit: hours, getting there and tips",
            dateModified: LAST_CHECKED,
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@type": "Organization", name: SITE.name },
            mainEntityOfPage: absoluteUrl("/plan/"),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PLAN_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <main id="main">
        {/* Hero */}
        <section className="bg-white">
          <div className="wrap pb-6 pt-8 sm:pt-10">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/plan/", label: "Plan your visit" }]} />
            <p className="mt-6 text-[0.9rem] text-muted">Updated {formatDate(LAST_CHECKED)}</p>
            <div className="hero-rise mt-3 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
              <h1 className="font-serif text-[clamp(2.3rem,5.6vw,4.6rem)] font-bold leading-[1] tracking-[-0.03em]">
                Plan your Alhambra visit
              </h1>
              <p className="max-w-[26rem] text-[1.05rem] leading-relaxed text-muted lg:justify-self-end lg:pb-2 lg:text-right">
                Everything is timed around one thing: your Nasrid Palaces slot. Enter it below and we&rsquo;ll lay out your day.
              </p>
            </div>
            <dl className="hero-rise mt-8 grid grid-cols-2 gap-y-4 border-y border-line py-5 md:grid-cols-4">
              {PLAN_FACTS.map((f, i) => (
                <div key={f.label} className={`px-1 md:px-5 ${i > 0 ? "md:border-l md:border-line" : ""}`}>
                  <dd className="font-serif text-[1.7rem] font-bold leading-none">{f.value}</dd>
                  <dt className="mt-1.5 text-[0.88rem] text-muted">{f.label}</dt>
                </div>
              ))}
            </dl>
            <div className="hero-rise mt-8">
              <VisitPlanner />
            </div>
          </div>
        </section>

        {/* Hours */}
        <section aria-labelledby="hours-title" className="py-14 sm:py-16">
          <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 id="hours-title" className="section-title">Alhambra opening hours</h2>
              <p className="mt-3 max-w-[44ch] text-muted">
                Open every day. Your ticket is valid all day, but the Nasrid Palaces only at the time printed on it.
              </p>
              <Link href="/tickets/night-visit/" className="mt-5 inline-block font-semibold text-ink underline underline-offset-2">Night visit dates and times</Link>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[28rem] text-left text-[0.95rem]">
                <thead className="bg-[#f6f8fc]">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Season</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Day visit</th>
                    <th scope="col" className="px-5 py-3.5 font-semibold">Night visit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {HOURS.map((h) => (
                    <tr key={h.season}>
                      <th scope="row" className="px-5 py-3.5 font-semibold">{h.season}</th>
                      <td className="px-5 py-3.5">{h.day}</td>
                      <td className="px-5 py-3.5 text-muted">{h.night}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Getting there */}
        <section aria-labelledby="getting-title" className="bg-soft py-14 sm:py-16">
          <div className="wrap">
            <h2 id="getting-title" className="section-title">How to get to the Alhambra</h2>
            <p className="mt-2 max-w-[62ch] text-muted">The Alhambra sits on a hill above the city centre. Three easy ways up:</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {GETTING_THERE.map((g) => {
                const Icon = ICONS[g.id as keyof typeof ICONS];
                return (
                  <article key={g.id} className="rounded-2xl border border-line bg-white p-6">
                    <span className="flex size-11 items-center justify-center rounded-full bg-[#eef1f8]"><Icon className="size-5 text-brand" aria-hidden /></span>
                    <h3 className="mt-4 text-[1.15rem] font-bold">{g.title}</h3>
                    <p className="text-[0.93rem] font-semibold text-amber-deep">{g.time}</p>
                    <p className="mt-2 text-[0.95rem] text-muted">{g.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Rules */}
        <section aria-labelledby="rules-title" className="py-14 sm:py-16">
          <div className="wrap">
            <h2 id="rules-title" className="section-title">6 rules at the gate</h2>
            <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {RULES.map((r) => (
                <div key={r.title} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#eef1f8]">
                    <Check className="size-4 text-brand" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold">{r.title}</h3>
                    <p className="mt-0.5 text-[0.95rem] text-muted">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasons */}
        <section aria-labelledby="season-title" className="bg-soft py-14 sm:py-16">
          <div className="wrap grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h2 id="season-title" className="section-title">When to go</h2>
              <p className="mt-2 max-w-[56ch] text-muted">Any season works. What changes is the heat, the crowds and how far ahead you need to book.</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {SEASONS.map((s) => (
                  <article key={s.name} className="rounded-2xl border border-line bg-white p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-[1.35rem] font-bold">{s.name}</h3>
                      <span className="text-[0.85rem] text-muted">{s.months}</span>
                    </div>
                    <p className="mt-1 text-[0.9rem] font-semibold text-brand">{s.verdict}</p>
                    <p className="mt-2 text-[0.93rem] text-muted">{s.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <img src={photo.src} srcSet={photo.srcSet} sizes="(min-width:1024px) 440px, 100vw" alt={photo.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
          </div>
        </section>

        <Faq items={PLAN_FAQ} title="Planning your visit: common questions" />
        <FinalCta />
      </main>
    </>
  );
}
