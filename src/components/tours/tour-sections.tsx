import { Check, Moon, Sun, X } from "lucide-react";
import { CHECKLIST, TOUR_DAY, TOUR_TYPES, WORTH_IT } from "@/content/tours";
import { PHOTOS } from "@/content/photos";
import { gygUrl } from "@/lib/gyg";

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
            <a href="/tickets/" className="mt-6 inline-block font-semibold text-ink underline underline-offset-2">Compare official tickets instead</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Tour styles compared */
export function TourTypes() {
  return (
    <section id="compare-tours" aria-labelledby="types-title" className="scroll-mt-24 bg-soft py-14 sm:py-16">
      <div className="wrap">
        <h2 id="types-title" className="section-title">Alhambra tour types compared</h2>
        <p className="mt-2 max-w-[62ch] text-muted">Typical starting prices per person. You&rsquo;ll see the exact price for your date before you pay.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TOUR_TYPES.map((t) => (
            <article key={t.id} className="flex flex-col rounded-2xl border border-line bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[1.1rem] font-bold leading-snug">{t.name}</h3>
                <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.78rem] font-semibold ${t.nasrid === "no" ? "bg-[#fde8e7] text-[#a3261c]" : "bg-[#eef1f8] text-brand"}`}>
                  {t.nasrid === "night" ? <Moon className="size-3.5" aria-hidden /> : t.nasrid === "day" ? <Sun className="size-3.5" aria-hidden /> : null}
                  {t.nasrid === "no" ? "No palaces" : t.nasrid === "night" ? "Palaces at night" : "Palaces by day"}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-[0.92rem]">
                <div><dt className="text-muted">Length</dt><dd className="font-semibold">{t.duration}</dd></div>
                <div><dt className="text-muted">Group</dt><dd className="font-semibold">{t.group}</dd></div>
              </dl>
              <p className="mt-4 text-[0.93rem]"><span className="font-semibold">Best for:</span> <span className="text-muted">{t.bestFor}</span></p>
              <p className="mt-1 text-[0.93rem]"><span className="font-semibold">Watch out:</span> <span className="text-muted">{t.watchOut}</span></p>
              <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                <p className="leading-tight">
                  <span className="block text-sm text-muted">From</span>
                  <span className="text-2xl font-extrabold">€{t.priceFrom}</span>
                  {t.priceNote && <span className="block text-[0.78rem] text-muted">{t.priceNote}</span>}
                </p>
                <a
                  href={gygUrl(t.query, { page: "tours", position: `type_${t.id}` })}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="btn btn-primary min-h-11 px-4"
                  data-track="affiliate_click"
                >
                  View dates
                </a>
              </div>
            </article>
          ))}
        </div>
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
        <img src={p.src} srcSet={p.srcSet} sizes="(min-width:1024px) 480px, 100vw" alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
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
