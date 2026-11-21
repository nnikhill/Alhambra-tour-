"use client";

import { useEffect } from "react";

// Vercel Web Analytics + affiliate click events, loaded from bundled JS so it
// also runs under the strict nonce CSP ('strict-dynamic' trusts scripts that
// nonced code inserts). Replaces the old inline <script> tags in the layout.
type Va = ((...args: unknown[]) => void) & { q?: unknown[] };
declare global {
  interface Window { va?: Va; vaq?: unknown[] }
}

export function Analytics({ vercel }: { vercel: boolean }) {
  useEffect(() => {
    if (vercel && !document.querySelector("script[data-vercel-insights]")) {
      window.va = window.va || ((...args: unknown[]) => { (window.vaq = window.vaq || []).push(args); });
      const s = document.createElement("script");
      s.src = "/_vercel/insights/script.js";
      s.defer = true;
      s.dataset.vercelInsights = "1";
      document.head.appendChild(s);
    }
    // One event per booking click. The GetYourGuide sub_id already records page
    // + position in partner reports; this adds the click count.
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a[data-track]") as HTMLAnchorElement | null;
      if (!a || typeof window.va !== "function") return;
      let sub = "";
      try { sub = new URL(a.href).searchParams.get("sub_id") || ""; } catch {}
      window.va("event", { name: a.getAttribute("data-track"), data: { sub_id: sub.slice(0, 120) } });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [vercel]);
  return null;
}
