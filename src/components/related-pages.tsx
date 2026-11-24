import Link from "next/link";
import { ArrowRight } from "lucide-react";

// One registry of the site's key pages, so cross-links use consistent,
// descriptive anchor text and a renamed page is updated in one place.
export const PAGE_LINKS = {
  tickets: { href: "/tickets/", title: "Alhambra tickets compared", text: "All 8 official tickets, prices and what each includes." },
  nasrid: { href: "/tickets/nasrid-palaces/", title: "Nasrid Palaces entry time", text: "How the timed palace slot works." },
  soldOut: { href: "/tickets/sold-out/", title: "Tickets sold out?", text: "The ways in when entry tickets are gone." },
  night: { href: "/tickets/night-visit/", title: "Alhambra at night", text: "Night visit days, times and tickets." },
  tours: { href: "/tours/", title: "Guided tours compared", text: "Tours with the entry ticket included." },
  hours: { href: "/plan/opening-hours/", title: "Opening hours", text: "Day, night and closed days." },
  gettingThere: { href: "/plan/getting-there/", title: "How to get to the Alhambra", text: "Walk, minibus, taxi or car." },
  guide: { href: "/guide/", title: "What to see inside", text: "The palaces, fortress and gardens in order." },
  dayTrips: { href: "/day-trips/", title: "Day trips", text: "From Seville or Málaga, transport included." },
  bestTime: { href: "/blog/best-time-to-visit-the-alhambra/", title: "Best time to visit", text: "Months, days and palace slots compared." },
  howLong: { href: "/blog/how-long-do-you-need-at-the-alhambra/", title: "How long you need", text: "Plan 3 hours, and how to split them." },
  rules: { href: "/blog/alhambra-rules-what-to-bring/", title: "Rules and what to bring", text: "ID, bags and what's checked at the gate." },
  wheelchair: { href: "/blog/alhambra-wheelchair-access/", title: "Wheelchair access", text: "The accessible route, lifts and tickets." },
  kids: { href: "/blog/alhambra-with-kids/", title: "Visiting with kids", text: "Free tickets, timing and a short route." },
  madrid: { href: "/blog/alhambra-day-trip-from-madrid/", title: "Day trip from Madrid", text: "Is it worth it, and how to do it." },
} as const;

export type PageKey = keyof typeof PAGE_LINKS;

export function RelatedPages({ title, pages, className = "" }: { title: string; pages: PageKey[]; className?: string }) {
  return (
    <section aria-labelledby="related-title" className={`py-14 sm:py-16 ${className}`}>
      <div className="wrap">
        <h2 id="related-title" className="section-title">{title}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((k) => {
            const p = PAGE_LINKS[k];
            return (
              <li key={k}>
                <Link
                  href={p.href}
                  className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line bg-white p-5 no-underline transition-colors hover:border-ink"
                >
                  <span>
                    <span className="block font-bold text-ink">{p.title}</span>
                    <span className="mt-1 block text-sm text-muted">{p.text}</span>
                  </span>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
