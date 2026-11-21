import "server-only";
import { revalidatePath } from "next/cache";
import { and, asc, desc, eq, ilike, inArray, isNotNull, isNull, ne, or, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { authors, blogCategories, blogTags, postRevisions, postTags, posts, redirects, users } from "@/db/schema";
import { getSiteId } from "./repo";
import { cleanPostHtml, readMinutes, slugify } from "./sanitize";
import { AUTHOR } from "@/lib/site";

// Write side of the blog for the admin API. All input is validated with zod
// and HTML is sanitized before it reaches the database.

const optText = (max: number) => z.string().trim().max(max).optional().nullable().transform((v) => (v ? v : null));
const httpsUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https:\/\//.test(v) || v.startsWith("/"), "Must be an https:// URL or a /path")
  .optional()
  .nullable()
  .transform((v) => (v ? v : null));

export const postInput = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z.string().trim().max(100).optional().default(""),
  excerpt: z.string().trim().max(400).default(""),
  content: z.string().max(500_000).default(""),
  status: z.enum(["draft", "scheduled", "published"]).default("draft"),
  publishedAt: z.string().datetime({ offset: true }).optional().nullable(),
  categoryId: z.number().int().positive().optional().nullable(),
  newCategory: optText(60),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  authorId: z.number().int().positive().optional().nullable(),
  featuredImage: httpsUrl,
  featuredSrcSet: z.string().max(2000).optional().nullable(),
  featuredAlt: z.string().trim().max(200).default(""),
  featuredCredit: optText(200),
  featuredWidth: z.number().int().positive().max(20000).optional().nullable(),
  featuredHeight: z.number().int().positive().max(20000).optional().nullable(),
  metaTitle: optText(70),
  metaDescription: optText(170),
  focusKeyword: optText(80),
  canonicalUrl: httpsUrl,
  noindex: z.boolean().default(false),
  ogTitle: optText(100),
  ogDescription: optText(200),
  ogImage: httpsUrl,
  booking: z
    .object({ title: z.string().trim().min(1).max(80), text: z.string().trim().max(200), label: z.string().trim().min(1).max(40), query: z.string().trim().min(1).max(120) })
    .nullable()
    .optional(),
  faq: z.array(z.object({ q: z.string().trim().min(1).max(200), a: z.string().trim().min(1).max(1000) })).max(15).default([]),
  relatedIds: z.array(z.number().int().positive()).max(6).default([]),
  featured: z.boolean().default(false),
  revisionNote: optText(120),
});
export type PostInput = z.infer<typeof postInput>;

export class AdminError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

async function siteIdOrThrow() {
  const id = await getSiteId();
  if (!db || !id) throw new AdminError("Database is not configured", 500);
  return id;
}

/** Publishing rules that the form can't enforce on its own. */
function checkPublishable(p: PostInput, slug: string) {
  const problems: string[] = [];
  if (!slug) problems.push("a URL slug");
  if (!p.excerpt && !p.metaDescription) problems.push("an excerpt or meta description");
  if (p.featuredImage && !p.featuredAlt) problems.push("alt text for the featured image");
  if (!p.content.replace(/<[^>]+>/g, "").trim()) problems.push("some content");
  if (problems.length) throw new AdminError(`To publish, add ${problems.join(", ")}.`);
}

async function upsertTags(siteId: number, names: string[]) {
  const unique = [...new Map(names.map((n) => [slugify(n), n])).entries()].filter(([s]) => s);
  if (!unique.length) return [] as number[];
  await db!.insert(blogTags).values(unique.map(([slug, name]) => ({ siteId, slug, name }))).onConflictDoNothing();
  const rows = await db!.select({ id: blogTags.id }).from(blogTags).where(and(eq(blogTags.siteId, siteId), inArray(blogTags.slug, unique.map(([s]) => s))));
  return rows.map((r) => r.id);
}

