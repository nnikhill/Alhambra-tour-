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
function ArchMark({ className = "text-amber" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 32" className={`h-8 w-7 shrink-0 transition-colors ${className}`} aria-hidden>
      <path d="M3 31V14C3 7.4 7.9 2 14 2s11 5.4 11 12v17" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path d="M8.5 31V15.5c0-3.4 2.5-6.2 5.5-6.2s5.5 2.8 5.5 6.2V31" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// Three columns: logo | centred nav | button. The outer columns are equal
// (1fr each) so the nav sits on the true centre of the page.
export function SiteHeader() {
  const path = usePathname() ?? "/";
  const isHome = path === "/";

  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isActive = (href: string) =>
    href === "/tickets/" ? path === "/tickets/" || path.startsWith("/tickets/sold-out") : path.startsWith(href);

  const isDark = isHome && !scrolled;

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto max-w-[1280px] rounded-[2rem] border transition-all duration-300 backdrop-blur-md ${
          isDark
            ? "border-white/20 bg-black/30 shadow-none text-white"
            : "border-white/70 bg-white/90 shadow-[0_8px_30px_rgba(20,24,31,0.10)] text-ink"
        }`}
      >
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 pl-3 pr-2 sm:gap-3 sm:pl-6 xl:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 justify-self-start whitespace-nowrap font-serif text-[0.98rem] font-bold tracking-[-0.01em] no-underline transition-colors sm:gap-2.5 sm:text-[1.25rem]"
          >
            <ArchMark className={isDark ? "text-[#e5b364]" : "text-amber"} />
            <span className="truncate">{SITE.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul
              className={`flex items-center gap-1 rounded-full p-1 text-[0.93rem] font-medium transition-colors ${
                isDark ? "bg-white/10 backdrop-blur-sm" : "bg-[#f4f1ec]"
              }`}
            >
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-full px-3.5 py-2 no-underline transition-colors 2xl:px-4 ${
                      isActive(n.href)
                        ? isDark
                          ? "bg-white/25 font-semibold text-white shadow-sm"
                          : "bg-white font-semibold text-ink shadow-[0_1px_4px_rgba(20,24,31,0.12)]"
                        : isDark
                        ? "text-white/80 hover:text-white"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <Link
              href="/tickets/"
              className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[0.92rem] font-semibold transition-colors sm:min-h-12 sm:px-5 sm:text-[0.95rem] ${
                isDark
                  ? "border border-white/35 bg-white/15 text-white hover:bg-white/25 shadow-sm"
                  : "btn btn-ink"
              }`}
            >
              <span className="hidden sm:inline">See tickets</span>
              <span className="sm:hidden">Tickets</span>
              <ArrowRight className="hidden size-4 sm:block" aria-hidden />
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpenOn((o) => (o === path ? null : path))}
              className={`flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors xl:hidden ${
                isDark ? "bg-white/15 text-white" : "bg-[#f4f1ec] text-ink"
              }`}
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className={`hero-fade border-t px-3 pb-3 pt-2 xl:hidden ${
              isDark ? "border-white/15 text-white" : "border-line text-ink"
            }`}
          >
            <ul className="grid gap-0.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-[1rem] no-underline transition-colors ${
                      isActive(n.href)
                        ? isDark
                          ? "bg-white/20 font-semibold text-white"
                          : "bg-[#f4f1ec] font-semibold text-ink"
                        : isDark
                        ? "text-white/80 hover:text-white"
                        : "text-[#3d4450]"
                    }`}
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