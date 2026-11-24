import { HOW_TO_BOOK, SOLD_OUT_STEPS } from "@/content/tickets";
import Link from "next/link";
import { PHOTOS } from "@/content/photos";
import { gygUrl } from "@/lib/gyg";

/* What to do when sold out — a real order of things to try, so it is numbered. */
export function SoldOutPlan() {
  return (
    <section id="sold-out" aria-labelledby="soldout-title" className="scroll-mt-24 py-14 sm:py-16">
      <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 id="soldout-title" className="section-title">Alhambra tickets sold out? Try these in order</h2>
          <p className="mt-3 max-w-[46ch] text-muted">
            &ldquo;Sold out&rdquo; on the official site usually means the General ticket is gone, not that the Alhambra is full.
          </p>
          <a
            href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "tickets", position: "soldout_cta" })}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn btn-primary mt-7 h-12"
            data-track="affiliate_click"
          >
            See tours with tickets included
          </a>
          <p className="mt-4 text-[0.95rem]">
            <Link href="/tickets/sold-out/" className="font-semibold text-ink underline underline-offset-2">Read the full sold-out guide</Link>, ranked by how soon you&rsquo;re going.
          </p>
        </div>
        <ol className="grid gap-4">
          {SOLD_OUT_STEPS.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.25rem_1fr] gap-4 rounded-2xl border border-line p-5">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#eef1f8] font-bold text-brand">{i + 1}</span>
              <div>
                <h3 className="text-[1.05rem] font-bold">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* How to book an entry ticket — also a real sequence. */
export function HowToBook() {
  const p = PHOTOS.myrtles;
  return (
    <section aria-labelledby="howto-title" className="bg-soft py-14 sm:py-16">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 id="howto-title" className="section-title">How to book Alhambra tickets</h2>
          <ol className="mt-7 space-y-5">
            {HOW_TO_BOOK.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.25rem_1fr] gap-4">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
                <div>
                  <h3 className="text-[1.02rem] font-bold">{s.title}</h3>
                  <p className="mt-0.5 text-[0.95rem] text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={gygUrl("Alhambra entry ticket", { page: "tickets", position: "howto" })}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn btn-primary mt-8 h-12"
            data-track="affiliate_click"
          >
            See Alhambra entry tickets
          </a>
        </div>
        <img src={p.src} width={p.width} height={p.height} srcSet={p.srcSet} sizes="(min-width:1024px) 520px, 100vw" alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
      </div>
    </section>
  );
}
