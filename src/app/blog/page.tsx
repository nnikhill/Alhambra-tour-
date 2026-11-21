import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FinalCta } from "@/components/home/final-cta";
import { CategoryTag } from "@/components/blog/category-tag";
import { POSTS } from "@/content/posts";
import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";

// Simple, readable index: one "start here" post, then a clean list.
// Layout idea from MotionSites "Blog Showcase", toned down for reading.

export const metadata: Metadata = {
  title: "Alhambra Blog: Visiting Tips, Planning Guides & News",
  description: "Practical guides for visiting the Alhambra in Granada: the best time to go, how long you need, and the latest on what's open.",
  alternates: { canonical: "/blog/" },
};

const TOPICS = [
  { href: "/tickets/", label: "Tickets" },
  { href: "/tickets/sold-out/", label: "Sold out?" },
  { href: "/tours/", label: "Guided tours" },
  { href: "/tickets/night-visit/", label: "Night visit" },
  { href: "/plan/", label: "Plan your visit" },
];

export default function BlogIndex() {
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const rest = POSTS.filter((p) => p !== featured);

  return (
    <main id="main">
      <section className="wrap max-w-[1080px] pt-8 sm:pt-10">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/blog/", label: "Blog" }]} />
        <h1 className="hero-rise mt-6 font-serif text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.025em]">Alhambra visitor guides</h1>
        <p className="mt-3 max-w-[56ch] text-[1.1rem] text-muted">
          Short, practical answers to the questions people ask before visiting, written by the {SITE.name} team and kept up to date.
        </p>
        <nav aria-label="Popular topics" className="mt-6 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <Link key={t.href} href={t.href} className="rounded-full bg-soft px-4 py-2 text-[0.92rem] font-medium text-ink no-underline hover:bg-[#ece8e1]">
              {t.label}
            </Link>
          ))}
        </nav>
      </section>

      {/* Start here */}
      <section className="wrap mt-10 max-w-[1080px]" aria-labelledby="start-title">
        <h2 id="start-title" className="sr-only">Start here</h2>
        <Link href={`/blog/${featured.slug}/`} className="group grid items-center gap-6 no-underline md:grid-cols-[1.1fr_1fr] md:gap-10">
          <div className="overflow-hidden rounded-2xl">
            <img src={featured.photo.src} srcSet={featured.photo.srcSet} sizes="(min-width:768px) 560px, 100vw" alt={featured.photo.alt} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          </div>
          <div>
            <p className="text-[0.88rem] font-semibold text-[#8a4b0a]">Start here</p>
            <p className="mt-2 font-serif text-[clamp(1.6rem,3vw,2.3rem)] font-bold leading-[1.12] text-ink group-hover:underline">{featured.title}</p>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">{featured.excerpt}</p>
            <p className="mt-5 flex items-center gap-3 text-[0.9rem] text-muted">
              <CategoryTag c={featured.category} /> {featured.readMins} min read
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-ink">Read the guide <ArrowRight className="size-4" aria-hidden /></span>
          </div>
        </Link>
      </section>

      {/* All guides */}
      <section className="wrap max-w-[1080px] pb-16 pt-14" aria-labelledby="all-title">
        <h2 id="all-title" className="section-title">All guides</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`} className="group grid grid-cols-[6.5rem_1fr] items-center gap-5 py-6 no-underline sm:grid-cols-[12rem_1fr] sm:gap-8">
                <img src={p.photo.src} srcSet={p.photo.srcSet} sizes="(min-width:640px) 192px, 104px" alt={p.photo.alt} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
                <div>
                  <p className="flex items-center gap-3 text-[0.85rem] text-muted"><CategoryTag c={p.category} /> {p.readMins} min read</p>
                  <p className="mt-2 text-[1.15rem] font-bold leading-snug text-ink group-hover:underline sm:text-[1.3rem]">{p.title}</p>
                  <p className="mt-1.5 hidden text-[0.98rem] text-muted sm:block">{p.excerpt}</p>
                  <p className="mt-2 text-[0.85rem] text-muted">Updated {formatDate(p.updated)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </main>
  );
}
