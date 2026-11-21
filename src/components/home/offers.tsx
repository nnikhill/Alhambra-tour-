import { Check, Clock } from "lucide-react";
import { OFFERS, gygUrl, type Offer } from "@/lib/gyg";
import { PHOTOS } from "@/content/photos";

function OfferCard({ o }: { o: Offer }) {
  const p = PHOTOS[o.photo];
  const href = gygUrl(o.query, { page: "home", position: `card_${o.id}` });
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_12px_32px_rgba(20,24,31,0.10)]">
      <a href={href} target="_blank" rel="sponsored nofollow noopener" className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden>
        <img src={p.src} srcSet={p.srcSet} sizes="(min-width:1024px) 300px, (min-width:640px) 50vw, 100vw" alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        {o.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[0.8rem] font-bold text-ink shadow-sm">{o.badge}</span>
        )}
      </a>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <Clock className="size-4" aria-hidden /> {o.duration}
        </p>
        <h3 className="mt-2 text-[1.12rem] font-bold leading-snug">
          <a href={href} target="_blank" rel="sponsored nofollow noopener" className="no-underline hover:underline">{o.title}</a>
        </h3>
        <ul className="mt-3 space-y-1.5 text-[0.95rem] text-muted">
          {o.includes.map((i) => (
            <li key={i} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />{i}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="leading-tight">
            <span className="block text-sm text-muted">From</span>
            <span className="block text-2xl font-extrabold">€{o.priceFrom}</span>
            <span className="block text-sm text-muted">per person</span>
          </p>
          <a href={href} target="_blank" rel="sponsored nofollow noopener" className="btn btn-primary min-h-11 px-4" data-track="affiliate_click">
            View dates
          </a>
        </div>
      </div>
    </article>
  );
}

export function Offers() {
  return (
    <section id="tickets" aria-labelledby="offers-title" className="scroll-mt-24 py-16 sm:py-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="offers-title" className="section-title">Alhambra tickets with a guide</h2>
            <p className="mt-2 max-w-[60ch] text-muted">Every option includes your entry ticket. Prices are typical starting prices; you&rsquo;ll see the exact price for your date before paying.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((o) => <OfferCard key={o.id} o={o} />)}
        </div>
        <p className="mt-5 text-sm text-muted">
          Booking happens on GetYourGuide. If you book through our links we earn a small commission, at no extra cost to you.
        </p>
      </div>
    </section>
  );
}
