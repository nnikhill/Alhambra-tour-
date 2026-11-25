import { absoluteUrl } from "@/lib/site";
import { LAST_CHECKED } from "@/content/facts";
import { listPublished } from "@/lib/blog/repo";
import { GUIDES } from "@/content/guides";

// /sitemap.xml as a plain route handler, like /llms.txt. The metadata-route
// version (app/sitemap.ts) was never refreshed on Vercel after the build: it
// kept trashed posts and missed new ones. This one refreshes hourly and when
// a post is saved in the admin (revalidatePath in admin-repo).
export const revalidate = 3600;

type Entry = { url: string; lastModified: string | Date; changeFrequency: string; priority: number };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const day = (d: string | Date) => (typeof d === "string" ? d : d.toISOString());

export async function GET() {
  const posts = (await listPublished()).filter((p) => !p.noindex && !p.canonicalUrl);
  const entries: Entry[] = [
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
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries
      .map((e) => `<url>\n<loc>${esc(e.url)}</loc>\n<lastmod>${day(e.lastModified)}</lastmod>\n<changefreq>${e.changeFrequency}</changefreq>\n<priority>${e.priority}</priority>\n</url>`)
      .join("\n") +
    "\n</urlset>\n";
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
