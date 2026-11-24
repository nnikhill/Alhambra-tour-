import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/tickets/", label: "Alhambra tickets compared", text: "All 8 official tickets and which include the Nasrid Palaces." },
  { href: "/tickets/sold-out/", label: "Tickets sold out?", text: "The ways in when entry tickets are gone." },
  { href: "/tours/", label: "Guided tours", text: "Tours with the entry ticket included." },
  { href: "/plan/", label: "Plan your visit", text: "Opening hours, getting there and the rules at the gate." },
];

export default function NotFound() {
  return (
    <main id="main" className="wrap py-16 sm:py-24">
      <p className="text-sm font-semibold text-muted">404</p>
      <h1 className="mt-2 font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.1]">We couldn&rsquo;t find that page</h1>
      <p className="mt-4 max-w-[60ch] text-muted">
        It may have moved, or the link may be mistyped. These pages answer most questions about visiting the Alhambra:
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block rounded-2xl border border-line p-5 no-underline transition-colors hover:border-ink">
              <span className="font-bold text-ink">{l.label}</span>
              <span className="mt-1 block text-sm text-muted">{l.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="btn btn-primary mt-10">Back to the home page</Link>
    </main>
  );
}
