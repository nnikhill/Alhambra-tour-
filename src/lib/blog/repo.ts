import "server-only";
import { cache } from "react";
import { and, desc, eq, inArray, isNull, lte, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { authors, blogCategories, blogTags, postTags, posts, redirects, sites } from "@/db/schema";
import { SITE, AUTHOR } from "@/lib/site";
import type { PostView } from "./types";

// Public read side of the blog. Every query is scoped to this site and to
// posts that are published (or scheduled with a publish time in the past) and
// not in the trash. Pages using these are ISR-cached, and admin saves call
// revalidatePath, so the database is only read when something changes.

const SITE_SLUG = "alhambra";

export const getSiteId = cache(async (): Promise<number | null> => {
  if (!db) return null;
  const found = await db.select({ id: sites.id }).from(sites).where(eq(sites.slug, SITE_SLUG)).limit(1);
  if (found[0]) return found[0].id;
  const created = await db
    .insert(sites)
    .values({ slug: SITE_SLUG, name: SITE.name, domain: new URL(SITE.url).hostname })
    .onConflictDoNothing()
    .returning({ id: sites.id });
  if (created[0]) return created[0].id;
  const again = await db.select({ id: sites.id }).from(sites).where(eq(sites.slug, SITE_SLUG)).limit(1);
  return again[0]?.id ?? null;
});

const isLive = () =>
  and(
    isNull(posts.deletedAt),
    or(eq(posts.status, "published"), eq(posts.status, "scheduled")),
    lte(posts.publishedAt, sql`now()`),
  );

type Row = typeof posts.$inferSelect & { categorySlug: string | null; categoryName: string | null; authorName: string | null; authorBio: string | null };

function toView(r: Row, tags: { slug: string; name: string }[] = []): PostView {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    category: r.categorySlug ? { slug: r.categorySlug, name: r.categoryName ?? r.categorySlug } : null,
    tags,
    author: { name: r.authorName ?? AUTHOR.name, bio: r.authorBio ?? AUTHOR.bio, url: null },
    image: r.featuredImage
      ? { src: r.featuredImage, srcSet: r.featuredSrcSet, alt: r.featuredAlt, width: r.featuredWidth ?? 1280, height: r.featuredHeight ?? 720, credit: r.featuredCredit }
      : null,
    publishedAt: (r.publishedAt ?? r.createdAt).toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    readMins: r.readMins,
    featured: r.featured,
    metaTitle: r.metaTitle || r.title,
    metaDescription: r.metaDescription || r.excerpt,
    focusKeyword: r.focusKeyword,
    canonicalUrl: r.canonicalUrl,
    noindex: r.noindex,
    ogTitle: r.ogTitle,
    ogDescription: r.ogDescription,
    ogImage: r.ogImage,
    booking: r.booking ?? null,
    faq: r.faq ?? [],
    relatedIds: r.relatedIds ?? [],
  };
}

function baseSelect() {
  return db!
    .select({
      post: posts,
      categorySlug: blogCategories.slug,
      categoryName: blogCategories.name,
      authorName: authors.name,
      authorBio: authors.bio,
    })
    .from(posts)
    .leftJoin(blogCategories, eq(posts.categoryId, blogCategories.id))
    .leftJoin(authors, eq(posts.authorId, authors.id));
}

const flat = (x: { post: typeof posts.$inferSelect; categorySlug: string | null; categoryName: string | null; authorName: string | null; authorBio: string | null }): Row => ({
  ...x.post, categorySlug: x.categorySlug, categoryName: x.categoryName, authorName: x.authorName, authorBio: x.authorBio,
});

/** All live posts, newest first (featured first when asked). */
export const listPublished = cache(async (): Promise<PostView[]> => {
  const siteId = await getSiteId();
  if (!db || !siteId) return [];
  const rows = await baseSelect().where(and(eq(posts.siteId, siteId), isLive())).orderBy(desc(posts.publishedAt));
  return rows.map((r) => toView(flat(r)));
});

export const getPublishedBySlug = cache(async (slug: string): Promise<PostView | null> => {
  const siteId = await getSiteId();
  if (!db || !siteId) return null;
  const rows = await baseSelect().where(and(eq(posts.siteId, siteId), eq(posts.slug, slug), isLive())).limit(1);
  if (!rows[0]) return null;
  const tags = await db
    .select({ slug: blogTags.slug, name: blogTags.name })
    .from(postTags)
    .innerJoin(blogTags, eq(postTags.tagId, blogTags.id))
    .where(eq(postTags.postId, rows[0].post.id));
  return toView(flat(rows[0]), tags);
});

/** Live posts by id, keeping the given order (for "related" picks). */
export async function getPublishedByIds(ids: number[]): Promise<PostView[]> {
  const siteId = await getSiteId();
  if (!db || !siteId || !ids.length) return [];
  const rows = await baseSelect().where(and(eq(posts.siteId, siteId), inArray(posts.id, ids), isLive()));
  const byId = new Map(rows.map((r) => [r.post.id, toView(flat(r))]));
  return ids.map((id) => byId.get(id)).filter((p): p is PostView => !!p);
}

/** Old URL → new URL (written when a published post's slug changes). */
export async function findRedirect(path: string): Promise<string | null> {
  const siteId = await getSiteId();
  if (!db || !siteId) return null;
  const r = await db.select({ to: redirects.to }).from(redirects).where(and(eq(redirects.siteId, siteId), eq(redirects.from, path))).limit(1);
  return r[0]?.to ?? null;
}

export { toView, flat, baseSelect };
