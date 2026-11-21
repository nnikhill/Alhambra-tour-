import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { absoluteUrl } from "@/lib/site";
import { LAST_CHECKED } from "@/content/facts";
import { POSTS } from "@/content/posts";

// Phase 2: generated from published rows in the `pages` and `posts` tables.
export default function sitemap(): MetadataRoute.Sitemap {
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
    { url: absoluteUrl("/blog/"), lastModified: LAST_CHECKED, changeFrequency: "weekly", priority: 0.6 },
    ...POSTS.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}/`), lastModified: p.updated, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
