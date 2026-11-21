import Link from "next/link";
import type { PostCardData } from "@/lib/blog/types";
import { CategoryTag } from "@/components/blog/category-tag";
import { formatDate } from "@/lib/format";

// One card for the blog index grid and "Keep reading" under each post, so
// both look the same. The whole card is one link (title is the accessible name).
// `wide` gives a larger title and a shorter image for the two lead cards.
export function PostCard({ p, className = "", wide = false }: { p: PostCardData; className?: string; wide?: boolean }) {
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_14px_34px_rgba(20,24,31,0.10)] ${className}`}>
      <div className="overflow-hidden bg-soft">
        {p.image && <img
          src={p.image.src} width={p.image.width} height={p.image.height}
          srcSet={p.image.srcSet ?? undefined}
          sizes={wide ? "(min-width:1024px) 560px, (min-width:640px) 50vw, 100vw" : "(min-width:1024px) 360px, (min-width:640px) 50vw, 100vw"}
          alt=""
          loading="lazy"
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${wide ? "aspect-[16/9]" : "aspect-[3/2]"}`}
        />}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-3 text-[0.85rem] text-muted">
          <CategoryTag c={p.category} /> {p.readMins} min read
        </p>
        <h3 className={`mt-3 font-serif font-bold leading-snug text-ink ${wide ? "text-[1.5rem]" : "text-[1.3rem]"}`}>
          <Link href={`/blog/${p.slug}/`} className="text-ink no-underline after:absolute after:inset-0 group-hover:underline">
            {p.title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.96rem] leading-relaxed text-muted">{p.excerpt}</p>
        <p className="mt-auto pt-4 text-[0.82rem] text-muted">Updated {formatDate(p.updatedAt)}</p>
      </div>
    </article>
  );
}
