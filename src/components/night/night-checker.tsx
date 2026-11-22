"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Clock, Moon } from "lucide-react";
import { LAST_CHECKED } from "@/content/facts";
import { NIGHT_QUERY, runsOn, seasonFor } from "@/content/night";
import { gygUrl } from "@/lib/gyg";

// Pick a date → does the night visit run, at what time, and if not, the
// nearest nights that do.

const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromIso = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const fmt = (d: Date, long = false) =>
  d.toLocaleDateString("en-GB", { weekday: long ? "long" : "short", day: "numeric", month: "short" });

function nearestNights(d: Date) {
  const out: Date[] = [];
  for (let i = 1; out.length < 3 && i < 21; i++) {
    const n = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    if (runsOn(n)) out.push(n);
  }
  return out;
}

export function NightChecker() {
  const [iso, setIso] = useState(LAST_CHECKED);
  const [min, setMin] = useState(LAST_CHECKED);

  useEffect(() => {
    const today = toIso(new Date());
    setIso(today);
    setMin(today);
  }, []);

  const date = fromIso(iso);
  const season = seasonFor(date);
  const runs = runsOn(date);
  const next = nearestNights(date);

  return (
    <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-[0_4px_24px_rgba(20,24,31,0.05)] sm:rounded-3xl sm:p-7">
      <div className="grid gap-6 md:grid-cols-[minmax(0,16rem)_1fr]">
        {/* Left Column: Date Input & Season Info */}
        <div>
          <label
            htmlFor="night-date"
            className="block text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#717b8c]"
          >
            Your date in Granada
          </label>
          <div className="relative mt-2 flex items-center rounded-xl border border-line/80 bg-[#faf8f5] px-3.5 py-2.5 transition focus-within:border-[#1e3425] focus-within:ring-2 focus-within:ring-[#1e3425]/10">
            <CalendarDays className="size-4 shrink-0 text-[#b87428]" aria-hidden />
            <input
              id="night-date"
              type="date"
              value={iso}
              min={min}
              onChange={(e) => e.target.value && setIso(e.target.value)}
              className="ml-2 w-full cursor-pointer bg-transparent text-[0.95rem] font-semibold text-ink outline-none"
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            {season.label}: {season.range}
          </p>
        </div>

        {/* Right Column: Status & Schedule Info */}
        <div aria-live="polite">
          {runs ? (
            <div className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#166534]">
                <span className="size-2 rounded-full bg-[#16a34a] animate-pulse" aria-hidden />
                Night visits run on {fmt(date, true)}
              </span>
              <div className="mt-2 flex items-center gap-2 font-serif text-2xl font-bold text-ink">
                <Clock className="size-5 text-[#b87428]" aria-hidden />
                <span>{season.time}</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Nasrid Palaces only · Ticket office opens {season.ticketOffice}.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-line/70 bg-[#faf8f5] p-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#717b8c]">
                <span className="size-2 rounded-full bg-[#9ca3af]" aria-hidden />
                No night visit on {fmt(date, true)}
              </span>
              <p className="mt-2 text-[0.95rem] font-semibold text-ink">
                In this season it runs <span className="font-bold">{season.daysLabel.toLowerCase()}</span>, {season.time}.
              </p>
              <div className="mt-3">
                <span className="text-xs font-medium text-muted">Nearest nights:</span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {next.map((n) => (
                    <button
                      key={toIso(n)}
                      type="button"
                      onClick={() => setIso(toIso(n))}
                      className="cursor-pointer rounded-full border border-line/80 bg-white px-3.5 py-1 text-xs font-semibold text-ink shadow-xs transition hover:border-[#1e3425] hover:text-[#1e3425]"
                    >
                      {fmt(n)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Quick info + Action CTA */}
      <div className="mt-6 flex flex-col gap-3 border-t border-line/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted">
          <Moon className="size-4 text-[#b87428]" aria-hidden />
          Guided night tours with the ticket included
        </p>
        <a
          href={gygUrl(NIGHT_QUERY, {
            page: "night",
            position: runs ? "checker_runs" : "checker_next",
          })}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1e3425] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#15261b]"
          data-track="affiliate_click"
        >
          <span>{runs ? "Check night tours for this date" : "Check night tours"}</span>
          <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
