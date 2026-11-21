import { Check, Minus } from "lucide-react";
import { OFFICIAL_TICKETS, OFFICIAL_TICKET_URL } from "@/content/facts";
import { COVERAGE, FEATURED } from "@/content/tickets";
import { gygUrl } from "@/lib/gyg";
import { euro } from "@/lib/format";

// Pricing-card layout (MotionSites "Smart Pricing"), restyled white: three
// tickets that cover a full daytime visit, the most popular one highlighted.

const BADGE: Record<string, string> = {
  general: "Best for most visitors",
  "alhambra-experiences": "Often available when General is sold out",
  "dobla-de-oro": "Daytime backup",
};

export function FeaturedTickets() {
  const tickets = FEATURED.map((slug) => OFFICIAL_TICKETS.find((t) => t.slug === slug)!);
  return (
    <section aria-labelledby="featured-title" className="py-14 sm:py-16">
      <div className="wrap">
        <h2 id="featured-title" className="section-title">The 3 tickets that show you the whole Alhambra</h2>
        <p className="mt-2 max-w-[62ch] text-muted">Each includes the Nasrid Palaces, the Generalife and the gardens. Start with the first; move right if your date is sold out.</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {tickets.map((t) => {
            const c = COVERAGE[t.slug];
            const hot = t.slug === "general";
            const rows = [
              { ok: !!c.nasrid, text: c.nasrid === "night" ? "Nasrid Palaces at night" : "Nasrid Palaces by day" },
              { ok: !!c.generalife, text: "Generalife and gardens" },
              { ok: c.alcazaba, text: "Alcazaba (closed for now)" },
              ...(c.albaicin ? [{ ok: true, text: "Albaicín monuments (closed for now)" }] : []),
              ...(c.extra ? [{ ok: true, text: c.extra }] : []),
            ];
            return (
              <article
                key={t.slug}
                className={`flex flex-col rounded-2xl p-7 ${hot ? "bg-brand text-white shadow-[0_20px_50px_rgba(29,43,92,0.28)]" : "border border-line bg-white"}`}
              >
                <p className={`text-sm font-semibold ${hot ? "text-[#b9c6ff]" : "text-brand"}`}>{BADGE[t.slug]}</p>
                <h3 className="mt-2 text-xl font-bold">{t.name}</h3>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-[2.6rem] font-extrabold leading-none tracking-tight">{euro(t.price)}</span>
                  <span className={hot ? "text-white/70" : "text-muted"}>per adult</span>
                </p>
                <p className={`mt-1 text-sm ${hot ? "text-white/70" : "text-muted"}`}>Under-12s free · Sells out: {t.sellsOut.toLowerCase()}</p>

                <div className={`my-6 flex items-center gap-3 text-[0.8rem] ${hot ? "text-white/60" : "text-muted"}`}>
                  <span className={`h-px flex-1 ${hot ? "bg-white/20" : "bg-line"}`} />
                  What&rsquo;s included
                  <span className={`h-px flex-1 ${hot ? "bg-white/20" : "bg-line"}`} />
                </div>

                <ul className="space-y-2.5 text-[0.97rem]">
                  {rows.map((r) => (
                    <li key={r.text} className={`flex gap-2.5 ${r.ok ? "" : hot ? "text-white/45" : "text-[#a3a9b3]"}`}>
                      {r.ok ? <Check className={`mt-0.5 size-5 shrink-0 ${hot ? "text-[#9fb2ff]" : "text-brand"}`} aria-hidden /> : <Minus className="mt-0.5 size-5 shrink-0" aria-hidden />}
                      {r.text}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto grid gap-2.5 pt-8">
                  <a
                    href={OFFICIAL_TICKET_URL}
                    target="_blank"
                    rel="noopener"
                    className={`btn h-12 ${hot ? "btn-white" : "btn-primary"}`}
                  >
                    Book on the official site
                  </a>
                  <a
                    href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "tickets", position: `featured_${t.slug}` })}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className={`text-center text-sm font-semibold underline underline-offset-2 ${hot ? "text-white/85" : "text-ink"}`}
                    data-track="affiliate_click"
                  >
                    Sold out? See tours with this included
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
