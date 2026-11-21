// GetYourGuide link builder. Every outbound link carries the partner ID and a
// campaign value (page + position) so GetYourGuide reports show what earned.

export const GYG_PARTNER_ID = process.env.NEXT_PUBLIC_GYG_PARTNER_ID ?? "";

export type GygPlacement = { page: string; position: string };

export function gygUrl(pathOrQuery: string, placement: GygPlacement) {
  const base = pathOrQuery.startsWith("http")
    ? new URL(pathOrQuery)
    : new URL(`https://www.getyourguide.com/s/?q=${encodeURIComponent(pathOrQuery)}`);
  if (GYG_PARTNER_ID) base.searchParams.set("partner_id", GYG_PARTNER_ID);
  base.searchParams.set("cmp", `${placement.page}__${placement.position}`);
  return base.toString();
}

// Phase 2: these come from the `gyg_products` table (admin product library) with
// real activity URLs, live prices and ratings. Prices below are typical "from"
// prices seen across booking sites in Nov 2026 — replace with the exact product.
export type Offer = {
  id: string;
  title: string;
  badge?: string;
  photo: "lions" | "myrtles" | "hero" | "generalife";
  duration: string;
  includes: string[];
  priceFrom: number;
  query: string;
};

export const OFFERS: Offer[] = [
  {
    id: "guided",
    title: "Alhambra guided tour with Nasrid Palaces",
    badge: "Most booked",
    photo: "lions",
    duration: "3 hours",
    includes: ["Entry ticket included", "Nasrid Palaces + Generalife", "Official licensed guide"],
    priceFrom: 49,
    query: "Alhambra guided tour Nasrid Palaces",
  },
  {
    id: "small-group",
    title: "Small-group tour, max 15 people",
    badge: "Best when sold out",
    photo: "myrtles",
    duration: "3 hours",
    includes: ["Entry ticket included", "Nasrid Palaces + Generalife", "Smaller group, more time"],
    priceFrom: 69,
    query: "Alhambra small group tour",
  },
  {
    id: "night",
    title: "Nasrid Palaces night tour",
    photo: "hero",
    duration: "1.5–2 hours",
    includes: ["Night entry ticket", "Palaces lit after dark", "Fewer crowds"],
    priceFrom: 49,
    query: "Alhambra night tour",
  },
  {
    id: "day-trip",
    title: "Day trip from Seville or Málaga",
    photo: "generalife",
    duration: "11–13 hours",
    includes: ["Return transport", "Entry ticket + guide", "Free time in Granada"],
    priceFrom: 175,
    query: "Alhambra day trip from Seville",
  },
];
