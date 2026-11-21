import type { FormState } from "@/components/admin/post-editor";

type Row = Awaited<ReturnType<typeof import("@/lib/blog/admin-repo").getAdminPost>>;

export const EMPTY_FORM: FormState = {
  title: "", slug: "", excerpt: "", content: "", status: "draft", publishedAt: "",
  categoryId: null, newCategory: "", tags: "", authorId: null,
  featuredImage: "", featuredSrcSet: null, featuredAlt: "", featuredCredit: "", featuredWidth: null, featuredHeight: null,
  metaTitle: "", metaDescription: "", focusKeyword: "", canonicalUrl: "", noindex: false,
  ogTitle: "", ogDescription: "", ogImage: "", booking: null, faq: [], relatedIds: [], featured: false, revisionNote: "",
};

export function rowToForm(r: Row): FormState {
  return {
    title: r.title, slug: r.slug, excerpt: r.excerpt, content: r.content, status: r.status as FormState["status"], publishedAt: "",
    categoryId: r.categoryId, newCategory: "", tags: r.tags.join(", "), authorId: r.authorId,
    featuredImage: r.featuredImage ?? "", featuredSrcSet: r.featuredSrcSet, featuredAlt: r.featuredAlt, featuredCredit: r.featuredCredit ?? "",
    featuredWidth: r.featuredWidth, featuredHeight: r.featuredHeight,
    metaTitle: r.metaTitle ?? "", metaDescription: r.metaDescription ?? "", focusKeyword: r.focusKeyword ?? "", canonicalUrl: r.canonicalUrl ?? "", noindex: r.noindex,
    ogTitle: r.ogTitle ?? "", ogDescription: r.ogDescription ?? "", ogImage: r.ogImage ?? "",
    booking: r.booking ?? null, faq: r.faq ?? [], relatedIds: r.relatedIds ?? [], featured: r.featured, revisionNote: "",
  };
}
