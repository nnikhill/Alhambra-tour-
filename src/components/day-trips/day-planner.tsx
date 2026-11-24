"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Users } from "lucide-react";
import { CITIES, type City, type StyleId } from "@/content/day-trips";
import { gygUrl } from "@/lib/gyg";

// "Your day, hour by hour": pick a travel style, see the whole day and the
// price, then one action. The DIY tab is honest about what it takes and
// points to the ticket page instead of an affiliate link.

export function DayPlanner({ slug }: { slug: City["slug"] }) {
  const city = CITIES[slug];
  const [id, setId] = useState<StyleId>("coach");
  const s = city.styles.find((x) => x.id === id)!;

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(20,24,31,0.07)] sm:p-7">
      <div role="group" aria-label="How you travel" className="flex flex-wrap gap-2">
        {city.styles.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={id === x.id}
            onClick={() => setId(x.id)}
            className={`min-h-10 cursor-pointer rounded-full px-4 text-[0.92rem] font-semibold transition-colors ${
              id === x.id ? "bg-ink text-white" : "bg-soft text-muted hover:text-ink"
            }`}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-6 grid gap-6 md:grid-cols-[1.35fr_1fr]">
        <ol className="relative space-y-3.5 before:absolute before:bottom-2 before:left-[3.9rem] before:top-2 before:w-px before:bg-line">
          {s.timeline.map(([t, label]) => (
            <li key={t + label} className="relative grid grid-cols-[3rem_1fr] items-baseline gap-7">
              <span className="text-right text-[0.9rem] font-bold tabular-nums">{t}</span>
              <span className="relative text-[0.97rem] text-[#3d4450] before:absolute before:-left-[1.05rem] before:top-[0.55em] before:size-2 before:rounded-full before:bg-brand">
                {label}
              </span>
            </li>
          ))}
          <li className="pl-[4.75rem] text-[0.8rem] text-muted">Typical times. Each operator sets its own.</li>
        </ol>

        <div className="flex flex-col rounded-xl bg-[#eef1f8] p-5">
          <p className="text-sm font-semibold text-brand">{s.name}</p>
          <p className="mt-1 text-[1.6rem] font-extrabold leading-tight">{s.price}</p>
          {s.priceNote && <p className="text-[0.85rem] text-muted">{s.priceNote}</p>}
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.93rem] text-muted">
            <span className="inline-flex items-center gap-1.5"><Clock className="size-4" aria-hidden />{s.length}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="size-4" aria-hidden />{s.group}</span>
          </p>
          <div className="mt-auto pt-5">
            {s.query ? (
              <a
                href={gygUrl(s.query, { page: `daytrip_${slug}`, position: `planner_${s.id}` })}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="btn btn-primary h-12 w-full"
                data-track="affiliate_click"
              >
                Check dates and prices
              </a>
            ) : (
              <>
                <Link href="/tickets/" className="btn btn-outline h-12 w-full">Compare Alhambra tickets</Link>
                <p className="mt-2 text-center text-[0.83rem] text-muted">No ticket yet? A tour is the safer bet.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
