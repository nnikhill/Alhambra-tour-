import type { Metadata } from "next";
import { SITE } from "@/lib/site";

// Every page gets the same social/OG basics: canonical, og:url, site name,
// locale, a 1200x630 image and matching Twitter tags. Pages pass their own
// title/description/image; anything they set in openGraph wins (except url,
// which always matches the canonical path).
type OgImages = NonNullable<NonNullable<Metadata["openGraph"]>["images"]>;
const DEFAULT_IMAGES: OgImages = [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "The Alhambra in Granada at sunset" }];

export function withOg(meta: Metadata, path: string): Metadata {
  const title = typeof meta.title === "string" ? meta.title : (meta.title as { absolute?: string } | undefined)?.absolute;
  const description = meta.description ?? undefined;
  const og = meta.openGraph ?? {};
  const images: OgImages = og.images ?? DEFAULT_IMAGES;
  return {
    ...meta,
    alternates: { ...meta.alternates, canonical: path },
    openGraph: { siteName: SITE.name, locale: "en_GB", type: "website", title, description, ...og, images, url: path } as Metadata["openGraph"],
    twitter: { card: "summary_large_image", title, description, images: images as NonNullable<Metadata["twitter"]>["images"] },
  };
}