export async function ensureCategory(siteId: number, name: string) {
  const slug = slugify(name);
  if (!slug) throw new AdminError("Category name is empty");
  await db!.insert(blogCategories).values({ siteId, slug, name: name.trim() }).onConflictDoNothing();
  const row = await db!.select({ id: blogCategories.id }).from(blogCategories).where(and(eq(blogCategories.siteId, siteId), eq(blogCategories.slug, slug))).limit(1);
  return row[0].id;
}

export async function ensureDefaultAuthor(siteId: number) {
  const row = await db!.select({ id: authors.id }).from(authors).where(eq(authors.siteId, siteId)).orderBy(asc(authors.id)).limit(1);
  if (row[0]) return row[0].id;
  const created = await db!.insert(authors).values({ siteId, slug: slugify(AUTHOR.name), name: AUTHOR.name, bio: AUTHOR.bio }).returning({ id: authors.id });
  return created[0].id;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function revalidateBlog(slugs: string[]) {
  // The blog index, every post page (related-post lists change too), the
  // exact URLs touched, and the files that list posts. Route-group paths are
  // needed for the pattern form (the pages live in app/(site)/blog).
  revalidatePath("/(site)/blog", "page");
  revalidatePath("/(site)/blog/[slug]", "page");
  for (const s of slugs) revalidatePath(`/blog/${s}/`);
  // Metadata/route files: their cache tags are "<path>/layout" (the plain
  // path form doesn't match because of trailingSlash: true).
  revalidatePath("/sitemap.xml", "layout");
  revalidatePath("/llms.txt", "layout");
}

const isLiveRow = (r: { status: string; publishedAt: Date | null; deletedAt: Date | null }) =>
  !r.deletedAt && (r.status === "published" || r.status === "scheduled") && !!r.publishedAt && r.publishedAt.getTime() <= Date.now();

/** Create (id = null) or update a post. Returns the saved row id + slug. */
export async function savePost(id: number | null, input: PostInput, user: { id: number; role: string }) {
  const siteId = await siteIdOrThrow();
  const slug = slugify(input.slug || input.title);
  if (!slug) throw new AdminError("Add a title or a URL slug");
  if (input.status !== "draft" && user.role === "writer") throw new AdminError("Writers can save drafts only. Ask an editor to publish.", 403);

  let publishedAt: Date | null = input.publishedAt ? new Date(input.publishedAt) : null;
  let status = input.status;
  if (status !== "draft") {
    checkPublishable(input, slug);
    if (!publishedAt) publishedAt = new Date();
    // A future date means "schedule it"; a past or empty date publishes now.
    status = publishedAt.getTime() > Date.now() ? "scheduled" : "published";
  }

  const clash = await db!.select({ id: posts.id }).from(posts).where(and(eq(posts.siteId, siteId), eq(posts.slug, slug), id ? ne(posts.id, id) : sql`true`)).limit(1);
  if (clash[0]) throw new AdminError(`Another post already uses /blog/${slug}/. Pick a different slug.`, 409);

  const content = cleanPostHtml(input.content);
  const categoryId = input.newCategory ? await ensureCategory(siteId, input.newCategory) : (input.categoryId ?? null);
  const authorId = input.authorId ?? (await ensureDefaultAuthor(siteId));
  const values = {
    siteId,
    slug,
    title: input.title,
    excerpt: input.excerpt,
    content,
    status,
    publishedAt,
    categoryId,
    authorId,
    featuredImage: input.featuredImage,
    featuredSrcSet: input.featuredImage ? input.featuredSrcSet ?? null : null,
    featuredAlt: input.featuredAlt,
    featuredCredit: input.featuredCredit,
    featuredWidth: input.featuredWidth ?? null,
    featuredHeight: input.featuredHeight ?? null,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    focusKeyword: input.focusKeyword,
    canonicalUrl: input.canonicalUrl,
    noindex: input.noindex,
    ogTitle: input.ogTitle,
    ogDescription: input.ogDescription,
    ogImage: input.ogImage,
    booking: input.booking ?? null,
    faq: input.faq,
    relatedIds: input.relatedIds.filter((r) => r !== id),
    featured: input.featured,
    readMins: readMinutes(content),
    updatedAt: new Date(),
    updatedBy: user.id,
  };

  let saved: { id: number; slug: string };
  const before = id ? (await db!.select().from(posts).where(and(eq(posts.id, id), eq(posts.siteId, siteId))).limit(1))[0] : null;
  if (id && !before) throw new AdminError("Post not found", 404);
  if (before) {
    await db!.update(posts).set(values).where(eq(posts.id, before.id));
    saved = { id: before.id, slug };
    // URL changed on a live post: 301 the old URL to the new one.
    if (before.slug !== slug && isLiveRow(before)) {
      await db!
        .insert(redirects)
        .values({ siteId, from: `/blog/${before.slug}/`, to: `/blog/${slug}/` })
        .onConflictDoUpdate({ target: [redirects.siteId, redirects.from], set: { to: `/blog/${slug}/` } });
    }
    // The new URL must never redirect away (e.g. when reusing an old slug).
    await db!.delete(redirects).where(and(eq(redirects.siteId, siteId), eq(redirects.from, `/blog/${slug}/`)));
    await db!.update(redirects).set({ to: `/blog/${slug}/` }).where(and(eq(redirects.siteId, siteId), eq(redirects.to, `/blog/${before.slug}/`)));
  } else {
    const created = await db!.insert(posts).values(values).returning({ id: posts.id });
    saved = { id: created[0].id, slug };
  }

  const tagIds = await upsertTags(siteId, input.tags);
  await db!.delete(postTags).where(eq(postTags.postId, saved.id));
  if (tagIds.length) await db!.insert(postTags).values(tagIds.map((tagId) => ({ postId: saved.id, tagId }))).onConflictDoNothing();

  await db!.insert(postRevisions).values({ postId: saved.id, snapshot: { ...values, tags: input.tags, publishedAt: publishedAt?.toISOString() ?? null }, note: input.revisionNote, userId: user.id });
  // Keep the newest 30 revisions per post.
  await db!.execute(sql`delete from post_revisions where post_id = ${saved.id} and id not in (select id from post_revisions where post_id = ${saved.id} order by created_at desc limit 30)`);

  revalidateBlog(before && before.slug !== slug ? [slug, before.slug] : [slug]);
  return { ...saved, status, publishedAt: publishedAt?.toISOString() ?? null };
}

export async function listAdminPosts(opts: { q?: string; status?: string; trash?: boolean }) {
  const siteId = await siteIdOrThrow();
  const where = [eq(posts.siteId, siteId), opts.trash ? isNotNull(posts.deletedAt) : isNull(posts.deletedAt)];
  if (opts.status && ["draft", "scheduled", "published"].includes(opts.status)) where.push(eq(posts.status, opts.status as "draft"));
  if (opts.q) where.push(or(ilike(posts.title, `%${opts.q}%`), ilike(posts.slug, `%${opts.q}%`))!);
  return db!
    .select({
      id: posts.id, title: posts.title, slug: posts.slug, status: posts.status, publishedAt: posts.publishedAt, updatedAt: posts.updatedAt,
      featured: posts.featured, category: blogCategories.name, focusKeyword: posts.focusKeyword, deletedAt: posts.deletedAt,
    })
    .from(posts)
    .leftJoin(blogCategories, eq(posts.categoryId, blogCategories.id))
    .where(and(...where))
    .orderBy(desc(posts.updatedAt))
    .limit(500);
}

export async function getAdminPost(id: number) {
  const siteId = await siteIdOrThrow();
  const row = (await db!.select().from(posts).where(and(eq(posts.id, id), eq(posts.siteId, siteId))).limit(1))[0];
  if (!row) throw new AdminError("Post not found", 404);
  const tags = await db!.select({ name: blogTags.name }).from(postTags).innerJoin(blogTags, eq(postTags.tagId, blogTags.id)).where(eq(postTags.postId, id));
  return { ...row, tags: tags.map((t) => t.name) };
}

export async function trashPost(id: number) {
  const siteId = await siteIdOrThrow();
  const row = (await db!.update(posts).set({ deletedAt: new Date(), updatedAt: new Date() }).where(and(eq(posts.id, id), eq(posts.siteId, siteId))).returning({ slug: posts.slug }))[0];
  if (!row) throw new AdminError("Post not found", 404);
  revalidateBlog([row.slug]);
}

export async function restorePost(id: number) {
  const siteId = await siteIdOrThrow();
  const row = (await db!.update(posts).set({ deletedAt: null, updatedAt: new Date() }).where(and(eq(posts.id, id), eq(posts.siteId, siteId))).returning({ slug: posts.slug }))[0];
  if (!row) throw new AdminError("Post not found", 404);
  revalidateBlog([row.slug]);
}

/** Permanent delete: only from the trash. */
export async function destroyPost(id: number) {
  const siteId = await siteIdOrThrow();
  const row = (await db!.delete(posts).where(and(eq(posts.id, id), eq(posts.siteId, siteId), isNotNull(posts.deletedAt))).returning({ slug: posts.slug }))[0];
  if (!row) throw new AdminError("Move the post to the trash first", 409);
  revalidateBlog([row.slug]);
}

export async function listRevisions(id: number) {
  return db!
    .select({ id: postRevisions.id, note: postRevisions.note, createdAt: postRevisions.createdAt, user: users.name })
    .from(postRevisions)
    .leftJoin(users, eq(postRevisions.userId, users.id))
    .where(eq(postRevisions.postId, id))
    .orderBy(desc(postRevisions.createdAt))
    .limit(30);
}

export async function getRevision(postId: number, revId: number) {
  const r = (await db!.select().from(postRevisions).where(and(eq(postRevisions.id, revId), eq(postRevisions.postId, postId))).limit(1))[0];
  if (!r) throw new AdminError("Revision not found", 404);
  return r.snapshot;
}

export async function taxonomy() {
  const siteId = await siteIdOrThrow();
  await ensureDefaultAuthor(siteId);
  const [cats, tags, auths, all] = await Promise.all([
    db!.select().from(blogCategories).where(eq(blogCategories.siteId, siteId)).orderBy(asc(blogCategories.name)),
    db!.select().from(blogTags).where(eq(blogTags.siteId, siteId)).orderBy(asc(blogTags.name)),
    db!.select().from(authors).where(eq(authors.siteId, siteId)).orderBy(asc(authors.name)),
    db!.select({ id: posts.id, title: posts.title, slug: posts.slug, status: posts.status }).from(posts).where(and(eq(posts.siteId, siteId), isNull(posts.deletedAt))).orderBy(asc(posts.title)),
  ]);
  return { categories: cats, tags, authors: auths, posts: all };
}

export const authorInput = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().trim().min(1).max(80),
  bio: z.string().trim().min(1).max(600),
  photoUrl: httpsUrl,
});

export async function saveAuthor(input: z.infer<typeof authorInput>) {
  const siteId = await siteIdOrThrow();
  const values = { siteId, name: input.name, bio: input.bio, photoUrl: input.photoUrl, slug: slugify(input.name) };
  if (input.id) {
    const r = await db!.update(authors).set(values).where(and(eq(authors.id, input.id), eq(authors.siteId, siteId))).returning({ id: authors.id });
    if (!r[0]) throw new AdminError("Author not found", 404);
  } else {
    await db!.insert(authors).values(values);
  }
  revalidateBlog([]);
}

/** Preview of any post (any status), shaped like the public view. */
export async function getAdminPreview(id: number) {
  const siteId = await siteIdOrThrow();
  const { baseSelect, flat, toView } = await import("./repo");
  const rows = await baseSelect().where(and(eq(posts.id, id), eq(posts.siteId, siteId))).limit(1);
  if (!rows[0]) throw new AdminError("Post not found", 404);
  const tags = await db!
    .select({ slug: blogTags.slug, name: blogTags.name })
    .from(postTags)
    .innerJoin(blogTags, eq(postTags.tagId, blogTags.id))
    .where(eq(postTags.postId, id));
  return toView(flat(rows[0]), tags);
}
