"use client";

import { useState } from "react";
import { Bus, Car, Footprints } from "lucide-react";
import { gygUrl } from "@/lib/gyg";

// Enter your Nasrid Palaces time and how you're getting up the hill; get the
// day worked back from the slot. Morning slots see the palaces first;
// afternoon slots do the Generalife and gardens before.

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
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(20,24,31,0.07)] sm:p-7">
      <div className="grid gap-5 md:grid-cols-[minmax(0,13rem)_1fr]">
        <div>
          <label htmlFor="slot" className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-muted">
            Your Nasrid Palaces time
          </label>
          <select
            id="slot"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="mt-2 h-12 w-full cursor-pointer rounded-xl border border-line bg-white px-3 text-[1rem] font-semibold focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {SLOTS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <p className="mt-2 text-[0.85rem] text-muted">It&rsquo;s printed on your ticket.</p>
        </div>
        <fieldset>
          <legend className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-muted">Getting up the hill</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {ARRIVE.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={arrive === id}
                onClick={() => setArrive(id)}
                className={`inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full px-4 text-[0.93rem] font-semibold transition-colors ${
                  arrive === id ? "bg-ink text-white" : "bg-soft text-muted hover:text-ink"
                }`}
              >
                <Icon className="size-4" aria-hidden /> {label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div key={slot + arrive} className="hero-fade mt-6 rounded-xl bg-[#eef1f8] p-5 sm:p-6" aria-live="polite">
        <p className="text-sm font-semibold text-brand">
          {morning ? "Morning slot: palaces first, gardens after" : "Afternoon slot: gardens first, palaces after"}
        </p>
        <ol className="mt-4 space-y-3">
          {steps.map(([t, label], i) => (
            <li key={i} className="grid grid-cols-[3.25rem_1fr] items-baseline gap-4">
              <span className={`text-right font-bold tabular-nums ${label.startsWith("Your slot") ? "text-brand" : ""}`}>{fmt(t)}</span>
              <span className={label.startsWith("Your slot") ? "font-semibold text-ink" : "text-[#3d4450]"}>{label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.95rem] text-muted">No ticket for that time yet? Tours with tickets often still have places.</p>
        <a
          href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "plan", position: "planner" })}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="btn btn-primary h-12 shrink-0"
          data-track="affiliate_click"
        >
          Check tours for your date
        </a>
      </div>
    </div>
  );
}
