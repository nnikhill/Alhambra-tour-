import "server-only";
import sanitizeHtml from "sanitize-html";

// Server-side cleaning of editor/pasted HTML before it is stored.
// Keeps structure (headings, lists, tables, links, images, quotes) and our
// custom blocks (callouts, CTA asides); strips scripts, styles, event handlers,
// iframes and unsafe URL schemes. Runs on every save, so nothing unclean can
// reach the database even if the request is crafted by hand.

const ALLOWED = {
  allowedTags: [
    "h2", "h3", "h4", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "code", "pre", "blockquote",
    "ul", "ol", "li", "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tr", "th", "td", "colgroup", "col",
    "div", "aside", "span", "sup", "sub",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    h2: ["id"], h3: ["id"], h4: ["id"],
    th: ["colspan", "rowspan", "scope"], td: ["colspan", "rowspan"], col: ["span"],
    div: ["data-callout", "data-title"],
    aside: ["data-cta", "data-title", "data-text", "data-label", "data-query", "data-href"],
    ol: ["start"],
  },
  // gyg:<product key> is our own placeholder for GetYourGuide links.
  allowedSchemes: ["http", "https", "mailto", "gyg"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  disallowedTagsMode: "discard" as const,
  // Pasted Word/Docs markup: drop wrappers but keep their text.
  exclusiveFilter: (frame: sanitizeHtml.IFrame) =>
    (frame.tag === "p" || frame.tag === "span") && !frame.text.trim() && !frame.mediaChildren?.length,
  transformTags: {
    b: "strong",
    i: "em",
    h1: "h2", // only the page title is an H1
    h5: "h4",
    h6: "h4",
  },
};

export function slugify(s: string) {
  return s
    .normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Clean HTML and give every H2/H3 a unique id (for the table of contents). */
export function cleanPostHtml(input: string): string {
  let html = sanitizeHtml(input, ALLOWED);
  const used = new Set<string>();
  html = html.replace(/<(h2|h3)(\s[^>]*)?>([\s\S]*?)<\/\1>/g, (_m, tag: string, _attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = slugify(text) || tag;
    while (used.has(id)) id = `${id}-2`;
    used.add(id);
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  // External links open in a new tab safely; internal ones stay as they are.
  html = html.replace(/<a ([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/g, (m, pre: string, href: string, post: string) => {
    const own = /^https?:\/\/(www\.)?alhambratourticket\.com/i.test(href);
    if (own) return m;
    const rest = `${pre}${post}`.replace(/\s*(target|rel)="[^"]*"/g, "");
    return `<a ${rest.trim() ? rest.trim() + " " : ""}href="${href}" target="_blank" rel="noopener">`;
  });
  return html.trim();
}

export function plainText(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

export function readMinutes(html: string) {
  return Math.max(1, Math.round(plainText(html).split(" ").length / 220));
}
