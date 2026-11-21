import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FinalCta } from "@/components/home/final-cta";
import { CITIES } from "@/content/day-trips";
import { PHOTOS } from "@/content/photos";

export const metadata: Metadata = {
  title: "Alhambra Day Trips from Seville and Málaga (2026)",
  description: "Compare Alhambra day trips from Seville and Málaga: travel time, length of the day and prices with ticket and guide included.",
  alternates: { canonical: "/day-trips/" },
};

const CARDS = [
  { c: CITIES.malaga, photo: PHOTOS.generalife },
  { c: CITIES.seville, photo: PHOTOS.myrtles },
];

export default function DayTripsHub() {
  return (
    <main id="main">
      <section className="wrap pb-14 pt-8 sm:pt-10">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/day-trips/", label: "Day trips" }]} />
        <h1 className="hero-rise mt-6 max-w-[16ch] font-serif text-[clamp(2.3rem,5.6vw,4.6rem)] font-bold leading-[1] tracking-[-0.03em]">
          Alhambra day trips
        </h1>
        <p className="mt-4 max-w-[52ch] text-[1.05rem] text-muted">
          Staying on the coast or in Seville? These trips bring you to Granada and back with the Alhambra ticket and a guide included.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {CARDS.map(({ c, photo }) => (
            <Link key={c.slug} href={c.path} className="group flex flex-col overflow-hidden rounded-2xl border border-line no-underline transition-shadow hover:shadow-[0_14px_34px_rgba(20,24,31,0.10)]">
              <img src={photo.src} srcSet={photo.srcSet} sizes="(min-width:768px) 600px, 100vw" alt={photo.alt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-[1.5rem] font-bold text-ink">From {c.name}</h2>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-[0.92rem]">
                  {c.facts.slice(1).map((f) => (
                    <div key={f.label}>
                      <dd className="font-bold text-ink">{f.value}</dd>
                      <dt className="text-muted">{f.label}</dt>
                    </div>
                  ))}
                </dl>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink group-hover:underline">
                  Compare trips from {c.name} <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <FinalCta />
    </main>
  );
}
