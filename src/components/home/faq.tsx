import { ChevronDown } from "lucide-react";
import { HOME_FAQ } from "@/content/faq";

type Item = { q: string; a: string };

export function Faq({ items = HOME_FAQ, title = "Frequently asked questions" }: { items?: Item[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="py-16 sm:py-20">
      <div className="wrap max-w-[820px]">
        <h2 id="faq-title" className="section-title text-center">{title}</h2>
        <div className="mt-8 divide-y divide-line rounded-2xl border border-line">
          {items.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.05rem] font-semibold">
                {f.q}
                <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
