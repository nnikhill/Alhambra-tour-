import Link from "next/link";
import { SITE } from "@/lib/site";
import { OFFICIAL_TICKET_URL } from "@/content/facts";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-soft pb-24 md:pb-0">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-lg font-extrabold">{SITE.name}</p>
          <p className="mt-3 max-w-[46ch] text-[0.95rem] text-muted">
            An independent guide to visiting the Alhambra. We are not the official Alhambra website. Official tickets are sold at{" "}
            <a href={OFFICIAL_TICKET_URL} className="underline underline-offset-2" target="_blank" rel="noopener">tickets.alhambra-patronato.es</a>.
          </p>
        </div>
        <ul className="grid content-start gap-2 text-[0.95rem]">
          <li><Link href="/tickets/" className="text-muted no-underline hover:text-ink">Alhambra tickets</Link></li>
          <li><Link href="/tours/" className="text-muted no-underline hover:text-ink">Guided tours</Link></li>
          <li><Link href="/tickets/sold-out/" className="text-muted no-underline hover:text-ink">Tickets sold out?</Link></li>
          <li><Link href="/tickets/night-visit/" className="text-muted no-underline hover:text-ink">Night visits</Link></li>
          <li><Link href="/day-trips/" className="text-muted no-underline hover:text-ink">Day trips</Link></li>
          <li><Link href="/plan/" className="text-muted no-underline hover:text-ink">Plan your visit</Link></li>
          <li><Link href="/blog/" className="text-muted no-underline hover:text-ink">Blog</Link></li>
        </ul>
        <ul className="grid content-start gap-2 text-[0.95rem]">
          <li><Link href="/about/" className="text-muted no-underline hover:text-ink">About us</Link></li>
          <li><Link href="/affiliate-disclosure/" className="text-muted no-underline hover:text-ink">Affiliate disclosure</Link></li>
          <li><Link href="/contact/" className="text-muted no-underline hover:text-ink">Contact</Link></li>
        </ul>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-5 text-[0.82rem] text-muted">
          Photos: Jebulon, Wikimedia Commons (public domain). Some links are affiliate links: if you book through them we earn a commission at no extra cost to you.
        </p>
      </div>
    </footer>
  );
}
