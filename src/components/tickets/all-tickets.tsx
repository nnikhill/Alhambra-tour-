"use client";

import { useState } from "react";
import { Check, Minus, Moon, Sun } from "lucide-react";
import { OFFICIAL_TICKETS, LAST_CHECKED } from "@/content/facts";
import { COVERAGE } from "@/content/tickets";
import { euro, formatDate } from "@/lib/format";
import { ticketLink } from "@/lib/gyg";

type Filter = "all" | "palaces" | "night" | "gardens";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All 8 tickets" },
  { id: "palaces", label: "Nasrid Palaces by day" },
  { id: "night", label: "Night visits" },
  { id: "gardens", label: "Gardens only" },
];

function match(slug: string, f: Filter) {
  const c = COVERAGE[slug];
  if (f === "palaces") return c.nasrid === "day";
  if (f === "night") return c.nasrid === "night" || c.generalife === "night";
  if (f === "gardens") return !c.nasrid;
  return true;
}

// Every cell states its value in words, so nothing reads as a blank.
function Mark({ v, note }: { v: boolean | "day" | "night"; note?: string }) {
  if (!v)
    return (
      <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.85rem] text-muted">
        <Minus className="size-4 text-[#b4b9c2]" aria-hidden /> Not included
      </span>
    );
  const label = v === "night" ? "At night" : v === "day" ? "By day" : "Included";
  return (
    <span className="inline-flex flex-col items-center gap-0.5">
      <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.85rem] font-semibold">
        {v === "night" ? <Moon className="size-4 text-brand" aria-hidden /> : v === "day" ? <Sun className="size-4 text-[#c98a12]" aria-hidden /> : <Check className="size-4 text-brand" aria-hidden />}
        {label}
      </span>
      {note && <span className="text-[0.72rem] font-medium text-muted">{note}</span>}
    </span>
  );
}

export function AllTickets() {
  const [f, setF] = useState<Filter>("all");
  const rows = OFFICIAL_TICKETS.filter((t) => match(t.slug, f));

  return (
    <section id="all-tickets" aria-labelledby="all-title" className="scroll-mt-24 bg-soft py-14 sm:py-16">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="all-title" className="section-title">All 8 official Alhambra tickets compared</h2>
          <p className="text-sm text-muted">Adult online prices, checked {formatDate(LAST_CHECKED)}</p>
        </div>

        <div role="group" aria-label="Filter tickets" className="mt-6 flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {FILTERS.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={f === x.id}
              onClick={() => setF(x.id)}
              className={`min-h-10 shrink-0 cursor-pointer rounded-full px-4 text-[0.92rem] font-semibold transition-colors ${
                f === x.id ? "bg-ink text-white" : "bg-white text-muted ring-1 ring-line hover:text-ink"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <div className="relative mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[900px] text-[0.95rem]">
            <thead>
              <tr className="border-b border-line text-left text-sm text-muted">
                <th scope="col" className="p-4 font-medium">Ticket</th>
                <th scope="col" className="p-4 text-right font-medium">Official price</th>
                <th scope="col" className="p-4 text-center font-medium">Nasrid Palaces</th>
                <th scope="col" className="p-4 text-center font-medium">Generalife &amp; gardens</th>
                <th scope="col" className="p-4 text-center font-medium">Alcazaba</th>
                <th scope="col" className="p-4 text-center font-medium">Albaicín monuments</th>
                <th scope="col" className="p-4 font-medium">Best for</th>
                <th scope="col" className="p-4 font-medium">Book</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => {
                const c = COVERAGE[t.slug];
                return (
                  <tr key={t.slug} className="border-b border-line last:border-0 align-top">
                    <th scope="row" className="p-4 text-left font-semibold">
                      {t.name}
                      {c.extra && <span className="mt-0.5 block text-[0.82rem] font-normal text-muted">{c.extra}</span>}
                    </th>
                    <td className="whitespace-nowrap p-4 text-right font-bold tabular-nums">{euro(t.price)}</td>
                    <td className="p-4 text-center"><Mark v={c.nasrid} /></td>
                    <td className="p-4 text-center"><Mark v={c.generalife} /></td>
                    <td className="p-4 text-center"><Mark v={c.alcazaba} note={c.alcazaba ? "adapted route" : undefined} /></td>
                    <td className="p-4 text-center"><Mark v={c.albaicin} /></td>
                    <td className="p-4 text-muted">{t.bestFor}</td>
                    <td className="p-4 text-right">
                      {(() => {
                        const l = ticketLink(t.slug, { page: "tickets", position: `table_${t.slug}` });
                        return (
                          <a
                            href={l.href}
                            target="_blank"
                            rel={l.rel}
                            className="btn btn-outline min-h-10 whitespace-nowrap px-4 text-[0.9rem]"
                            data-track={l.track}
                            aria-label={`${l.official ? "Official site" : "Check dates"}: ${t.name}`}
                          >
                            {l.official ? "Official site" : "Check dates"}
                          </a>
                        );
                      })()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><Sun className="size-4 text-[#c98a12]" aria-hidden /> By day</span>
          <span className="inline-flex items-center gap-1.5"><Moon className="size-4 text-brand" aria-hidden /> At night</span>
          <span>Prices are the Patronato&rsquo;s official adult prices, checked {formatDate(LAST_CHECKED)}. &ldquo;Check dates&rdquo; goes to GetYourGuide, which resells these tickets with a booking fee, so its price is higher. Tickets GetYourGuide doesn&rsquo;t sell link to the official shop.</span>
        </p>
      </div>
    </section>
  );
}
