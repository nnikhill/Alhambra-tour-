import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";
import { absoluteUrl } from "@/lib/site";

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: absoluteUrl(it.href) })),
        }}
      />
      <nav aria-label="Breadcrumb" className="text-[0.88rem] text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((it, i) => (
            <li key={it.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink">{it.label}</span>
              ) : (
                <Link href={it.href} className="no-underline hover:text-ink">{it.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
