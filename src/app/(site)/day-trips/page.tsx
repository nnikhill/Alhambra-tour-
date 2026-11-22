import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FinalCta } from "@/components/home/final-cta";
import { Faq } from "@/components/home/faq";
import { JsonLd } from "@/components/json-ld";
import { CITIES } from "@/content/day-trips";
import { PHOTOS } from "@/content/photos";
import { gygUrl } from "@/lib/gyg";

export const metadata: Metadata = withOg({
  title: "Alhambra Day Trips from Seville and Málaga (2026)",
  description: "Compare Alhambra day trips from Seville and Málaga: distance, travel time, length of the day and what to check is included before you book.",
  alternates: { canonical: "/day-trips/" },
}, "/day-trips/");

const HUB_FAQ = [
  { q: "Is a day trip to the Alhambra worth it?", a: "Yes, if you can't stay in Granada. A trip with transport, a guide and the entry ticket solves the hardest part: getting a Nasrid Palaces time. Expect a long day from Seville and an easy one from Málaga." },
  { q: "Seville or Málaga: which is the easier day trip?", a: "Málaga. Granada is about 125 km away, so the day is shorter and you get more time in the city. From Seville it's about 250 km and a 12–13 hour day." },
  { q: "Do Alhambra day trips include the entry ticket?", a: "Not always. Several popular coach trips sell the Alhambra ticket as an optional extra. Choose the option that includes the Nasrid Palaces." },
  { q: "Can I do it from the Málaga cruise port?", a: "Yes. Some trips pick up at the port. Check the return time against your all-aboard time." },
];

const CARDS = [
  { c: CITIES.malaga, photo: PHOTOS.generalife, query: "Alhambra day trip from Malaga" },
  { c: CITIES.seville, photo: PHOTOS.myrtles, query: "Alhambra day trip from Seville" },
];

export default function DayTripsHub() {
  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HUB_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <section className="wrap pb-14 pt-8 sm:pt-10">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/day-trips/", label: "Day trips" }]} />
        <h1 className="mt-6 max-w-[16ch] font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em]">
          Alhambra day trips
        </h1>
        <p className="mt-3.5 max-w-[52ch] text-sm leading-relaxed text-muted sm:text-base">
          Staying on the coast or in Seville? These trips bring you to Granada and back with a guide, and on most options the Alhambra ticket.
        </p>
        <div className="mt-8 max-w-[760px] rounded-2xl border border-[#efd5b5] bg-[#fdf6ec] p-6">
          <p className="text-[0.85rem] font-semibold text-[#8a4b0a]">Short answer</p>
          <p className="mt-2 text-[1.08rem] leading-relaxed text-ink">
            From Málaga the Alhambra is an easy day trip: about 125 km and 1.5–2 hours each way. From Seville it works too, but it&rsquo;s a 12–13 hour day. Either way, pick a trip that includes the Nasrid Palaces ticket.
          </p>
          <p className="mt-3 text-[0.9rem] text-muted">
            Independent guide, not the official Alhambra seller. Trip links go to GetYourGuide, our affiliate partner.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {CARDS.map(({ c, photo, query }) => (
            <article key={c.slug} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_14px_34px_rgba(20,24,31,0.10)]">
              <Link href={c.path} tabIndex={-1} aria-hidden className="block">
                <img src={photo.src} width={photo.width} height={photo.height} srcSet={photo.srcSet} sizes="(min-width:768px) 600px, 100vw" alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-[1.5rem] font-bold text-ink">
                  <Link href={c.path} className="text-ink no-underline hover:underline">From {c.name}</Link>
                </h2>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-[0.92rem]">
                  {c.facts.slice(1).map((f) => (
                    <div key={f.label} className="flex flex-col-reverse">
                      <dt className="text-muted">{f.label}</dt>
                      <dd className="font-bold text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row sm:items-center">
                  <a
                    href={gygUrl(query, { page: "day_trips", position: `card_${c.slug}` })}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn btn-primary h-12 px-5"
                    data-track="affiliate_click"
                  >
                    See trips on GetYourGuide
                  </a>
                  <Link href={c.path} className="inline-flex min-h-11 items-center justify-center gap-2 px-2 font-semibold text-ink underline-offset-2 hover:underline">
                    Compare trips from {c.name} <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <h2 className="section-title mt-16">Seville or Málaga at a glance</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[30rem] text-left text-[0.95rem]">
            <thead className="bg-[#f6f8fc]">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">From</th>
                {CITIES.malaga.facts.slice(0, 3).map((f) => <th key={f.label} scope="col" className="px-5 py-3.5 font-semibold">{f.label}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[CITIES.malaga, CITIES.seville].map((c) => (
                <tr key={c.slug}>
                  <th scope="row" className="px-5 py-3.5 font-semibold"><Link href={c.path} className="text-ink">{c.name}</Link></th>
                  {c.facts.slice(0, 3).map((f) => <td key={f.label} className="px-5 py-3.5">{f.value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="section-title mt-16">Coach, small group or private?</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            { id: "coach", t: "Coach tour", d: "The simplest option: one booking covers the bus, a guide and usually the Alhambra ticket. You follow a fixed timetable with a larger group.", m: "Alhambra day trip from Malaga", s: "Alhambra day trip from Seville" },
            { id: "small", t: "Small group", d: "A minivan and a smaller group, so the guide has more time for questions and the day runs a little faster at each stop.", m: "Alhambra small group tour from Malaga", s: "Alhambra small group day trip from Seville" },
            { id: "private", t: "Private driver and guide", d: "Your own pick-up time and pace. Best for families, slower walkers or anyone who wants to add Granada's old town.", m: "Alhambra private day trip from Malaga", s: "Alhambra private day trip from Seville" },
          ].map((o) => (
            <div key={o.t} className="flex flex-col rounded-2xl border border-line p-6">
              <h3 className="text-[1.15rem] font-bold">{o.t}</h3>
              <p className="mt-2 flex-1 text-[0.96rem] leading-relaxed text-muted">{o.d}</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <a href={gygUrl(o.m, { page: "day_trips", position: `style_${o.id}_malaga` })} target="_blank" rel="sponsored nofollow noopener" className="btn btn-outline h-11 px-3 text-[0.92rem]" data-track="affiliate_click">From Málaga</a>
                <a href={gygUrl(o.s, { page: "day_trips", position: `style_${o.id}_seville` })} target="_blank" rel="sponsored nofollow noopener" className="btn btn-outline h-11 px-3 text-[0.92rem]" data-track="affiliate_click">From Seville</a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-[62ch] text-[0.95rem] text-muted">
          Whichever you choose, check that the listing includes the Nasrid Palaces ticket and a palace entry time. Without them you&rsquo;ll only see the gardens. The full checklist is on each city page.
        </p>

        <p className="mt-6 max-w-[62ch] text-muted">
          Coming from Madrid? Read <Link href="/blog/alhambra-day-trip-from-madrid/" className="font-semibold text-ink underline underline-offset-2">the Alhambra day trip from Madrid</Link>. Staying the night instead? See <Link href="/blog/granada-in-one-day/" className="font-semibold text-ink underline underline-offset-2">Granada in one day</Link> and our <Link href="/guide/" className="font-semibold text-ink underline underline-offset-2">guide to what to see in the Alhambra</Link>.
        </p>
      </section>
      <Faq items={HUB_FAQ} title="Alhambra day trips: common questions" />
      <FinalCta page="day_trips" />
    </main>
  );
}
