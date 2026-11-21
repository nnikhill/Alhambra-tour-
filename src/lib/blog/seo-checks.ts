// SEO checklist shown in the editor. Pure function: works in the browser.
export type Check = { ok: boolean; label: string; tip?: string };

const strip = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

export function seoChecks(p: { title: string; slug: string; metaTitle: string; metaDescription: string; excerpt: string; focusKeyword: string; content: string; featuredImage: string | null; featuredAlt: string }): Check[] {
  const kw = p.focusKeyword.trim().toLowerCase();
  const text = strip(p.content);
  const words = text ? text.split(" ").length : 0;
  const mt = (p.metaTitle || p.title).trim();
  const md = (p.metaDescription || p.excerpt).trim();
  const first = strip((p.content.match(/<p[\s>][\s\S]*?<\/p>/) ?? [""])[0]).toLowerCase();
  const h2s = [...p.content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1]).toLowerCase());
  const internal = (p.content.match(/href="\/(?!\/)[^"]*"/g) ?? []).length;
  const booking = /href="gyg:|data-cta/.test(p.content);
  const imgsNoAlt = (p.content.match(/<img(?![^>]*alt="[^"]+")[^>]*>/g) ?? []).length;
  const checks: Check[] = [
    { ok: mt.length >= 30 && mt.length <= 60, label: `Meta title is ${mt.length} characters`, tip: "Aim for 30–60 so Google shows it in full." },
    { ok: md.length >= 120 && md.length <= 160, label: `Meta description is ${md.length} characters`, tip: "Aim for 120–160." },
    { ok: words >= 600, label: `${words} words`, tip: "Guides that rank usually need 600+ words of real answers." },
    { ok: internal >= 2, label: `${internal} internal links`, tip: "Link to at least 2 related pages (tickets, tours, guides)." },
    { ok: booking, label: booking ? "Has a booking link or box" : "No booking link or box yet", tip: "Add a GetYourGuide link or booking box where readers are ready to book." },
    { ok: !p.featuredImage || !!p.featuredAlt.trim(), label: p.featuredImage ? "Featured image has alt text" : "No featured image", tip: "Add a featured image with alt text." },
    { ok: imgsNoAlt === 0, label: imgsNoAlt ? `${imgsNoAlt} image(s) in the text without alt text` : "All images in the text have alt text" },
    { ok: /<div data-callout="answer"/.test(p.content), label: "Starts with a short answer box", tip: "A 2–3 sentence answer near the top helps Google and AI answers quote you." },
  ];
  if (kw) {
    checks.unshift(
      { ok: mt.toLowerCase().includes(kw), label: "Focus keyword in meta title" },
      { ok: md.toLowerCase().includes(kw), label: "Focus keyword in meta description" },
      { ok: p.slug.includes(kw.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) || kw.split(" ").filter((w) => w.length > 3).every((w) => p.slug.includes(w)), label: "Focus keyword in the URL" },
      { ok: first.includes(kw) || text.toLowerCase().slice(0, 600).includes(kw), label: "Focus keyword near the start" },
      { ok: h2s.some((h) => kw.split(" ").filter((w) => w.length > 3).every((w) => h.includes(w))), label: "Focus keyword (or its words) in a subheading" },
    );
  } else {
    checks.unshift({ ok: false, label: "No focus keyword set", tip: "Pick the one search phrase this post should rank for." });
  }
  return checks;
}
