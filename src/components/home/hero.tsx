"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Languages, Search, Ticket, Users } from "lucide-react";
import { PHOTOS } from "@/content/photos";
import { gygUrl } from "@/lib/gyg";
import Link from "next/link";

// Home hero: centred heritage-tourism layout (MotionSites "Mostar Guide"
// direction, rebuilt with DESIGN.md tokens). Goal is booking, so the fold is:
// headline -> one sentence -> one search card -> done. No entrance animation.
//
// SEO: H1 leads with the head term "Alhambra tickets".
// Conversion: the navy search button is the single primary action; the card
// footer offers the entry-ticket path and carries the affiliate disclosure
// right next to the links it describes.

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
  alt: "The Alhambra on its wooded hill above Granada in warm evening light, seen from the Albaicín",
};

export function Hero() {
  // "day:0" = WHAT group kind + option index, so one grouped select replaces the old tabs.
  const [pick, setPick] = useState("day:0");
  const [group, setGroup] = useState(GROUPS[1]);
  const [lang, setLang] = useState(LANGS[0]);

  const [kind, idx] = pick.split(":") as [Kind, string];
  const g = WHAT.find((w) => w.kind === kind) ?? WHAT[0];
  const option = g.options[Number(idx)] ?? g.options[0];
  const query = [
    group === "Family with kids" || group === "Group of 5+" ? option.q.replace("guided tour", "private tour") : option.q,
    lang !== "English" ? `in ${lang}` : "",
  ].join(" ").trim();
  const href = gygUrl(query, { page: "home", position: `hero_search_${g.kind}` });

  return (
    <section className="relative isolate -mt-[4.75rem] flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#f3e6d8] px-4 pb-[clamp(2rem,9svh,6rem)] pt-[calc(4.75rem+clamp(2rem,6svh,4rem))]">
      <img
        src={HERO.src} width={HERO.width} height={HERO.height}
        srcSet={HERO.srcSet}
        sizes="(max-width: 767px) 140vw, (min-aspect-ratio: 28/10) 100vw, 180vh"
        alt={HERO.alt}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[62%_85%]"
      />
      {/* Cream wash: solid behind the text, clear over the palace below */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(250,244,236,0.96)_0%,rgba(250,244,236,0.9)_45%,rgba(250,244,236,0.55)_62%,rgba(250,244,236,0)_80%)]" />

      <div className="flex w-full max-w-[64rem] flex-col items-center text-center">
        <h1 className="max-w-[20ch] text-balance font-serif text-[clamp(2.1rem,min(5.2vw,7.6svh),4.25rem)] font-bold leading-[1.02] tracking-[-0.025em] text-ink">
          Alhambra tickets that include the <em className="font-serif font-bold italic text-amber-deep">Nasrid&nbsp;Palaces</em>
        </h1>

        <p className="mt-[clamp(0.75rem,2.2svh,1.25rem)] max-w-[36rem] text-pretty text-[1.02rem] leading-relaxed text-[#3d4450] sm:text-[1.15rem]">
          Tickets sell out weeks ahead and the palaces let you in at one fixed time. Pick a tour that still has places.
        </p>

        {/* Search card */}
        <form
          role="search"
          aria-label="Find Alhambra tickets and tours"
          className="mt-[clamp(1.25rem,4.5svh,2.5rem)] w-full overflow-hidden rounded-2xl bg-white text-left shadow-[0_18px_48px_rgba(40,24,8,0.16)] ring-1 ring-black/5"
          onSubmit={(e) => {
            e.preventDefault();
            // Popup blocked? Fall back to opening GetYourGuide in this tab.
            if (!window.open(href, "_blank", "noopener")) window.location.href = href;
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-[minmax(17rem,2fr)_minmax(10.5rem,1fr)_minmax(10.5rem,1fr)_auto]">
            <Field label="Tour" icon={Ticket} id="f-what" className="col-span-2 md:col-span-1">
              <select id="f-what" value={pick} onChange={(e) => setPick(e.target.value)} className={selectCls}>
                {WHAT.map((w) => (
                  <optgroup key={w.kind} label={w.group}>
                    {w.options.map((o, i) => <option key={o.label} value={`${w.kind}:${i}`}>{o.label}</option>)}
                  </optgroup>
                ))}
              </select>
            </Field>
            <Field label="Who" icon={Users} id="f-who" className="border-r">
              <select id="f-who" value={group} onChange={(e) => setGroup(e.target.value)} className={selectCls}>
                {GROUPS.map((x) => <option key={x}>{x}</option>)}
              </select>
            </Field>
            <Field label="Guide language" icon={Languages} id="f-lang">
              <select id="f-lang" value={lang} onChange={(e) => setLang(e.target.value)} className={selectCls}>
                {LANGS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <div className="col-span-2 p-2.5 md:col-span-1">
              <a
                href={href}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="btn btn-primary h-full min-h-12 w-full px-6 text-[1rem] md:min-h-14"
                data-track="affiliate_click"
              >
                <Search className="size-[18px]" aria-hidden /> Show available tours
              </a>
            </div>
          </div>

          {/* Card footer: second path for ticket-only buyers + disclosure next to the links */}
          <div className="flex flex-col gap-1 border-t border-line bg-[#fbf8f4] px-5 py-2.5 text-[0.82rem] leading-snug text-muted md:flex-row md:items-center md:justify-between md:gap-6">
            <a
              href={gygUrl("Alhambra entry ticket", { page: "home", position: "hero_ticket" })}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex min-h-6 shrink-0 items-center gap-1.5 py-1 font-semibold text-ink underline-offset-2 hover:underline"
              data-track="affiliate_click"
            >
              Only need an entry ticket? See entry tickets <ArrowRight className="size-3.5" aria-hidden />
            </a>
            <p>
              We&rsquo;re an independent guide. Links go to GetYourGuide and we may earn a commission at no extra cost to you.{" "}
              <Link href="/affiliate-disclosure/" className="underline underline-offset-2">How we earn</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

const selectCls =
  "w-full cursor-pointer appearance-none truncate bg-transparent pr-7 text-[0.98rem] font-medium text-ink outline-none";

function Field({ label, icon: Icon, id, className = "", children }: { label: string; icon: typeof Ticket; id: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative min-w-0 border-b border-line px-4 py-3 transition-colors hover:bg-[#faf7f3] sm:px-5 md:border-b-0 md:border-r ${className}`}>
      <label htmlFor={id} className="block text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-muted">
        {label}
      </label>
      <div className="mt-1 flex items-center gap-2.5">
        <Icon className="size-[18px] shrink-0 text-amber-deep" aria-hidden />
        {children}
      </div>
      <ChevronDown aria-hidden className="pointer-events-none absolute bottom-4 right-4 size-4 text-muted" />
    </div>
  );
}
