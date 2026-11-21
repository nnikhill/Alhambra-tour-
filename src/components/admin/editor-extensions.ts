import { Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { Placeholder, CharacterCount } from "@tiptap/extensions";

// Custom blocks that map 1:1 to what the public renderer understands
// (src/lib/blog/render.ts): callouts and booking (CTA) boxes.

/** <div data-callout="answer|tip" data-title="…">…</div> */
export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  addAttributes() {
    return {
      variant: { default: "tip", parseHTML: (el) => el.getAttribute("data-callout") || "tip", renderHTML: (a) => ({ "data-callout": a.variant }) },
      title: { default: null, parseHTML: (el) => el.getAttribute("data-title"), renderHTML: (a) => (a.title ? { "data-title": a.title } : {}) },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-callout]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { class: "ed-callout" }), 0];
  },
});

/** <aside data-cta data-title data-text data-label data-query|data-href> */
export const CtaBlock = Node.create({
  name: "ctaBlock",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    const a = (name: string) => ({ default: null, parseHTML: (el: HTMLElement) => el.getAttribute(`data-${name}`), renderHTML: (v: Record<string, string | null>) => (v[name] ? { [`data-${name}`]: v[name] } : {}) });
    return { title: a("title"), text: a("text"), label: a("label"), query: a("query"), href: a("href") };
  },
  parseHTML() {
    return [{ tag: "aside[data-cta]" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    const { title, text, label, query, href } = node.attrs as Record<string, string | null>;
    return [
      "aside",
      mergeAttributes(HTMLAttributes, { "data-cta": "", class: "ed-cta" }),
      ["strong", {}, `Booking box: ${title ?? ""}`],
      ["span", {}, `${text ?? ""} → [${label ?? ""}] ${query ? `GetYourGuide: ${query}` : href ?? ""}`],
    ];
  },
});

/** H2–H4 only (the page title is the H1). Pasted H1 becomes H2, H5/H6 become H4,
 *  so headings from Google Docs or Word keep their structure. */
const PostHeading = Heading.extend({
  parseHTML() {
    const map: [string, number][] = [["h1", 2], ["h2", 2], ["h3", 3], ["h4", 4], ["h5", 4], ["h6", 4]];
    return map.map(([tag, level]) => ({ tag, attrs: { level } }));
  },
}).configure({ levels: [2, 3, 4] });

export function editorExtensions() {
  return [
    StarterKit.configure({
      heading: false,
      codeBlock: false,
      link: {
        openOnClick: false,
        autolink: true,
        protocols: ["gyg"],
        isAllowedUri: (url, ctx) => url.startsWith("gyg:") || url.startsWith("/") || ctx.defaultValidate(url),
        HTMLAttributes: { rel: null, target: null },
      },
    }),
    PostHeading,
    Image.configure({ allowBase64: false, HTMLAttributes: { loading: "lazy" } }),
    TableKit.configure({ table: { resizable: false } }),
    Placeholder.configure({ placeholder: "Start writing, or paste your article here. Headings, lists, links, tables and images keep their formatting." }),
    CharacterCount,
    Callout,
    CtaBlock,
  ];
}
