"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Info,
  Languages,
  Landmark,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PHOTOS } from "@/content/photos";
import { gygUrl } from "@/lib/gyg";

type Kind = "day" | "night" | "trip";

const WHAT: { kind: Kind; group: string; options: { label: string; q: string }[] }[] = [
  {
    kind: "day",
    group: "Day visit",
    options: [
      { label: "Guided tour with Nasrid Palaces", q: "Alhambra guided tour Nasrid Palaces" },
      { label: "Small-group tour", q: "Alhambra small group tour" },
      { label: "Private tour", q: "Alhambra private tour" },
      { label: "Entry ticket with audio guide", q: "Alhambra ticket audio guide" },
    ],
  },
  {
    kind: "night",
    group: "Night visit",
    options: [
      { label: "Nasrid Palaces night tour", q: "Alhambra night tour Nasrid Palaces" },
      { label: "Generalife night visit", q: "Alhambra night visit Generalife" },
    ],
  },
  {
    kind: "trip",
    group: "Day trip",
    options: [
      { label: "Day trip from Seville", q: "Alhambra day trip from Seville" },
      { label: "Day trip from Málaga", q: "Alhambra day trip from Malaga" },
      { label: "Day trip from Costa del Sol", q: "Alhambra day trip from Marbella" },
    ],
  },
];

const GROUPS = ["Just me", "2 people", "Family with kids", "Group of 5+"];
const LANGS = ["English", "Spanish", "French", "German", "Italian"];

const HERO = {
  ...PHOTOS.hero,
  src: "/images/photos/hero-1920.webp",
  alt: "The Alhambra fortress and palaces on Sabika Hill in Granada, Spain, bathed in golden hour sunset light",
};

