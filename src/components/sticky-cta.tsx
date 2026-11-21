"use client";

import { useEffect, useState } from "react";
import { gygUrl } from "@/lib/gyg";

// Mobile-only booking bar. Appears only after the hero booking card has
// scrolled out of view, so there is never more than one booking button on screen.
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const target = document.querySelector("form[role=search]");
    if (!target) return;
    const io = new IntersectionObserver(
      ([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white p-3 shadow-[0_-8px_24px_rgba(20,24,31,0.08)] transition-transform duration-300 lg:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        <p className="text-sm leading-tight">
          <span className="block text-muted">Tours with tickets</span>
          <span className="font-extrabold">Nasrid Palaces included</span>
        </p>
        <a
          href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "home", position: "sticky_mobile" })}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="btn btn-primary ml-auto flex-1"
          tabIndex={show ? 0 : -1}
          data-track="affiliate_click"
        >
          Check availability
        </a>
      </div>
    </div>
  );
}
