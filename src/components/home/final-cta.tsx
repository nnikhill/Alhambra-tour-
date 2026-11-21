import { PHOTOS } from "@/content/photos";
import { gygUrl } from "@/lib/gyg";

export function FinalCta() {
  const p = PHOTOS.generalife;
  return (
    <section className="wrap pb-20">
      <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-[#eef1f8] p-6 sm:p-10 md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div>
          <h2 className="max-w-[20ch] text-[clamp(1.7rem,3.5vw,2.5rem)]">Don&rsquo;t leave Granada without seeing the palaces</h2>
          <p className="mt-4 max-w-[48ch] text-muted">Check tours for your date now. Most can be cancelled for free up to 24 hours before.</p>
          <a
            href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "home", position: "final" })}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn btn-primary mt-7 h-14 px-8 text-lg"
            data-track="affiliate_click"
          >
            Check availability
          </a>
        </div>
        <img src={p.src} srcSet={p.srcSet} sizes="(min-width:768px) 400px, 100vw" alt={p.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
      </div>
    </section>
  );
}
