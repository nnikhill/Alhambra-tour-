import Link from "next/link";
import { ArrowRight, Ban, Check, Moon, Sun, X } from "lucide-react";
import { CHECKLIST, TOUR_DAY, WORTH_IT } from "@/content/tours";
import { PHOTOS } from "@/content/photos";
import { gygUrl } from "@/lib/gyg";

const TOUR_CARDS = [
  {
    id: "group",
    name: "Group tour with Nasrid Palaces",
    image: "/images/photos/lions-960.webp",
    alt: "Court of the Lions central fountain in the Alhambra",
    nasrid: "day" as const,
    duration: "About 3 hours",
    group: "Larger groups",
    points: [
      "First visits on a budget",
      "Watch out: Groups can be big",
    ],
    query: "Alhambra guided tour Nasrid Palaces",
  },
  {
    id: "small",
    name: "Small-group tour",
    image: "/images/photos/tour-small-group-800.webp",
    alt: "Intricate Moorish arches and carved columns inside the Nasrid Palaces",
    nasrid: "day" as const,
    duration: "About 3 hours",
    group: "Usually 15 or fewer",
    points: [
      "Best for: Couples and anyone who wants to ask questions",
      "Watch out: Sells out sooner",
    ],
    query: "Alhambra small group tour",
  },
  {
    id: "private",
    name: "Private tour",
    image: "/images/photos/hero-960.webp",
    alt: "The Alhambra fortress and palaces overlooking the valley",
    nasrid: "day" as const,
    duration: "3–4 hours",
    group: "Just your party",
    points: [
      "Best for: Families, slow walkers, groups of 4+",
      "Watch out: Check whether tickets are included in the price",
    ],
    query: "Alhambra private tour",
  },
  {
    id: "night",
    name: "Night tour of the Nasrid Palaces",
    image: "/images/photos/night-lions-800.webp",
    alt: "Court of the Lions arches lit with soft lighting at night",
    nasrid: "night" as const,
    duration: "1.5–2 hours",
    group: "Small to mid-size groups",
    points: [
      "Best for: Couples, photographers",
      "Watch out: Palaces only; runs on set evenings",
    ],
    query: "Alhambra night tour Nasrid Palaces",
  },
  {
    id: "no-nasrid",
    name: "Gardens & Generalife tour",
    image: "/images/photos/tour-generalife-800.webp",
    alt: "Patio de la Acequia in the Generalife gardens with fountains",
    nasrid: "no" as const,
    duration: "About 2 hours",
    group: "Mid-size groups",
    points: [
      "Best for: Last-minute dates when palace tours are full",
      "Watch out: No Nasrid Palaces",
    ],
    query: "Alhambra Generalife guided tour",
  },
  {
    id: "daytrip",
    name: "Day trip from Seville or Málaga",
    image: "/images/photos/tour-daytrip-800.webp",
    alt: "Panoramic view of the Alhambra on the hill with mountains",
    nasrid: "day" as const,
    duration: "11–13 hours",
    group: "Coach groups",
    points: [
      "Best for: Visitors not staying in Granada",
      "Watch out: A long day with limited free time",
    ],
    query: "Alhambra day trip from Seville",
  },
];

