import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FinalCta } from "@/components/home/final-cta";
import { CategoryTag } from "@/components/blog/category-tag";
import { PostCard } from "@/components/blog/post-card";
import { listPublished } from "@/lib/blog/repo";
import { formatDate } from "@/lib/format";
import { gygUrl } from "@/lib/gyg";
import { AffiliateNote } from "@/components/affiliate-note";

// Blog index, same visual language as the home hero: cream band, centred
// serif headline, one featured guide, a booking strip for readers who are
// ready, then a card grid. No entrance animation.

export const metadata: Metadata = withOg({
  title: "Alhambra Blog: Visiting Tips, Planning Guides & News",
  description: "Practical guides for visiting the Alhambra in Granada: the best time to go, how long you need, and the latest on what's open.",
  alternates: { canonical: "/blog/" },
}, "/blog/");

const TOPICS = [
  { href: "/tickets/", label: "Tickets" },
  { href: "/tickets/sold-out/", label: "Sold out?" },
  { href: "/tours/", label: "Guided tours" },
  { href: "/tickets/night-visit/", label: "Night visit" },
  { href: "/plan/", label: "Plan your visit" },
];

// Rebuilt at most hourly (scheduled posts appear within the hour) and
// immediately whenever a post is saved in the admin (revalidatePath).
export const revalidate = 3600;

export default async function BlogIndex() {
  const all = await listPublished();
  const featured = all.find((p) => p.featured) ?? all[0];
  const rest = all.filter((p) => p !== featured);

  return (
    <main id="main">
      {/* Header band */}
      <section className="bg-[#faf4ec]">
        <div className="wrap pb-12 pt-8 sm:pb-14 sm:pt-10">
          <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/blog/", label: "Blog" }]} />
          <div className="mx-auto mt-8 max-w-[44rem] text-center">
            <h1 className="text-balance font-serif text-[clamp(2.3rem,5vw,3.8rem)] font-bold leading-[1.04] tracking-[-0.025em] text-ink">
              Alhambra visitor guides
            </h1>
            <p className="mx-auto mt-4 max-w-[36rem] text-pretty text-[1.08rem] leading-relaxed text-[#3d4450]">
              Short, practical answers to the questions people ask before visiting, checked against the official Alhambra site and kept up to date.
            </p>
            <nav aria-label="Popular topics" className="mt-6 flex flex-wrap justify-center gap-2">
              {TOPICS.map((t) => (
                <Link key={t.href} href={t.href} className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-[0.92rem] font-medium text-ink no-underline ring-1 ring-[#ecdcc8] transition-colors hover:ring-ink">
                  {t.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {featured && (
      /* Featured guide */
      <section className="wrap -mt-1 pt-10 sm:pt-12" aria-labelledby="featured-title">
        <p className="text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-[#8a4b0a]">Start here</p>
        <article className="group relative mt-3 grid overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-[0_18px_44px_rgba(20,24,31,0.10)] md:grid-cols-[1.25fr_1fr]">
          <div className="overflow-hidden bg-soft">
            {featured.image && <img
              src={featured.image.src} width={featured.image.width} height={featured.image.height}
              srcSet={featured.image.srcSet ?? undefined}
              sizes="(min-width:768px) 680px, 100vw"
              alt={featured.image.alt}
              className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:aspect-auto"
            />}
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-9">
            <p className="flex items-center gap-3 text-[0.88rem] text-muted">
              <CategoryTag c={featured.category} /> {featured.readMins} min read
            </p>
            <h2 id="featured-title" className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.1] text-ink">
              <Link href={`/blog/${featured.slug}/`} className="text-ink no-underline after:absolute after:inset-0 group-hover:underline">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">{featured.excerpt}</p>
            <p className="mt-6 inline-flex items-center gap-2 font-semibold text-ink">
              Read the guide <ArrowRight className="size-4" aria-hidden />
            </p>
            <p className="mt-3 text-[0.82rem] text-muted">Updated {formatDate(featured.updatedAt)}</p>
          </div>
        </article>
      </section>
      )}

      {/* Booking strip for readers who already know their dates */}
      <section className="wrap pt-8" aria-label="Ready to book">
        <div className="flex flex-col gap-4 rounded-2xl bg-brand px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-[1.1rem] font-bold">Already know your dates?</p>
            <p className="mt-0.5 text-[0.95rem] text-white/80">Tours with the Nasrid Palaces ticket included often still have places.</p>
          </div>
          <a
            href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "blog", position: "index_strip" })}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn btn-white h-12 shrink-0 px-6"
            data-track="affiliate_click"
          >
            <Search className="size-[18px]" aria-hidden /> Check tours for your date
          </a>
        </div>
        <AffiliateNote className="mt-2.5" />
      </section>

      {/* All guides */}
      <section className="wrap pb-16 pt-12 sm:pb-20" aria-labelledby="all-title">
        <h2 id="all-title" className="section-title">All guides</h2>
        {/* Two wide lead cards, then rows of three: no empty slot with 5 guides */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {!all.length && <p className="text-muted">New guides are on the way.</p>}
          {rest.map((p, i) => {
            const wide = rest.length % 3 === 2 && i < 2;
            return <PostCard key={p.slug} p={p} wide={wide} className={wide ? "lg:col-span-3" : "lg:col-span-2"} />;
          })}
        </div>
      </section>

      <FinalCta page="blog" />
    </main>
  );
}
