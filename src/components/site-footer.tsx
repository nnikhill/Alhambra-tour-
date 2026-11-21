import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-soft pb-24 md:pb-0">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-lg font-extrabold">{SITE.name}</p>
          <p className="mt-3 max-w-[46ch] text-[0.95rem] text-muted">
            An independent guide to visiting the Alhambra. We are not the official Alhambra website or ticket seller. Ticket and tour links go to our partner GetYourGuide.
          </p>
        </div>
        <ul className="grid content-start gap-2 text-[0.95rem]">
          <li><Link href="/tickets/" className="text-muted no-underline hover:text-ink">Alhambra tickets</Link></li>
          <li><Link href="/tours/" className="text-muted no-underline hover:text-ink">Guided tours</Link></li>
          <li><Link href="/tickets/nasrid-palaces/" className="text-muted no-underline hover:text-ink">Nasrid Palaces tickets</Link></li>
          <li><Link href="/tickets/sold-out/" className="text-muted no-underline hover:text-ink">Tickets sold out?</Link></li>
          <li><Link href="/tickets/night-visit/" className="text-muted no-underline hover:text-ink">Night visits</Link></li>
          <li><Link href="/day-trips/" className="text-muted no-underline hover:text-ink">Day trips</Link></li>
          <li><Link href="/plan/" className="text-muted no-underline hover:text-ink">Plan your visit</Link></li>
          <li><Link href="/guide/" className="text-muted no-underline hover:text-ink">What to see</Link></li>
          <li><Link href="/plan/opening-hours/" className="text-muted no-underline hover:text-ink">Opening hours</Link></li>
          <li><Link href="/blog/" className="text-muted no-underline hover:text-ink">Blog</Link></li>
          <li><Link href="/granada/albaicin/" className="text-muted no-underline hover:text-ink">Albaicín</Link></li>
          <li><Link href="/granada/sacromonte/" className="text-muted no-underline hover:text-ink">Sacromonte</Link></li>
          <li><Link href="/granada/cathedral/" className="text-muted no-underline hover:text-ink">Granada Cathedral</Link></li>
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
