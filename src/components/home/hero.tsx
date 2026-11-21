"use client";

import { useState } from "react";
import { ArrowDown, Bus, ChevronDown, Moon, Languages, MapPin, Search, ShieldCheck, Star, Sun, Ticket, Undo2, Users, Zap } from "lucide-react";
import { KEY_FACTS, OFFICIAL_TICKET_URL } from "@/content/facts";
import { gygUrl } from "@/lib/gyg";

// Full-bleed photo hero (from the user's sunset mockup) keeping the working
// search bar. The sky side of the photo carries the headline; a light wash
// keeps it readable, the palace stays visible below the search bar.
//
// SEO: H1 leads with the head term "Alhambra tickets"; the intro carries
// "guided tours", "Nasrid Palaces" and "Granada".
// Conversion: the search bar is the single action on the fold. Every field
// shapes the GetYourGuide search; nothing is a decoy.

type Tab = "day" | "night" | "trip";

const WHAT: { id: Tab; group: string; icon: typeof Sun; options: { label: string; q: string }[] }[] = [
  {
    id: "day",
    icon: Sun,
    group: "Day visit",
    options: [
      { label: "Guided tour with Nasrid Palaces", q: "Alhambra guided tour Nasrid Palaces" },
      { label: "Small-group tour", q: "Alhambra small group tour" },
      { label: "Private tour", q: "Alhambra private tour" },
      { label: "Entry ticket with audio guide", q: "Alhambra ticket audio guide" },
    ],
  },
  {
    id: "night",
    icon: Moon,
    group: "Night visit",
    options: [
      { label: "Nasrid Palaces night tour", q: "Alhambra night tour Nasrid Palaces" },
      { label: "Generalife night visit", q: "Alhambra night visit Generalife" },
    ],
  },
  {
    id: "trip",
    icon: Bus,
    group: "Day trips",
    options: [
      { label: "Day trip from Seville", q: "Alhambra day trip from Seville" },
      { label: "Day trip from Málaga", q: "Alhambra day trip from Malaga" },
      { label: "Day trip from Costa del Sol", q: "Alhambra day trip from Marbella" },
    ],
  },
];

const GROUPS = ["Just me", "2 people", "Family with kids", "Group of 5+"];
const LANGS = ["English", "Spanish", "French", "German", "Italian"];

// Wider sources than the shared photo set: the hero is cropped to fill the
// screen height, so it needs more pixels than its displayed width.
const fp = (w: number) => `https://commons.wikimedia.org/wiki/Special:FilePath/Alhambra_in_the_evening.jpg?width=${w}`;
const HERO = {
  src: fp(2400),
  srcSet: [1200, 1800, 2400, 3200, 4000].map((w) => `${fp(w)} ${w}w`).join(", "),
  alt: "The Alhambra on its wooded hill above Granada in warm evening light, seen from the Albaicín",
};

