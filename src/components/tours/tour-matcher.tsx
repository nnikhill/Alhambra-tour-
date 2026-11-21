"use client";

import { useState } from "react";
import { Check, Clock, Users } from "lucide-react";
import { TOUR_TYPES } from "@/content/tours";
import { gygUrl } from "@/lib/gyg";

// Two quick choices → one recommended tour style. Kept inside the hero so the
// first screen ends in a single clear action.

type Who = "couple" | "family" | "solo" | "group";
type When = "day" | "night";

const WHO: { id: Who; label: string }[] = [
  { id: "couple", label: "Couple or friends" },
  { id: "family", label: "Family with kids" },
  { id: "solo", label: "On my own" },
  { id: "group", label: "Group of 6+" },
];

function pick(who: Who, when: When) {
  if (when === "night") return "night";
  if (who === "family" || who === "group") return "private";
  if (who === "couple") return "small";
  return "group";
}

export function TourMatcher() {
  const [who, setWho] = useState<Who>("couple");
  const [when, setWhen] = useState<When>("day");
  const t = TOUR_TYPES.find((x) => x.id === pick(who, when))!;

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(20,24,31,0.07)] sm:p-7">
      <div className="grid gap-5 md:grid-cols-[1fr_auto]">
        <fieldset>
          <legend className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-muted">Who&rsquo;s going</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {WHO.map((w) => (
              <button
                key={w.id}
                type="button"
                aria-pressed={who === w.id}
                onClick={() => setWho(w.id)}
                className={`min-h-10 cursor-pointer rounded-full px-4 text-[0.92rem] font-semibold transition-colors ${
                  who === w.id ? "bg-ink text-white" : "bg-soft text-muted hover:text-ink"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-muted">When</legend>
          <div className="mt-2 flex gap-2">
            {(["day", "night"] as When[]).map((w) => (
              <button
                key={w}
                type="button"
                aria-pressed={when === w}
                onClick={() => setWhen(w)}
                className={`min-h-10 cursor-pointer rounded-full px-4 text-[0.92rem] font-semibold transition-colors ${
                  when === w ? "bg-ink text-white" : "bg-soft text-muted hover:text-ink"
                }`}
              >
                {w === "day" ? "Daytime" : "Night"}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div key={t.id} className="hero-fade mt-6 grid gap-4 rounded-xl bg-[#eef1f8] p-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-semibold text-brand">Your best match</p>
          <p className="mt-1 text-[1.3rem] font-bold leading-snug">{t.name}</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.93rem] text-muted">
            <span className="inline-flex items-center gap-1.5"><Clock className="size-4" aria-hidden />{t.duration}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="size-4" aria-hidden />{t.group}</span>
            <span className="inline-flex items-center gap-1.5"><Check className="size-4 text-brand" aria-hidden />{t.bestFor}</span>
          </p>
        </div>
        <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-2">
          <p className="leading-tight md:text-right">
            <span className="block text-sm text-muted">From</span>
            <span className="text-[1.6rem] font-extrabold">€{t.priceFrom}</span>
          </p>
          <a
            href={gygUrl(t.query, { page: "tours", position: `matcher_${t.id}` })}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn btn-primary h-12 flex-1 md:flex-none"
            data-track="affiliate_click"
          >
            Check availability
          </a>
        </div>
      </div>
    </div>
  );
}