/* Is it worth it? Honest both sides (the pratfall effect builds trust). */
export function WorthIt() {
  return (
    <section aria-labelledby="worth-title" className="py-14 sm:py-16">
      <div className="wrap">
        <h2 id="worth-title" className="section-title">Is an Alhambra guided tour worth it?</h2>
        <p className="mt-2 max-w-[62ch] text-muted">For most first-time visitors, yes. Here&rsquo;s the honest case both ways.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl bg-brand p-7 text-white">
            <h3 className="text-lg font-bold">Why a tour is worth it</h3>
            <ul className="mt-4 space-y-3">
              {WORTH_IT.yes.map((y) => (
                <li key={y} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-[#9fb2ff]" aria-hidden />{y}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line p-7">
            <h3 className="text-lg font-bold">When to skip it</h3>
            <ul className="mt-4 space-y-3 text-muted">
              {WORTH_IT.no.map((n) => (
                <li key={n} className="flex gap-3"><X className="mt-0.5 size-5 shrink-0 text-[#9aa1ad]" aria-hidden />{n}</li>
              ))}
            </ul>
            <Link href="/tickets/" className="mt-6 inline-block font-semibold text-ink underline underline-offset-2">Compare official tickets instead</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Tour styles compared - redesigned to match mockup with custom imagery */
export function TourTypes() {
  return (
    <section id="compare-tours" aria-labelledby="types-title" className="scroll-mt-24 bg-[#faf7f2] border-t border-line/40 py-14 sm:py-20">
      <div className="wrap">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b87428]">
            &mdash; OUR TOURS &mdash;
          </p>
          <h2 id="types-title" className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Alhambra tour types compared
          </h2>
          <p className="mx-auto mt-2.5 max-w-[56ch] text-sm text-muted sm:text-base">
            Pick a style, then see live prices and times for your date on GetYourGuide.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOUR_CARDS.map((t) => (
            <article
              key={t.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-line/70 bg-white p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:shadow-md sm:rounded-3xl"
            >
              {/* Top: Image on left + Details on right */}
              <div className="flex gap-3.5 sm:gap-4">
                {/* Left portrait thumbnail photo */}
                <div className="relative aspect-[3/4] w-[105px] sm:w-[120px] shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-soft">
                  <img
                    src={t.image}
                    alt={t.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Right content column */}
                <div className="flex flex-1 flex-col min-w-0">
                  <h3 className="font-bold text-ink text-[1.05rem] sm:text-[1.12rem] leading-snug">
                    {t.name}
                  </h3>

                  {/* Feature Tag */}
                  <div className="mt-1.5">
                    {t.nasrid === "day" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#eef4ff] px-2.5 py-0.5 text-[0.72rem] font-semibold text-[#2563eb]">
                        <Sun className="size-3" />
                        <span>Palaces by day</span>
                      </span>
                    )}
                    {t.nasrid === "night" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#eff2ff] px-2.5 py-0.5 text-[0.72rem] font-semibold text-[#4338ca]">
                        <Moon className="size-3" />
                        <span>Palaces at night</span>
                      </span>
                    )}
                    {t.nasrid === "no" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#fef2f2] px-2.5 py-0.5 text-[0.72rem] font-semibold text-[#dc2626]">
                        <Ban className="size-3" />
                        <span>No palaces</span>
                      </span>
                    )}
                  </div>

                  {/* Length & Group Specs */}
                  <div className="mt-2.5 grid grid-cols-2 gap-2 text-[0.75rem] leading-tight">
                    <div>
                      <span className="block text-muted">Length</span>
                      <span className="font-semibold text-ink">{t.duration}</span>
                    </div>
                    <div>
                      <span className="block text-muted">Group</span>
                      <span className="font-semibold text-ink">{t.group}</span>
                    </div>
                  </div>

                  {/* Bullet points with checkmarks */}
                  <ul className="mt-3 space-y-1.5 text-[0.75rem] text-[#2b313b]">
                    {t.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[#1e3425]" aria-hidden />
                        <span className="leading-tight">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom bar with GetYourGuide link and CTA button */}
              <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3.5">
                <span className="text-[0.78rem] text-muted max-w-[14ch] leading-tight underline decoration-muted/40 underline-offset-2">
                  Live prices on GetYourGuide
                </span>
                <a
                  href={gygUrl(t.query, { page: "tours", position: `type_${t.id}` })}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="inline-flex items-center gap-1 rounded-xl bg-[#1e3425] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#15261b]"
                  data-track="affiliate_click"
                >
                  <span>View details</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.95rem] text-muted">
          Not staying in Granada? <Link href="/day-trips/" className="font-semibold text-ink underline underline-offset-2">Compare day trips from Seville and Málaga</Link>.{" "}
          Not sure you need a guide? <Link href="/blog/alhambra-guided-tour-vs-self-guided/" className="font-semibold text-ink underline underline-offset-2">Guided vs self-guided</Link>.
        </p>
      </div>
    </section>
  );
}

/* What to check before booking */
export function Checklist() {
  return (
    <section aria-labelledby="check-title" className="py-14 sm:py-16">
      <div className="wrap">
        <h2 id="check-title" className="section-title">6 things to check before you book a tour</h2>
        <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKLIST.map((c) => (
            <div key={c.title} className="flex gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#eef1f8]">
                <Check className="size-4 text-brand" aria-hidden />
              </span>
              <div>
                <h3 className="font-bold">{c.title}</h3>
                <p className="mt-0.5 text-[0.95rem] text-muted">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* What a tour looks like — a real sequence, so it is numbered */
export function TourDay() {
  const p = PHOTOS.lions;
  return (
    <section aria-labelledby="day-title" className="bg-soft py-14 sm:py-16">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <img src={p.src} width={p.width} height={p.height} srcSet={p.srcSet} sizes="(min-width:1024px) 480px, 100vw" alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
        <div>
          <h2 id="day-title" className="section-title">What a typical 3-hour tour covers</h2>
          <ol className="mt-7 space-y-5">
            {TOUR_DAY.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.25rem_1fr] gap-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-0.5 text-[0.95rem] text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "tours", position: "tour_day" })}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn btn-primary mt-8 h-12"
            data-track="affiliate_click"
          >
            Find a tour for your date
          </a>
        </div>
      </div>
    </section>
  );
}
