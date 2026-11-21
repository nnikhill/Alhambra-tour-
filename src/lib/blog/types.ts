import type { BookingCta, FaqItem } from "@/db/schema";

export type PostImage = { src: string; srcSet?: string | null; alt: string; width: number; height: number; credit?: string | null };

// What public pages need about a post (built from the DB row + joins).
export type PostView = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // sanitized HTML as stored
  category: { slug: string; name: string } | null;
  tags: { slug: string; name: string }[];
  author: { name: string; bio: string; url: string | null };
  image: PostImage | null;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  readMins: number;
  featured: boolean;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string | null;
  canonicalUrl: string | null;
  noindex: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  booking: BookingCta | null;
  faq: FaqItem[];
  relatedIds: number[];
};

export type PostCardData = Pick<PostView, "slug" | "title" | "excerpt" | "category" | "readMins" | "updatedAt" | "image">;
