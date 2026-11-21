// One-time import of the posts in src/content/posts.ts into the database.
// Safe to re-run: existing slugs are skipped (edits made in the admin win).
//   npx tsx scripts/seed-blog.mts
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { POSTS, type Block } from "../src/content/posts";
import { AUTHOR, SITE } from "../src/lib/site";

config({ path: ".env.local", quiet: true });
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const sql = neon(process.env.DATABASE_URL);

// Focus keyword per post, from the keyword map (one keyword → one URL).
const FOCUS: Record<string, string> = {
  "best-time-to-visit-the-alhambra": "best time to visit the alhambra",
  "how-long-do-you-need-at-the-alhambra": "how long do you need at the alhambra",
  "alhambra-after-the-2026-earthquakes": "is the alhambra open",
  "granada-in-one-day": "granada in one day",
  "alhambra-guided-tour-vs-self-guided": "alhambra guided tour vs self guided",
  "alhambra-with-kids": "alhambra with kids",
  "alhambra-history": "alhambra history",
  "alhambra-wheelchair-access": "alhambra wheelchair access",
  "alhambra-rules-what-to-bring": "what to bring to the alhambra",
  "generalife-gardens-guide": "generalife gardens",
  "alhambra-day-trip-from-madrid": "alhambra day trip from madrid",
  "alhambra-ticket-discounts": "alhambra ticket discounts",
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// The content files use [text](/path) links and **bold**.
const md = (s: string) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text: string, href: string) =>
      href.startsWith("http") ? `<a href="${href}" target="_blank" rel="noopener">${text}</a>` : `<a href="${href}">${text}</a>`);
const slug = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function blockHtml(b: Block): string {
  switch (b.type) {
    case "answer": return `<div data-callout="answer"><p>${md(b.text)}</p></div>`;
    case "p": return `<p>${md(b.text)}</p>`;
    case "h2": return `<h2 id="${esc(b.id)}">${esc(b.text)}</h2>`;
    case "h3": return `<h3 id="${slug(b.text)}">${esc(b.text)}</h3>`;
    case "list": {
      const tag = b.ordered ? "ol" : "ul";
      return `<${tag}>${b.items.map((i) => `<li><p>${md(i)}</p></li>`).join("")}</${tag}>`;
    }
    case "tip": return `<div data-callout="tip" data-title="${esc(b.title)}"><p>${md(b.text)}</p></div>`;
    case "table":
      return `<table><tbody><tr>${b.head.map((h) => `<th><p>${esc(h)}</p></th>`).join("")}</tr>${b.rows
        .map((r) => `<tr>${r.map((c) => `<td><p>${md(c)}</p></td>`).join("")}</tr>`)
        .join("")}</tbody></table>`;
    case "cta":
      return `<aside data-cta="" data-title="${esc(b.title)}" data-text="${esc(b.text)}" data-label="${esc(b.label)}"${b.query ? ` data-query="${esc(b.query)}"` : ""}${b.href ? ` data-href="${esc(b.href)}"` : ""}></aside>`;
  }
}

const words = (html: string) => html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

const site = (await sql`insert into sites (slug, name, domain) values ('alhambra', ${SITE.name}, ${new URL(SITE.url).hostname})
  on conflict (slug) do update set name = excluded.name returning id`)[0].id as number;
let author = (await sql`select id from authors where site_id = ${site} order by id limit 1`)[0]?.id as number | undefined;
if (!author) author = (await sql`insert into authors (site_id, slug, name, bio) values (${site}, ${slug(AUTHOR.name)}, ${AUTHOR.name}, ${AUTHOR.bio}) returning id`)[0].id;

let added = 0, skipped = 0;
for (const p of POSTS) {
  const cat = (await sql`insert into blog_categories (site_id, slug, name) values (${site}, ${slug(p.category)}, ${p.category})
    on conflict (site_id, slug) do update set name = excluded.name returning id`)[0].id;
  const html = p.body.map(blockHtml).join("\n");
  const r = await sql`insert into posts (site_id, slug, title, excerpt, content, status, published_at, category_id, author_id,
      featured_image, featured_src_set, featured_alt, featured_credit, featured_width, featured_height,
      meta_title, meta_description, focus_keyword, og_image, booking, faq, featured, read_mins, created_at, updated_at)
    values (${site}, ${p.slug}, ${p.title}, ${p.excerpt}, ${html}, 'published', ${p.published + "T08:00:00Z"}, ${cat}, ${author},
      ${p.photo.src}, ${p.photo.srcSet}, ${p.photo.alt}, ${p.photo.credit}, ${p.photo.width}, ${p.photo.height},
      ${p.seoTitle}, ${p.excerpt}, ${FOCUS[p.slug] ?? null}, ${p.ogImage ?? null}, ${p.booking ? JSON.stringify(p.booking) : null}, ${JSON.stringify(p.faq)},
      ${!!p.featured}, ${Math.max(1, Math.round(words(html) / 220))}, ${p.published + "T08:00:00Z"}, ${p.updated + "T08:00:00Z"})
    on conflict (site_id, slug) do nothing returning id`;
  if (r[0]) added++;
  else skipped++;
}
console.log(`Blog import done: ${added} added, ${skipped} already in the database.`);
