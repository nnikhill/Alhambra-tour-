"use client";

import { useState } from "react";
import { Bus, ChevronDown, Moon, Languages, Search, ShieldCheck, Sun, Ticket, Users } from "lucide-react";
import { PHOTOS } from "@/content/photos";
import { gygUrl } from "@/lib/gyg";
import { AffiliateNote } from "@/components/affiliate-note";

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

// The hero is cropped to fill the screen height, so phones pick a wide file.
// Self-hosted WebP (largest 2560 px) generated from custom high-res photography.
const HERO = {
  ...PHOTOS.hero,
  src: "/images/photos/hero-1920.webp",
  alt: "The Alhambra fortress and palace complex on Sabika Hill in Granada, Spain, bathed in warm golden evening light",
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

  // Fit-to-screen: spacing and type scale with viewport height (svh) so the
  // whole hero, search bar included, shows without scrolling on common
  // laptops (>= ~730px tall) and phones (>= ~700px). Decorative extras drop
  // out first on short screens.
  const gap = "mt-[clamp(0.75rem,2.2svh,1.4rem)]";

  return (
    <section className="relative isolate -mt-[4.75rem] flex min-h-[100svh] flex-col overflow-hidden bg-[#f3e6d8] pt-[clamp(5.4rem,13svh,7.5rem)]">
      {/* Photo + washes */}
      <img
        src={HERO.src}
        srcSet={HERO.srcSet}
        sizes="(min-aspect-ratio: 28/10) 100vw, 280vh"
        alt={HERO.alt}
        fetchPriority="high"
        className="hero-reveal-soft absolute inset-0 -z-20 size-full object-cover object-center lg:object-[center_60%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,250,244,0.94)_0%,rgba(255,248,240,0.86)_48%,rgba(255,246,236,0.35)_72%,rgba(20,14,8,0.25)_100%)] lg:bg-[linear-gradient(180deg,rgba(255,250,244,0.55)_0%,rgba(255,248,240,0.2)_45%,rgba(20,14,8,0)_75%,rgba(20,14,8,0.45)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,rgba(255,250,244,0.92)_0%,rgba(255,248,240,0.7)_38%,rgba(255,248,240,0)_62%)] lg:block" />

      <div className="wrap flex flex-1 flex-col pb-[clamp(0.75rem,2svh,1.5rem)]">
        <h1 className="hero-rise max-w-[15ch] text-balance font-serif text-[clamp(2rem,min(6vw,7.4svh),4.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-ink lg:max-w-[17ch]">
          Alhambra tickets that include the <em className="font-serif font-bold italic text-amber">Nasrid&nbsp;Palaces</em>
        </h1>

        <p className={`hero-rise ${gap} max-w-[34rem] text-[1rem] leading-relaxed text-[#3d4450] sm:text-[1.12rem]`}>
          Tickets sell out weeks ahead and the palaces let you in at one fixed time.<span className="max-sm:[@media(max-height:740px)]:hidden"> Here&rsquo;s the ticket to get, and the tours that still have places.</span>
        </p>

        {/* Trust line: plain text on the light wash, only on tall desktop screens */}
        <ul className="hero-rise mt-[clamp(0.75rem,2svh,1.25rem)] hidden flex-wrap items-center gap-y-2 text-[0.95rem] font-medium text-ink lg:[@media(min-height:820px)]:flex">
          {[
            { icon: ShieldCheck, label: "Nasrid Palaces included" },
            { icon: Languages, label: "Pick your date and language" },
            { icon: Ticket, label: "Official prices shown" },
          ].map(({ icon: Icon, label }, i) => (
            <li key={label} className={`flex items-center gap-2 pr-5 ${i > 0 ? "border-l border-[#d9c7b3] pl-5" : ""}`}>
              <Icon className="size-[18px] text-amber" aria-hidden /> {label}
            </li>
          ))}
        </ul>

        {/* Visit type: a toggle group, not ARIA tabs (there are no tab panels) */}
        <div role="group" aria-label="Visit type" className="hero-card mt-[clamp(1.25rem,4.5svh,2.75rem)] flex gap-1 self-stretch rounded-full bg-white/75 p-1 shadow-[0_8px_24px_rgba(40,24,8,0.10)] backdrop-blur-md sm:self-start">
          {WHAT.map(({ id, group, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={tab === id}
              onClick={() => { setTab(id); setOpt(0); }}
              className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[0.88rem] font-semibold transition-colors sm:flex-none sm:gap-2 sm:px-4 sm:text-[0.93rem] ${
                tab === id ? "bg-ink text-white" : "text-[#3d4450] hover:text-ink"
              }`}
            >
              <Icon className="size-[17px]" aria-hidden /> {group}
            </button>
          ))}
        </div>

        {/* Search bar: phones get What on its own row, Who + Language side by side */}
        <form
          role="search"
          aria-label="Find Alhambra tickets and tours"
          className="hero-card mt-2 grid max-w-[66rem] grid-cols-2 overflow-hidden rounded-[1.5rem] bg-white shadow-[0_20px_50px_rgba(40,24,8,0.18)] md:grid-cols-[1.55fr_1fr_1.05fr_auto] md:rounded-full"
          onSubmit={(e) => {
            e.preventDefault();
            // Popup blocked? Fall back to opening GetYourGuide in this tab.
            if (!window.open(href, "_blank", "noopener")) window.location.href = href;
          }}
        >
          <Field label="What" icon={Ticket} id="f-what" className="col-span-2 md:col-span-1 md:pl-8">
            <select id="f-what" value={opt} onChange={(e) => setOpt(Number(e.target.value))} className={selectCls}>
              {current.options.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
            </select>
          </Field>
          <Field label="Who" icon={Users} id="f-who" className="border-r">
            <select id="f-who" value={group} onChange={(e) => setGroup(e.target.value)} className={selectCls}>
              {GROUPS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Language" icon={Languages} id="f-lang">
            <select id="f-lang" aria-label="Guide language" value={lang} onChange={(e) => setLang(e.target.value)} className={selectCls}>
              {LANGS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
          <div className="col-span-2 p-2 md:col-span-1 md:p-2.5">
            <a
              href={href}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="btn btn-primary h-full min-h-12 w-full rounded-full px-7 text-[1rem] md:min-h-14 md:w-auto"
              data-track="affiliate_click"
            >
              <Search className="size-[18px]" aria-hidden /> Show available tours
            </a>
          </div>
        </form>
        {/* Disclosure sits right under the booking links it describes */}
        <AffiliateNote className="hero-card mt-3 max-w-[40rem] self-start rounded-xl bg-white/85 px-3 py-1.5 text-[0.8rem] text-[#2b313b] backdrop-blur-sm sm:text-[0.84rem]" />

      </div>
    </section>
  );
}

const selectCls =
  "w-full cursor-pointer appearance-none truncate bg-transparent pr-7 text-[0.98rem] font-medium text-ink outline-none";

function Field({ label, icon: Icon, id, className = "", children }: { label: string; icon: typeof Sun; id: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative min-w-0 border-b border-line px-4 py-2.5 transition-colors hover:bg-[#faf7f3] sm:px-6 md:border-b-0 md:border-r md:py-3.5 ${className}`}>
      <label htmlFor={id} className="block text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-muted">
        {label}
      </label>
      <div className="mt-1 flex items-center gap-2.5">
        <Icon className="size-[18px] shrink-0 text-ink" aria-hidden />
        {children}
      </div>
      <ChevronDown aria-hidden className="pointer-events-none absolute bottom-3.5 right-4 size-4 text-muted md:bottom-4 md:right-5" />
    </div>
  );
}
