import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { LAST_CHECKED } from "@/content/facts";
import { listPublished } from "@/lib/blog/repo";
import { GUIDES } from "@/content/guides";

// Phase 2: generated from published rows in the `pages` and `posts` tables.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await listPublished()).filter((p) => !p.noindex && !p.canonicalUrl);
  return [
    { url: absoluteUrl("/"), lastModified: LAST_CHECKED, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tickets/"), lastModified: LAST_CHECKED, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tickets/sold-out/"), lastModified: LAST_CHECKED, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tours/"), lastModified: LAST_CHECKED, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tickets/night-visit/"), lastModified: LAST_CHECKED, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/day-trips/"), lastModified: LAST_CHECKED, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/day-trips/from-seville/"), lastModified: LAST_CHECKED, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/day-trips/from-malaga/"), lastModified: LAST_CHECKED, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/plan/"), lastModified: LAST_CHECKED, changeFrequency: "monthly", priority: 0.8 },
    // Guide pages carry their own "last checked" date, so lastmod follows it.
    ...GUIDES.map((g) => ({ url: absoluteUrl(g.path), lastModified: g.updated, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: absoluteUrl("/blog/"), lastModified: LAST_CHECKED, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}/`), lastModified: p.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
    // Trust pages (who we are, how we earn): low priority but indexable.
    { url: absoluteUrl("/about/"), lastModified: LAST_CHECKED, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/affiliate-disclosure/"), lastModified: LAST_CHECKED, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/contact/"), lastModified: LAST_CHECKED, changeFrequency: "yearly", priority: 0.2 },
  ];
}
