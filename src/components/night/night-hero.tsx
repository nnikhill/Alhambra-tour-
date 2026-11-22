"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Eye,
  Landmark,
  Moon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { LAST_CHECKED } from "@/content/facts";
import { NIGHT_QUERY, runsOn, seasonFor } from "@/content/night";
import { gygUrl } from "@/lib/gyg";

const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromIso = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const fmtPill = (d: Date) =>
  d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

function nearestNights(d: Date) {
  const out: Date[] = [];
  for (let i = 1; out.length < 3 && i < 21; i++) {
    const n = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    if (runsOn(n)) out.push(n);
  }
  return out;
}

export function NightHero() {
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

  const href = gygUrl(NIGHT_QUERY, { page: "night", position: "hero_checker" });

  return (
    <section className="relative isolate -mt-[5.25rem] flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[5.5rem] lg:min-h-[52rem]">
      {/* Background illuminated night photo */}
      <picture className="absolute inset-0 -z-30 size-full">
        <source srcSet="/images/photos/night-hero-2560.webp" media="(min-width: 1920px)" type="image/webp" />
        <source srcSet="/images/photos/night-hero-1920.webp" media="(min-width: 1280px)" type="image/webp" />
        <source srcSet="/images/photos/night-hero-1280.webp" media="(min-width: 960px)" type="image/webp" />
        <source srcSet="/images/photos/night-hero-960.webp" media="(min-width: 640px)" type="image/webp" />
        <img
          src="/images/night-hero.jpg"
          alt="The Alhambra palace and fortress illuminated with golden lights against a twilight sky in Granada, Spain"
          className="size-full object-cover object-[center_45%]"
          fetchPriority="high"
        />
      </picture>

      {/* Cinematic contrast gradient overlays */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.40)_50%,rgba(0,0,0,0.20)_80%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-r from-black/75 via-black/45 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-b from-black/55 via-transparent to-black/60"
      />

      {/* Main Hero Content */}
      <div className="wrap my-auto flex w-full flex-1 flex-col justify-center py-6 text-left sm:py-8 lg:py-10">
        <div className="max-w-[44rem]">
          {/* Location pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md sm:text-sm">
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 shrink-0 fill-none stroke-currentColor stroke-[2]"
              aria-hidden
            >
              <path d="M4 21V9l2-2v14M8 21V7l2-2v16M14 21V5l2-2v18M18 21V7l2-2v16M2 21h20M7 9h2M13 7h2M17 9h2" />
            </svg>
            <span>Granada, Spain</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-4 font-serif text-[clamp(2.35rem,5.2vw,4.4rem)] font-normal leading-[1.06] tracking-[-0.025em] text-white sm:mt-5">
            Alhambra <br className="hidden sm:inline" />
            night visit: <br />
            <em className="font-serif font-normal italic text-[#e5b364]">the palaces after dark</em>
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 max-w-[34rem] text-base leading-relaxed text-white/90 sm:text-[1.12rem]">
            Experience the Alhambra in a magical atmosphere with evening opening hours.
          </p>

          {/* Feature Badges in a Row */}
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm">
                <Moon className="size-4 text-[#e5b364]" />
              </span>
              <span className="text-xs font-medium leading-tight text-white/90 sm:text-sm">
                A unique <br />
                nighttime experience
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm">
                <Landmark className="size-4 text-[#e5b364]" />
              </span>
              <span className="text-xs font-medium leading-tight text-white/90 sm:text-sm">
                Stunning <br />
                illuminations
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm">
                <Eye className="size-4 text-[#e5b364]" />
              </span>
              <span className="text-xs font-medium leading-tight text-white/90 sm:text-sm">
                A different <br />
                perspective
              </span>
            </div>
          </div>
        </div>

        {/* Floating Night Date Checker Card */}
        <div className="mt-8 w-full max-w-[66rem] overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/5 sm:mt-10 sm:rounded-3xl">
          <div className="grid grid-cols-1 divide-y divide-line/70 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.4fr_1.4fr_auto] lg:divide-x lg:divide-y-0">
            {/* Column 1: Date picker */}
            <div className="px-5 py-3.5 sm:px-6 sm:py-4">
              <label
                htmlFor="night-date"
                className="block text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[#717b8c]"
              >
                Your date in Granada
              </label>
              <div className="relative mt-1">
                <CalendarDays className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-[#b87428]" />
                <input
                  id="night-date"
                  type="date"
                  value={iso}
                  min={min}
                  onChange={(e) => e.target.value && setIso(e.target.value)}
                  className="w-full cursor-pointer bg-transparent pl-6 pr-2 text-[0.95rem] font-semibold text-ink outline-none"
                />
              </div>
            </div>

            {/* Column 2: Schedule summary */}
            <div className="px-5 py-3.5 sm:px-6 sm:py-4">
              <span className="block text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[#717b8c]">
                In this season it runs
              </span>
              <p className="mt-1 text-[0.95rem] font-semibold text-ink">
                {season.daysLabel}, {season.time}.
              </p>
            </div>

            {/* Column 3: Next available night dates */}
            <div className="px-5 py-3.5 sm:px-6 sm:py-4">
              <span className="block text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[#717b8c]">
                Night visits on
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {next.map((n) => (
                  <button
                    key={toIso(n)}
                    type="button"
                    onClick={() => setIso(toIso(n))}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      toIso(n) === iso
                        ? "bg-[#1e3425] text-white"
                        : "bg-soft text-ink hover:bg-[#eceae5]"
                    }`}
                  >
                    {fmtPill(n)}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 4: CTA Button */}
            <div className="flex items-center p-2.5 sm:p-3">
              <a
                href={href}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1e3425] px-6 text-[0.95rem] font-semibold text-white shadow-sm transition hover:bg-[#15261b] sm:rounded-2xl"
                data-track="affiliate_click"
              >
                <span>Check night tours</span>
                <ChevronRight className="size-4" />
              </a>
            </div>
          </div>

          {/* Card Footer Sub-bar */}
          <div className="flex items-center justify-center border-t border-[#edebe8] bg-[#fbfaf8] py-2.5 text-center text-xs text-[#555f6e]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ShieldCheck className="size-3.5 text-[#1e3425]" />
              Guided night tours with the ticket included
            </span>
          </div>
        </div>
      </div>

      {/* Curved wave bottom divider */}
      <div className="relative -mb-px w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-10 w-full preserve-3d sm:h-14 lg:h-18"
          preserveAspectRatio="none"
        >
          <path
            d="M0 48C280 96 520 8 820 48C1100 88 1320 32 1440 16V96H0V48Z"
            className="fill-[#fbf9f5]"
          />
        </svg>
      </div>
    </section>
  );
}