export function Hero() {
  const [tab, setTab] = useState<Tab>("day");
  const [opt, setOpt] = useState(0);
  const [group, setGroup] = useState(GROUPS[1]);
  const [lang, setLang] = useState(LANGS[0]);

  const current = WHAT.find((g) => g.id === tab)!;
  const option = current.options[Math.min(opt, current.options.length - 1)];
  const query = [
    group === "Family with kids" || group === "Group of 5+" ? option.q.replace("guided tour", "private tour") : option.q,
    lang !== "English" ? `in ${lang}` : "",
  ].join(" ").trim();
  const href = gygUrl(query, { page: "home", position: `hero_search_${tab}` });

  return (
    <section className="relative isolate -mt-[4.75rem] flex min-h-[46rem] flex-col overflow-hidden bg-[#f3e6d8] pt-[8.5rem] lg:min-h-[max(100svh,52rem)]">
      {/* Photo + washes */}
      <img
        src={HERO.src}
        srcSet={HERO.srcSet}
        sizes="(min-aspect-ratio: 28/10) 100vw, 280vh"
        alt={HERO.alt}
        fetchPriority="high"
        className="hero-reveal-soft absolute inset-0 -z-20 size-full object-cover object-[62%_78%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,250,244,0.94)_0%,rgba(255,248,240,0.82)_38%,rgba(255,246,236,0.25)_62%,rgba(20,14,8,0)_78%,rgba(20,14,8,0.45)_100%)] lg:bg-[linear-gradient(180deg,rgba(255,250,244,0.55)_0%,rgba(255,248,240,0.2)_45%,rgba(20,14,8,0)_75%,rgba(20,14,8,0.45)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,rgba(255,250,244,0.92)_0%,rgba(255,248,240,0.7)_38%,rgba(255,248,240,0)_62%)] lg:block" />

      <div className="wrap flex flex-1 flex-col">
        <p className="hero-rise inline-flex items-center gap-2 self-start rounded-full bg-[#f8e7d2]/90 px-4 py-1.5 text-[0.93rem] font-medium text-ink ring-1 ring-[#efd5b5]">
          <Star className="size-4 fill-amber text-amber" aria-hidden /> Spain&rsquo;s most visited monument
        </p>

        <h1 className="hero-rise mt-6 max-w-[14ch] font-serif text-[clamp(2.7rem,7.2vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-ink">
          Alhambra tickets.
          <br />
          No sold&#8209;out <em className="font-serif font-bold italic text-amber">stress.</em>
        </h1>

        <p className="hero-rise mt-6 max-w-[34rem] text-[1.12rem] leading-relaxed text-[#3d4450] sm:text-[1.2rem]">
          Compare <strong className="font-semibold text-ink">the official ticket</strong> with{" "}
          <strong className="font-semibold text-ink">guided tours that include the Nasrid Palaces</strong>, then book for your date in Granada.
        </p>

        <ul className="hero-rise mt-7 flex flex-wrap items-center gap-y-3 text-[0.93rem] font-medium text-[#2b313b]">
          {[
            { icon: Zap, label: "Instant confirmation" },
            { icon: ShieldCheck, label: "Entry ticket included" },
            { icon: Undo2, label: "Free cancellation on most tours" },
          ].map(({ icon: Icon, label }, i) => (
            <li key={label} className={`flex w-full items-center gap-2.5 pr-5 sm:w-auto ${i > 0 ? "sm:border-l sm:border-[#d9c7b3] sm:pl-5" : ""}`}>
              <Icon className="size-5 text-amber" aria-hidden /> {label}
            </li>
          ))}
        </ul>

        {/* Visit type tabs */}
        <div role="tablist" aria-label="Visit type" className="hero-card mt-8 flex gap-1 self-stretch rounded-full sm:self-start bg-white/75 p-1 shadow-[0_8px_24px_rgba(40,24,8,0.10)] backdrop-blur-md">
          {WHAT.map(({ id, group, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={tab === id}
              onClick={() => { setTab(id); setOpt(0); }}
              className={`flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[0.88rem] sm:flex-none sm:gap-2 sm:px-4 sm:text-[0.93rem] font-semibold transition-colors ${
                tab === id ? "bg-ink text-white" : "text-[#3d4450] hover:text-ink"
              }`}
            >
              <Icon className="size-[17px]" aria-hidden /> {group}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <form
          role="search"
          aria-label="Find Alhambra tickets and tours"
          className="hero-card mt-3 grid max-w-[66rem] overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_50px_rgba(40,24,8,0.18)] md:grid-cols-[1.55fr_1fr_1.05fr_auto] md:rounded-full"
          onSubmit={(e) => { e.preventDefault(); window.open(href, "_blank", "noopener"); }}
        >
          <Field label="What" icon={Ticket} id="f-what" first>
            <select id="f-what" value={opt} onChange={(e) => setOpt(Number(e.target.value))} className={selectCls}>
              {current.options.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
            </select>
          </Field>
          <Field label="Who" icon={Users} id="f-who">
            <select id="f-who" value={group} onChange={(e) => setGroup(e.target.value)} className={selectCls}>
              {GROUPS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Guide language" icon={Languages} id="f-lang">
            <select id="f-lang" value={lang} onChange={(e) => setLang(e.target.value)} className={selectCls}>
              {LANGS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
          <div className="p-2.5">
            <a
              href={href}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="btn btn-amber h-full min-h-14 w-full rounded-full px-7 text-[1rem] md:w-auto"
              data-track="affiliate_click"
            >
              <Search className="size-[18px]" aria-hidden /> Show available tours
            </a>
          </div>
        </form>
        <p className="mt-3 self-start rounded-2xl bg-white/80 px-4 py-2 text-[0.88rem] text-[#2b313b] backdrop-blur-sm">
          Official ticket €{KEY_FACTS.generalPrice}, often sold out.{" "}
          <a href={OFFICIAL_TICKET_URL} target="_blank" rel="noopener" className="font-semibold text-ink underline underline-offset-2">Check it first</a>
          <span className="hidden sm:inline"> &nbsp;Alcazaba closed since the Aug 2026 earthquakes; palaces and gardens open.</span>
        </p>

        {/* Bottom bar over the photo */}
        <div className="mt-auto flex items-end justify-between gap-4 pb-6 pt-16">
          <p className="inline-flex items-center gap-3 rounded-full bg-black/35 px-4 py-2.5 text-[0.88rem] font-medium text-white ring-1 ring-white/25 backdrop-blur-md">
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden />Alhambra, Granada</span>
            <span aria-hidden className="h-4 w-px bg-white/40" />
            <span className="inline-flex items-center gap-1.5"><Sun className="size-4 text-gold" aria-hidden />37°10′N 3°35′W</span>
          </p>
          <a href="#tickets" className="hidden items-center gap-3 text-[0.95rem] font-semibold text-white no-underline sm:inline-flex">
            Explore more
            <span className="flex size-11 items-center justify-center rounded-full ring-1 ring-white/80 transition-colors hover:bg-white/15">
              <ArrowDown className="size-5" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

const selectCls =
  "w-full cursor-pointer appearance-none truncate bg-transparent pr-7 text-[0.98rem] font-medium text-ink outline-none";

function Field({ label, icon: Icon, id, first, children }: { label: string; icon: typeof Sun; id: string; first?: boolean; children: React.ReactNode }) {
  return (
    <div className={`relative border-b border-line px-6 py-3.5 transition-colors hover:bg-[#faf7f3] md:border-b-0 md:border-r ${first ? "md:pl-8" : ""}`}>
      <label htmlFor={id} className="block text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-muted">
        {label}
      </label>
      <div className="mt-1 flex items-center gap-2.5">
        <Icon className="size-[18px] shrink-0 text-ink" aria-hidden />
        {children}
      </div>
      <ChevronDown aria-hidden className="pointer-events-none absolute bottom-4 right-5 size-4 text-muted" />
    </div>
  );
}
