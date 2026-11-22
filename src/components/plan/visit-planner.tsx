"use client";

import { useState } from "react";
import { ArrowRight, Bus, Car, Clock, Footprints } from "lucide-react";
import { gygUrl } from "@/lib/gyg";

// Enter your Nasrid Palaces time and how you're getting up the hill; get the
// day worked back from the slot.

type Arrive = "walk" | "bus" | "taxi";

const SLOTS: string[] = [];
for (let m = 8 * 60 + 30; m <= 17 * 60 + 30; m += 30) {
  SLOTS.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
}

const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

const ARRIVE: { id: Arrive; label: string; icon: typeof Bus; leave: number; from: string }[] = [
  { id: "walk", label: "Walk up", icon: Footprints, leave: 25, from: "Leave Plaza Nueva and walk up the Cuesta de Gomérez" },
  { id: "bus", label: "Minibus", icon: Bus, leave: 25, from: "Catch the C30 or C32 at Plaza Isabel la Católica" },
  { id: "taxi", label: "Taxi", icon: Car, leave: 15, from: "Take a taxi to the main entrance" },
];

function plan(slot: string, arrive: Arrive) {
  const s = toMin(slot);
  const a = ARRIVE.find((x) => x.id === arrive)!;
  const morning = s < 12 * 60;
  const steps: [number, string][] = [];

  if (morning) {
    const at = s - 30;
    steps.push([at - a.leave, a.from]);
    steps.push([at, "Arrive. Show ID and QR code, walk to the Nasrid Palaces"]);
    steps.push([s, "Your slot: Nasrid Palaces (about 1–1.5 h)"]);
    steps.push([s + 90, "Palace of Charles V and the Partal gardens"]);
    steps.push([s + 120, "Walk up to the Generalife and its gardens"]);
    steps.push([s + 180, "Done. Head down for lunch"]);
  } else {
    const at = s - 120;
    steps.push([at - a.leave, a.from]);
    steps.push([at, "Arrive. Start with the Generalife and its gardens"]);
    steps.push([s - 60, "Walk down via the Partal gardens"]);
    steps.push([s - 30, "Be at the Nasrid Palaces entrance, 30 min early"]);
    steps.push([s, "Your slot: Nasrid Palaces (about 1–1.5 h)"]);
    steps.push([s + 90, "Done. Watch sunset from the Mirador de San Nicolás"]);
  }
  return { morning, steps };
}

export function VisitPlanner() {
  const [slot, setSlot] = useState("10:00");
  const [arrive, setArrive] = useState<Arrive>("walk");
  const { morning, steps } = plan(slot, arrive);

  return (
    <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-[0_4px_24px_rgba(20,24,31,0.05)] sm:rounded-3xl sm:p-7">
      {/* Top Selectors Row */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,14rem)_1fr] md:items-start">
        {/* Time dropdown */}
        <div>
          <label
            htmlFor="slot"
            className="block text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#717b8c]"
          >
            Your Nasrid Palaces time
          </label>
          <div className="relative mt-2 flex items-center rounded-xl border border-line/80 bg-[#faf8f5] px-3.5 py-2 transition focus-within:border-[#1e3425] focus-within:ring-2 focus-within:ring-[#1e3425]/10">
            <Clock className="size-4 shrink-0 text-[#b87428]" aria-hidden />
            <select
              id="slot"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className="ml-2 w-full cursor-pointer bg-transparent text-[0.95rem] font-semibold text-ink outline-none"
            >
              {SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-2 text-xs text-muted">It&rsquo;s printed on your ticket.</p>
        </div>

        {/* Transportation pills */}
        <fieldset>
          <legend className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#717b8c]">
            Getting up the hill
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {ARRIVE.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={arrive === id}
                onClick={() => setArrive(id)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[0.88rem] font-semibold transition-all ${
                  arrive === id
                    ? "bg-[#1e3425] text-white shadow-sm"
                    : "bg-[#f4f2ee] text-[#555f6e] hover:bg-[#eae7e1] hover:text-ink"
                }`}
              >
                <Icon className="size-4" aria-hidden />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Recommended Day Itinerary */}
      <div
        className="mt-6 rounded-2xl border border-line/70 bg-[#faf8f5] p-5 sm:p-6"
        aria-live="polite"
      >
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#b87428]">
          {morning
            ? "Morning slot: palaces first, gardens after"
            : "Afternoon slot: gardens first, palaces after"}
        </span>

        <ol className="mt-4 space-y-3">
          {steps.map(([t, label], i) => {
            const isSlot = label.startsWith("Your slot");
            return (
              <li key={i} className="flex items-start gap-3 sm:gap-4">
                <span
                  className={`inline-flex min-w-[3.25rem] shrink-0 items-center justify-center rounded-lg px-2 py-0.5 text-xs font-bold tabular-nums ${
                    isSlot
                      ? "bg-[#1e3425] text-white shadow-xs"
                      : "border border-line/70 bg-white text-[#4b5563]"
                  }`}
                >
                  {fmt(t)}
                </span>
                <span
                  className={`text-xs sm:text-[0.92rem] leading-relaxed ${
                    isSlot ? "font-bold text-ink" : "text-[#374151]"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Bottom Bar: Tours prompt + CTA button */}
      <div className="mt-6 flex flex-col gap-3 border-t border-line/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs sm:text-sm text-muted">
          No ticket for that time yet? Tours with tickets often still have places.
        </p>
        <a
          href={gygUrl("Alhambra guided tour Nasrid Palaces", {
            page: "plan",
            position: "planner",
          })}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1e3425] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#15261b]"
          data-track="affiliate_click"
        >
          <span>Check tours for your date</span>
          <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
