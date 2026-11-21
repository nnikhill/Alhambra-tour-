import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { withOg } from "@/lib/seo";
import { PostArticle, pickRelated } from "@/components/blog/post-article";
import { findRedirect, getPublishedByIds, getPublishedBySlug, listPublished } from "@/lib/blog/repo";

// Posts come from the database (admin → /admin/posts). Known posts are built
// at deploy time; new ones render on first visit and are then cached. Saving
// in the admin revalidates the page straight away.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await listPublished()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPublishedBySlug(slug);
  if (!p) return { robots: { index: false } };
  const image = p.ogImage ?? p.image?.src;
  return {
    ...withOg(
      {
        title: { absolute: p.metaTitle },
        description: p.metaDescription,
        alternates: p.canonicalUrl ? { canonical: p.canonicalUrl } : undefined,
        openGraph: {
          type: "article",
          title: p.ogTitle ?? p.metaTitle,
          description: p.ogDescription ?? p.metaDescription,
          publishedTime: p.publishedAt,
          modifiedTime: p.updatedAt,
          ...(image ? { images: [image] } : {}),
        },
      },
      `/blog/${p.slug}/`,
    ),
    ...(p.canonicalUrl ? { alternates: { canonical: p.canonicalUrl } } : {}),
    ...(p.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = await getPublishedBySlug(slug);
  if (!p) {
    const to = await findRedirect(`/blog/${slug}/`);
    if (to) permanentRedirect(to);
    notFound();
  }
  const [all, picked] = await Promise.all([listPublished(), getPublishedByIds(p.relatedIds)]);
  return <PostArticle p={p} related={pickRelated(p, all, picked)} />;
}
