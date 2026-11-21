"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, Moon } from "lucide-react";
import { LAST_CHECKED } from "@/content/facts";
import { NIGHT_QUERY, runsOn, seasonFor } from "@/content/night";
import { gygUrl } from "@/lib/gyg";

// Pick a date → does the night visit run, at what time, and if not, the
// nearest nights that do. Answers the first question every night-visit
// searcher has, then hands them one clear next step.

const toIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromIso = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const fmt = (d: Date, long = false) =>
  d.toLocaleDateString("en-GB", { weekday: long ? "long" : "short", day: "numeric", month: "short" });

function nearestNights(d: Date) {
  const out: Date[] = [];
  for (let i = 1; out.length < 3 && i < 14; i++) {
    const n = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    if (runsOn(n)) out.push(n);
  }
  return out;
}

export function NightChecker() {
  const [iso, setIso] = useState(LAST_CHECKED);
  const [min, setMin] = useState(LAST_CHECKED);

  // Today's date is only known in the browser; the static HTML ships
  // LAST_CHECKED, then this syncs to the visitor's clock after hydration.
  useEffect(() => {
    const today = toIso(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with the client clock after hydration
    setIso(today);
    setMin(today);
  }, []);

  const date = fromIso(iso);
  const season = seasonFor(date);
  const runs = runsOn(date);
  const next = nearestNights(date);

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(20,24,31,0.07)] sm:p-7">
      <div className="grid gap-6 md:grid-cols-[minmax(0,15rem)_1fr]">
        <div>
          <label htmlFor="night-date" className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-muted">
            Your date in Granada
          </label>
          <div className="relative mt-2">
            <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              id="night-date"
              type="date"
              value={iso}
              min={min}
              onChange={(e) => e.target.value && setIso(e.target.value)}
              className="h-12 w-full rounded-xl border border-line bg-white pl-11 pr-3 text-[1rem] font-semibold focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <p className="mt-3 text-[0.88rem] text-muted">
            {season.label}: {season.range}
          </p>
        </div>

        <div aria-live="polite">
          {runs ? (
            <div className="rounded-xl bg-[#eef1f8] p-5">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#17733f]">
                <span className="size-2 rounded-full bg-[#1f9d55]" aria-hidden />
                Night visits run on {fmt(date, true)}
              </p>
              <p className="mt-2 flex flex-wrap items-baseline gap-x-3 text-[1.6rem] font-extrabold leading-tight">
                <span className="inline-flex items-center gap-2"><Clock className="size-6 text-brand" aria-hidden />{season.time}</span>
              </p>
              <p className="mt-1 text-[0.93rem] text-muted">Nasrid Palaces only. Ticket office opens {season.ticketOffice}.</p>
            </div>
          ) : (
            <div className="rounded-xl border border-line bg-soft p-5">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
                <span className="size-2 rounded-full bg-[#9aa1ad]" aria-hidden />
                No night visit on {fmt(date, true)}
              </p>
              <p className="mt-2 text-[1.05rem] font-semibold">
                In this season it runs {season.daysLabel.toLowerCase()}, {season.time}.
              </p>
              <p className="mt-3 text-[0.9rem] text-muted">Nearest nights:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {next.map((n) => (
                  <button
                    key={toIso(n)}
                    type="button"
                    onClick={() => setIso(toIso(n))}
                    className="min-h-10 cursor-pointer rounded-full bg-white px-4 text-[0.92rem] font-semibold text-ink ring-1 ring-line hover:ring-brand"
                  >
                    {fmt(n)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-[0.95rem] text-muted">
          <Moon className="size-5 text-brand" aria-hidden />
          Guided night tours with the ticket included
        </p>
        <a
          href={gygUrl(NIGHT_QUERY, { page: "night", position: runs ? "checker_runs" : "checker_next" })}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="btn btn-primary h-12"
          data-track="affiliate_click"
        >
          {runs ? "Check night tours for this date" : "Check night tours"}
        </a>
      </div>
    </div>
  );
}
