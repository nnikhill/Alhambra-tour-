"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/tickets/", label: "Tickets" },
  { href: "/tours/", label: "Guided tours" },
  { href: "/tickets/night-visit/", label: "Night visits" },
  { href: "/day-trips/", label: "Day trips" },
  { href: "/plan/", label: "Plan your visit" },
  { href: "/blog/", label: "Blog" },
];

// Horseshoe arch mark, drawn rather than borrowed.
function ArchMark() {
  return (
    <svg viewBox="0 0 28 32" className="h-8 w-7 shrink-0 text-amber" aria-hidden>
      <path d="M3 31V14C3 7.4 7.9 2 14 2s11 5.4 11 12v17" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path d="M8.5 31V15.5c0-3.4 2.5-6.2 5.5-6.2s5.5 2.8 5.5 6.2V31" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// Three columns: logo | centred nav | button. The outer columns are equal
// (1fr each) so the nav sits on the true centre of the page.
export function SiteHeader() {
  const path = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const isActive = (href: string) =>
    href === "/tickets/" ? path === "/tickets/" || path.startsWith("/tickets/sold-out") : path.startsWith(href);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_8px_30px_rgba(20,24,31,0.10)] backdrop-blur-md">
        <div className="grid h-16 grid-cols-[1fr_auto] items-center gap-3 pl-4 pr-2 sm:pl-6 xl:grid-cols-[1fr_auto_1fr]">
          <Link href="/" className="flex items-center gap-2 justify-self-start whitespace-nowrap font-serif text-[1.1rem] font-bold tracking-[-0.01em] no-underline sm:gap-2.5 sm:text-[1.25rem]">
            <ArchMark />
            {SITE.name}
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1 rounded-full bg-[#f4f1ec] p-1 text-[0.93rem] font-medium">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-full px-3.5 py-2 no-underline transition-colors 2xl:px-4 ${
                      isActive(n.href) ? "bg-white font-semibold text-ink shadow-[0_1px_4px_rgba(20,24,31,0.12)]" : "text-muted hover:text-ink"
                    }`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <Link href="/tickets/" className="btn btn-ink min-h-11 shrink-0 rounded-full px-4 text-[0.92rem] sm:min-h-12 sm:px-5 sm:text-[0.95rem]">
              <span className="hidden sm:inline">See tickets</span>
              <span className="sm:hidden">Tickets</span>
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-[#f4f1ec] text-ink xl:hidden"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Main" className="hero-fade border-t border-line px-3 pb-3 pt-2 xl:hidden">
            <ul className="grid gap-0.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-[1rem] no-underline ${isActive(n.href) ? "bg-[#f4f1ec] font-semibold text-ink" : "text-[#3d4450]"}`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
