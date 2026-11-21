import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import { GuideArticle } from "@/components/content/guide-article";
import { ALBAICIN as g } from "@/content/guides";

export const metadata: Metadata = withOg({
  title: { absolute: g.seoTitle },
  description: g.description,
  alternates: { canonical: g.path },
  openGraph: { type: "article", title: g.seoTitle, description: g.description, images: [g.ogImage ?? g.photo.src] },
}, g.path);

export default function Page() {
  return <GuideArticle g={g} />;
}
