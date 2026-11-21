"use client";

import { useState } from "react";
import { CalendarClock, Moon, Sun } from "lucide-react";
import { OPTIONS, RANKING, type Timeframe } from "@/content/sold-out";
import { OFFICIAL_TICKET_URL } from "@/content/facts";
import { gygUrl } from "@/lib/gyg";

// "When is your visit?" → ranked options. One choice at a time; the best bet
// for that situation is highlighted, with honest availability labels.

const AVAIL_STYLE = {
  Often: "bg-[#e7f6ee] text-[#0f6b3f]",
  Sometimes: "bg-[#fff4dc] text-[#8a5a00]",
  Rarely: "bg-[#fde8e7] text-[#a3261c]",
} as const;

export function OptionFinder() {
  const [tf, setTf] = useState<Timeframe>("week");
  const r = RANKING[tf];

  return (
    <section id="options" aria-labelledby="options-title" className="scroll-mt-24 py-12 sm:py-14">
      <div className="wrap">
        <h2 id="options-title" className="section-title">When is your visit?</h2>
        <div role="tablist" aria-label="When is your visit" className="mt-5 grid max-w-[640px] grid-cols-3 gap-1 rounded-xl bg-soft p-1">
          {(Object.keys(RANKING) as Timeframe[]).map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={tf === k}
              onClick={() => setTf(k)}
              className={`min-h-12 cursor-pointer rounded-lg px-2 text-[0.9rem] font-semibold leading-tight transition-colors sm:text-[0.97rem] ${
                tf === k ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              {RANKING[k].label}
            </button>
          ))}
        </div>
        <p className="mt-4 flex max-w-[64ch] items-start gap-2 text-muted">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
          {r.intro}
        </p>

        <ol key={tf} className="hero-fade mt-7 grid gap-4">
          {r.order.map((id, i) => {
            const o = OPTIONS[id];
            const best = i === 0;
            const href =
              o.cta.kind === "gyg"
                ? gygUrl(o.cta.query!, { page: "sold-out", position: `${tf}_${id}` })
                : o.cta.kind === "official"
                  ? OFFICIAL_TICKET_URL
                  : o.cta.href!;
            const sponsored = o.cta.kind === "gyg";
            return (
              <li
                key={id}
                className={`grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-5 rounded-2xl p-5 sm:p-6 md:grid-cols-[2.5rem_1fr_auto] md:items-center ${
                  best ? "bg-white shadow-[0_14px_40px_rgba(29,43,92,0.14)] ring-2 ring-brand" : "border border-line bg-white"
                }`}
              >
                <span className={`flex size-10 items-center justify-center rounded-full font-bold ${best ? "bg-brand text-white" : "bg-[#eef1f8] text-brand"}`}>
                  {i + 1}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {best && <span className="rounded-md bg-brand px-2 py-0.5 text-[0.78rem] font-bold text-white">Best bet</span>}
                    <h3 className="text-[1.12rem] font-bold">{o.title}</h3>
                  </div>
                  <p className="mt-1.5 max-w-[68ch] text-[0.96rem] text-muted">{o.what}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.85rem]">
                    <span className={`rounded-full px-2.5 py-0.5 font-semibold ${AVAIL_STYLE[o.availability]}`}>
                      Availability: {o.availability.toLowerCase()}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2.5 py-0.5 font-medium">
                      {o.palaces.includes("night") ? <Moon className="size-3.5" aria-hidden /> : <Sun className="size-3.5" aria-hidden />}
                      {o.palaces}
                    </span>
                    <span className="rounded-full bg-soft px-2.5 py-0.5 font-semibold">{o.price}</span>
                  </div>
                </div>
                <a
                  href={href}
                  target="_blank"
                  rel={sponsored ? "sponsored nofollow noopener" : "noopener"}
                  className={`btn col-span-2 h-12 w-full md:col-span-1 md:w-auto ${best || sponsored ? "btn-primary" : "btn-outline"}`}
                  {...(sponsored ? { "data-track": "affiliate_click" } : {})}
                >
                  {o.cta.label}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