export function Hero() {
  const [pick, setPick] = useState("day:0");
  const [group, setGroup] = useState(GROUPS[1]);
  const [lang, setLang] = useState(LANGS[0]);

  const [kind, idx] = pick.split(":") as [Kind, string];
  const g = WHAT.find((w) => w.kind === kind) ?? WHAT[0];
  const option = g.options[Number(idx)] ?? g.options[0];
  const query = [
    group === "Family with kids" || group === "Group of 5+"
      ? option.q.replace("guided tour", "private tour")
      : option.q,
    lang !== "English" ? `in ${lang}` : "",
  ]
    .join(" ")
    .trim();
  const href = gygUrl(query, { page: "home", position: `hero_search_${g.kind}` });

  return (
    <section className="relative isolate -mt-[5.25rem] flex min-h-[100svh] flex-col items-center justify-between overflow-hidden pt-[5.5rem] lg:h-[100svh]">
      {/* Background panoramic photo */}
      <img
        src={HERO.src}
        width={HERO.width}
        height={HERO.height}
        srcSet={HERO.srcSet}
        sizes="100vw"
        alt={HERO.alt}
        fetchPriority="high"
        className="absolute inset-0 -z-30 size-full object-cover object-[center_42%]"
      />

      {/* Cinematic gradient overlays for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.28)_55%,rgba(0,0,0,0.56)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-b from-black/50 via-transparent to-black/55"
      />

      {/* Main Centered Content */}
      <div className="wrap my-auto flex w-full flex-1 flex-col items-center justify-center py-4 text-center sm:py-6">
        {/* Location pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md sm:text-sm">
          <svg
            viewBox="0 0 24 24"
            className="size-3.5 shrink-0 fill-none stroke-currentColor stroke-[2]"
            aria-hidden
          >
            <path d="M4 21V9l2-2v14M8 21V7l2-2v16M14 21V5l2-2v18M18 21V7l2-2v16M2 21h20M7 9h2M13 7h2M17 9h2" />
          </svg>
          <span>Granada, Spain</span>
        </div>

        {/* Main Headline (Centered, full & prominent) */}
        <h1 className="mt-3.5 max-w-[20ch] text-balance font-serif text-[clamp(2.1rem,4.2vw,3.65rem)] font-normal leading-[1.08] tracking-[-0.025em] text-white sm:mt-4">
          Alhambra tickets that include the{" "}
          <em className="font-serif font-normal italic text-[#e5b364]">Nasrid&nbsp;Palaces</em>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 max-w-[34rem] text-pretty text-sm leading-relaxed text-white/90 sm:mt-3.5 sm:text-base">
          Tickets sell out weeks ahead and the palaces let you in at one fixed time. Pick a tour that
          still has places.
        </p>

        {/* Floating Search Card */}
        <form
          role="search"
          aria-label="Find Alhambra tickets and tours"
          className="mt-6 w-full max-w-[66rem] overflow-hidden rounded-2xl bg-white text-left shadow-[0_24px_60px_rgba(0,0,0,0.30)] ring-1 ring-black/5 sm:mt-8 sm:rounded-3xl"
          onSubmit={(e) => {
            e.preventDefault();
            if (!window.open(href, "_blank", "noopener")) window.location.href = href;
          }}
        >
          {/* Top Form Fields Row */}
          <div className="grid grid-cols-1 divide-y divide-line/70 sm:grid-cols-2 md:grid-cols-[minmax(18rem,2fr)_minmax(11rem,1fr)_minmax(11rem,1fr)_auto] md:divide-x md:divide-y-0">
            {/* Field 1: Tour */}
            <div className="relative px-5 py-3 transition-colors hover:bg-[#faf8f5] sm:px-6 sm:py-3.5">
              <label
                htmlFor="f-tour"
                className="block text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[#717b8c] sm:text-[0.68rem]"
              >
                Tour
              </label>
              <div className="mt-1 flex items-center gap-3">
                <Landmark className="size-5 shrink-0 text-[#b87428]" aria-hidden />
                <select
                  id="f-tour"
                  value={pick}
                  onChange={(e) => setPick(e.target.value)}
                  className="w-full cursor-pointer appearance-none truncate bg-transparent pr-7 text-[0.95rem] font-medium text-ink outline-none"
                >
                  {WHAT.map((w) => (
                    <optgroup key={w.kind} label={w.group}>
                      {w.options.map((o, i) => (
                        <option key={o.label} value={`${w.kind}:${i}`}>
                          {o.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute bottom-3.5 right-4 size-4 text-muted"
              />
            </div>

            {/* Field 2: Who */}
            <div className="relative px-5 py-3 transition-colors hover:bg-[#faf8f5] sm:px-6 sm:py-3.5">
              <label
                htmlFor="f-who"
                className="block text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[#717b8c] sm:text-[0.68rem]"
              >
                Who
              </label>
              <div className="mt-1 flex items-center gap-3">
                <Users className="size-5 shrink-0 text-[#b87428]" aria-hidden />
                <select
                  id="f-who"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  className="w-full cursor-pointer appearance-none truncate bg-transparent pr-7 text-[0.95rem] font-medium text-ink outline-none"
                >
                  {GROUPS.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute bottom-3.5 right-4 size-4 text-muted"
              />
            </div>

            {/* Field 3: Guide Language */}
            <div className="relative px-5 py-3 transition-colors hover:bg-[#faf8f5] sm:px-6 sm:py-3.5">
              <label
                htmlFor="f-lang"
                className="block text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[#717b8c] sm:text-[0.68rem]"
              >
                Guide Language
              </label>
              <div className="mt-1 flex items-center gap-3">
                <Languages className="size-5 shrink-0 text-[#b87428]" aria-hidden />
                <select
                  id="f-lang"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full cursor-pointer appearance-none truncate bg-transparent pr-7 text-[0.95rem] font-medium text-ink outline-none"
                >
                  {LANGS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute bottom-3.5 right-4 size-4 text-muted"
              />
            </div>

            {/* Field 4: Search Button */}
            <div className="flex items-center p-2.5 sm:p-3">
              <a
                href={href}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1e3425] px-7 text-[0.96rem] font-semibold text-white shadow-sm transition hover:bg-[#15261b] sm:h-13 sm:rounded-2xl"
                data-track="affiliate_click"
              >
                <Search className="size-[18px]" aria-hidden /> Show available tours
              </a>
            </div>
          </div>

          {/* Card Footer Sub-bar */}
          <div className="flex flex-col gap-2 border-t border-[#edebe8] bg-[#fbfaf8] px-6 py-3 text-[0.82rem] text-[#555f6e] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-[0.84rem]">
            <a
              href={gygUrl("Alhambra entry ticket", { page: "home", position: "hero_ticket" })}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex items-center gap-2 font-medium text-ink transition hover:underline"
              data-track="affiliate_click"
            >
              <Info className="size-4 shrink-0 text-[#717b8c]" aria-hidden />
              <span>Only need an entry ticket? See entry tickets &rarr;</span>
            </a>
            <div className="flex items-center gap-2 text-[0.8rem] text-[#555f6e] sm:text-[0.82rem]">
              <ShieldCheck className="size-4 shrink-0 text-[#1e3425]" aria-hidden />
              <span>
                We&rsquo;re an independent guide. Links go to GetYourGuide.
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Scroll Indicator & Curved Separator */}
      <div className="flex w-full flex-col items-center pt-2">
        {/* Scroll down button */}
        <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
          <div className="h-px w-10 bg-white/30 sm:w-16" />
          <a
            href="#tickets"
            aria-label="Scroll to tickets"
            className="flex size-8 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white/90 backdrop-blur-md transition hover:border-white hover:text-white sm:size-9"
          >
            <ChevronDown className="size-4" />
          </a>
          <div className="h-px w-10 bg-white/30 sm:w-16" />
        </div>

        {/* Curved wave bottom divider */}
        <div className="relative -mb-px w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block h-10 w-full preserve-3d sm:h-14 lg:h-16"
            preserveAspectRatio="none"
          >
            <path
              d="M0 48C280 96 520 8 820 48C1100 88 1320 32 1440 16V96H0V48Z"
              className="fill-white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}