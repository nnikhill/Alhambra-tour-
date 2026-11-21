import "server-only";
import { GYG_PRODUCTS } from "@/lib/gyg";
import { GUIDES } from "@/content/guides";
import { listPublished } from "./repo";
import { BOOKING_PRESETS } from "./presets";

// Everything the editor's link tool can insert: site pages, guides, published
// posts and GetYourGuide products (inserted as gyg:<key>, tracked at render).
const PAGES = [
  { href: "/", label: "Home: Alhambra tickets and tours" },
  { href: "/tickets/", label: "Alhambra tickets compared" },
  { href: "/tickets/sold-out/", label: "Alhambra tickets sold out" },
  { href: "/tickets/night-visit/", label: "Alhambra night visit" },
  { href: "/tickets/nasrid-palaces/", label: "Nasrid Palaces tickets" },
  { href: "/tours/", label: "Alhambra guided tours" },
  { href: "/day-trips/", label: "Alhambra day trips" },
  { href: "/day-trips/from-seville/", label: "Day trip from Seville" },
  { href: "/day-trips/from-malaga/", label: "Day trip from Málaga" },
  { href: "/plan/", label: "Plan your visit" },
  { href: "/blog/", label: "Blog" },
];

export async function linkTargets() {
  const posts = await listPublished();
  return {
    internal: [
      ...PAGES,
      ...GUIDES.map((x) => ({ href: x.path, label: x.title })),
      ...posts.map((p) => ({ href: `/blog/${p.slug}/`, label: p.title })),
    ],
    gyg: Object.keys(GYG_PRODUCTS).map((key) => ({ key, label: key })),
    presets: BOOKING_PRESETS.map((p) => ({ ...p })),
  };
}
