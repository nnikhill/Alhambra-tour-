import { GYG_PRODUCTS, gygUrl } from "@/lib/gyg";

// Only GetYourGuide destinations: a product key, a getyourguide.com URL or a
// search phrase. Anything else (e.g. gyg:https://evil.example) is dropped.
function safeGygTarget(key: string): string | null {
  if (GYG_PRODUCTS[key]) return key;
  if (/^https?:/i.test(key)) {
    try {
      const u = new URL(key);
      return u.protocol === "https:" && /(^|\.)getyourguide\.com$/i.test(u.hostname) ? key : null;
    } catch {
      return null;
    }
  }
  return key.length <= 120 ? key : null;
}

// Turns stored post HTML into public HTML:
//  - gyg:<key> links → tracked GetYourGuide URLs (partner ID, UTM, sub_id),
//    rel="sponsored nofollow noopener", new tab, data-track for analytics
//  - <aside data-cta …> → booking box with a button
//  - <div data-callout="answer|tip"> → styled short-answer / tip boxes
// Input is already sanitized; every attribute we read is re-escaped here.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const unesc = (s: string) => s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const attr = (tag: string, name: string) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`));
  return m ? unesc(m[1]) : "";
};

export function renderPostHtml(html: string, pageId: string): string {
  let n = 0;
  let out = html.replace(/<a ([^>]*?)href="gyg:([^"]+)"([^>]*)>/g, (_m, pre: string, key: string, post: string) => {
    n += 1;
    let raw = key;
    try { raw = decodeURIComponent(key); } catch {}
    const target = safeGygTarget(unesc(raw));
    if (!target) return `<a ${pre}${post}>`.replace(/\s+>/, ">"); // unsafe target: keep text, drop link
    const href = gygUrl(target, { page: pageId, position: `link_${n}` });
    const rest = `${pre}${post}`.replace(/\s*(target|rel|data-track)="[^"]*"/g, "").trim();
    return `<a ${rest ? rest + " " : ""}href="${esc(href)}" target="_blank" rel="sponsored nofollow noopener" data-track="affiliate_click">`;
  });
  let c = 0;
  out = out.replace(/<aside ([^>]*data-cta[^>]*)>[\s\S]*?<\/aside>|<aside ([^>]*data-cta[^>]*)\/>/g, (_m, a1: string, a2: string) => {
    const tag = a1 || a2;
    c += 1;
    const title = attr(tag, "data-title"), text = attr(tag, "data-text"), label = attr(tag, "data-label") || "Check availability";
    const query = safeGygTarget(attr(tag, "data-query")) ?? "", href = attr(tag, "data-href");
    const link = query
      ? `<a href="${esc(gygUrl(query, { page: pageId, position: `cta_${c}` }))}" target="_blank" rel="sponsored nofollow noopener" data-track="affiliate_click" class="btn btn-white mt-5 h-12">${esc(label)}</a>`
      : href && /^\/[^/]/.test(href)
        ? `<a href="${esc(href)}" class="btn btn-white mt-5 h-12">${esc(label)}</a>`
        : "";
    return `<aside class="post-cta"><p class="post-cta-title">${esc(title)}</p>${text ? `<p class="post-cta-text">${esc(text)}</p>` : ""}${link}</aside>`;
  });
  out = out.replace(/<div data-callout="(answer|tip)"(?: data-title="([^"]*)")?>/g, (_m, kind: string, title?: string) =>
    kind === "answer"
      ? `<div class="post-answer"><p class="post-answer-label">Short answer</p>`
      : `<div class="post-tip">${title ? `<p class="post-tip-title">${esc(unesc(title))}</p>` : ""}`,
  );
  // Wide tables scroll inside their own box on phones.
  out = out.replace(/<table>/g, '<div class="post-table"><table>').replace(/<\/table>/g, "</table></div>");
  return out;
}

/** Table of contents from H2s (ids are added on save). */
export function tocFromHtml(html: string) {
  return [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({ id: m[1], text: unesc(m[2].replace(/<[^>]+>/g, "")) }));
}

/** First <div data-callout="answer"> block, for placing the phone booking card. */
export function splitAfterAnswer(html: string): [string, string] {
  const start = html.indexOf('<div class="post-answer">');
  if (start === -1) return ["", html];
  // find the matching closing </div> (callouts contain no nested divs)
  const end = html.indexOf("</div>", start);
  if (end === -1) return ["", html];
  return [html.slice(0, end + 6), html.slice(end + 6)];
}
