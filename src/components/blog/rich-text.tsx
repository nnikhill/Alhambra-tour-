import Link from "next/link";
import { Fragment } from "react";

// Renders [link text](/path) and **bold** inside a plain string.
// Internal links use <Link>; anything starting with http opens in a new tab.
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          const cls = "font-semibold text-ink underline decoration-amber decoration-2 underline-offset-[3px] hover:decoration-ink";
          return href.startsWith("http") ? (
            <a key={i} href={href} target="_blank" rel="noopener" className={cls}>{label}</a>
          ) : (
            <Link key={i} href={href} className={cls}>{label}</Link>
          );
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i} className="font-semibold text-ink">{bold[1]}</strong>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
