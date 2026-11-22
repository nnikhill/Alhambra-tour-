"use client";

import { useState } from "react";
import { ArrowRight, Check, Clock, Moon, Sun, Users } from "lucide-react";
import { TOUR_TYPES } from "@/content/tours";
import { gygUrl } from "@/lib/gyg";

type Who = "couple" | "family" | "solo" | "group";
type When = "day" | "night";

const WHO: { id: Who; label: string }[] = [
  { id: "couple", label: "Couple or friends" },
  { id: "family", label: "Family with kids" },
  { id: "solo", label: "On my own" },
  { id: "group", label: "Group of 6+" },
];

const TOUR_THUMBNAILS: Record<string, { image: string; alt: string }> = {
  small: {
    image: "/images/photos/tour-small-group-480.webp",
    alt: "Nasrid Palace interior arches",
  },
  private: {
    image: "/images/photos/hero-960.webp",
    alt: "Alhambra panoramic view",
  },
  night: {
    image: "/images/photos/night-lions-800.webp",
    alt: "Alhambra arches at night",
  },
  group: {
    image: "/images/photos/lions-960.webp",
    alt: "Court of the Lions central fountain",
  },
};

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
  const thumb = TOUR_THUMBNAILS[t.id] ?? TOUR_THUMBNAILS.group;

  return (
    <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-[0_4px_24px_rgba(20,24,31,0.05)] sm:rounded-3xl sm:p-7">
      {/* Top Filter Selection Row */}
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
        {/* Who's going */}
        <fieldset>
          <legend className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#717b8c]">
            Who&rsquo;s going
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {WHO.map((w) => (
              <button
                key={w.id}
                type="button"
                aria-pressed={who === w.id}
                onClick={() => setWho(w.id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-[0.88rem] font-semibold transition-all ${
                  who === w.id
                    ? "bg-[#1e3425] text-white shadow-sm"
                    : "bg-[#f4f2ee] text-[#555f6e] hover:bg-[#eae7e1] hover:text-ink"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* When */}
        <fieldset>
          <legend className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#717b8c]">
            When
          </legend>
          <div className="mt-2.5 flex gap-2">
            {(["day", "night"] as When[]).map((w) => (
              <button
                key={w}
                type="button"
                aria-pressed={when === w}
                onClick={() => setWhen(w)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-[0.88rem] font-semibold transition-all ${
                  when === w
                    ? "bg-[#1e3425] text-white shadow-sm"
                    : "bg-[#f4f2ee] text-[#555f6e] hover:bg-[#eae7e1] hover:text-ink"
                }`}
              >
                {w === "day" ? (
                  <>
                    <Sun className="size-3.5" />
                    <span>Daytime</span>
                  </>
                ) : (
                  <>
                    <Moon className="size-3.5" />
                    <span>Night</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Recommended Tour Card */}
      <div
        aria-live="polite"
        className="mt-6 flex flex-col justify-between gap-5 rounded-2xl border border-line/70 bg-[#faf8f5] p-5 transition-all duration-300 sm:p-6 lg:flex-row lg:items-center"
      >
        {/* Left side: Thumbnail & Information */}
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-xl border border-line/60 bg-soft shadow-sm sm:w-24">
            <img
              src={thumb.image}
              alt={thumb.alt}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#b87428]">
              Your best match
            </span>
            <h2 className="mt-1 font-serif text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {t.name}
            </h2>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-[0.85rem] text-[#4b5563]">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock className="size-3.5 text-[#b87428]" aria-hidden />
                {t.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Users className="size-3.5 text-[#b87428]" aria-hidden />
                {t.group}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                <Check className="size-3.5 text-[#1e3425]" aria-hidden />
                {t.bestFor}
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Live pricing text + CTA Button */}
        <div className="flex flex-col items-start gap-2 border-t border-line/50 pt-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
          <span className="text-xs text-muted underline decoration-muted/40 underline-offset-2">
            Live prices on GetYourGuide
          </span>
          <a
            href={gygUrl(t.query, { page: "tours", position: `matcher_${t.id}` })}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1e3425] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#15261b] sm:w-auto"
            data-track="affiliate_click"
          >
            <span>Check availability</span>
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
