import Link from "next/link";
import { Check } from "lucide-react";
import { DAY_VS_NIGHT, NIGHT_OPTIONS, NIGHT_PLAN, NIGHT_QUERY } from "@/content/night";
import { PHOTOS } from "@/content/photos";
import { gygUrl } from "@/lib/gyg";

/* Day vs night, side by side */
export function DayVsNight() {
  return (
    <section aria-labelledby="dvn-title" className="py-14 sm:py-16">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <h2 id="dvn-title" className="section-title">Night visit or day visit?</h2>
          <p className="mt-3 max-w-[46ch] text-muted">
            The night visit is the Nasrid Palaces only, with soft lighting and far fewer people. It&rsquo;s the best second visit
            there is. If you only have one visit, go by day so you also get the gardens.
          </p>
          <Link href="/tickets/" className="mt-5 inline-block font-semibold text-ink underline underline-offset-2">Compare all ticket types</Link>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[30rem] text-left text-[0.95rem]">
            <thead className="bg-[#f6f8fc]">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold text-muted"><span className="sr-only">Feature</span></th>
                <th scope="col" className="px-5 py-3.5 font-bold">By day</th>
                <th scope="col" className="bg-brand px-5 py-3.5 font-bold text-white">At night</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {DAY_VS_NIGHT.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="px-5 py-3.5 font-semibold">{r.label}</th>
                  <td className="px-5 py-3.5 text-muted">{r.day}</td>
                  <td className="bg-[#eef1f8] px-5 py-3.5 font-semibold text-ink">{r.night}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* Three ways in after dark */
export function NightOptions() {
  return (
    <section id="night-options" aria-labelledby="opts-title" className="scroll-mt-24 bg-soft py-14 sm:py-16">
      <div className="wrap">
        <h2 id="opts-title" className="section-title">3 ways to see the Alhambra at night</h2>
        <p className="mt-2 max-w-[62ch] text-muted">Official prices per adult. Tours and resale tickets show the live price for your date before you pay.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {NIGHT_OPTIONS.map((o) => (
            <article
              key={o.id}
              className={`flex flex-col rounded-2xl p-6 ${o.featured ? "bg-brand text-white shadow-[0_14px_34px_rgba(29,43,92,0.25)]" : "border border-line bg-white"}`}
            >
              {o.featured && (
                <span className="mb-3 self-start rounded-full bg-gold px-3 py-0.5 text-[0.78rem] font-bold text-ink">Easiest to get</span>
              )}
              <h3 className="text-[1.2rem] font-bold">{o.title}</h3>
              <p className={`mt-1 text-[1.7rem] font-extrabold ${o.featured ? "" : "text-ink"}`}>{o.price}</p>
              <p className={`mt-3 text-[0.95rem] ${o.featured ? "text-white/80" : "text-muted"}`}>{o.text}</p>
              <ul className="mt-4 space-y-2 text-[0.93rem]">
                {o.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5">
                    <Check className={`mt-0.5 size-4 shrink-0 ${o.featured ? "text-[#9fb2ff]" : "text-brand"}`} aria-hidden />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                {o.cta.kind === "gyg" ? (
                  <a
                    href={gygUrl(NIGHT_QUERY, { page: "night", position: `option_${o.id}` })}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn btn-white h-12 w-full"
                    data-track="affiliate_click"
                  >
                    {o.cta.label}
                  </a>
                ) : (
                  <a
                    href={gygUrl("Alhambra night entry ticket", { page: "night", position: `ticket_${o.id}` })}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn btn-outline h-12 w-full"
                    data-track="affiliate_click"
                  >
                    {o.cta.label}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* How a night visit goes — a real sequence, so numbered */
export function NightPlan() {
  const p = PHOTOS.abencerrages;
  return (
    <section aria-labelledby="plan-title" className="py-14 sm:py-16">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 id="plan-title" className="section-title">How to plan your night at the Alhambra</h2>
          <ol className="mt-7 space-y-5">
            {NIGHT_PLAN.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.25rem_1fr] gap-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-0.5 text-[0.95rem] text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <img
          src={p.src} width={p.width} height={p.height}
          srcSet={p.srcSet}
          sizes="(min-width:1024px) 440px, 100vw"
          alt={p.alt}
          loading="lazy"
          className="aspect-[4/5] w-full rounded-2xl object-cover lg:order-first"
        />
      </div>
    </section>
  );
}
