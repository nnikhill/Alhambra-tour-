// GetYourGuide link builder.
//
// Link format (same as the partner's other sites):
//   <tour url>?partner_id=…&utm_source=alhambratourticket.com&utm_medium=online_publisher
//   &utm_campaign=affiliate_exit&sub_id=<page>_<position>
// sub_id tells GetYourGuide reports which page and button earned the booking.
//
// Known keys resolve to a specific tour (or a filtered GetYourGuide list when no
// single tour fits honestly). Unknown text, e.g. the hero search box, falls
// back to a GetYourGuide search for that text.
//
// Tour URLs checked on getyourguide.com, 21 Nov 2026.

// Not a secret: it appears in every outbound link. The env var lets another
// site reuse this file; the fallback stops a missing env var from silently
// dropping commission in production.
export const GYG_PARTNER_ID = process.env.NEXT_PUBLIC_GYG_PARTNER_ID || "7OGA39F";
const UTM_SOURCE = "alhambratourticket.com";

const GYG = "https://www.getyourguide.com";

export const GYG_PRODUCTS: Record<string, string> = {
  // Granada: Alhambra Ticket and Guided Tour with Nasrid Palaces (3 h, small-group or private)
  "Alhambra guided tour Nasrid Palaces": `${GYG}/granada-l207/granada-alhambra-ticket-and-guided-tour-with-nasrid-palaces-t285662/`,
  // Granada: Alhambra Small Group Tour with Nasrid Palaces
  "Alhambra small group tour": `${GYG}/granada-l207/alhambra-tour-with-nasrid-palaces-and-albaicin-sacromonte-t171177/`,
  // Alhambra: Private Guided Tour with Nasrid Palaces Tickets
  "Alhambra private tour": `${GYG}/granada-l207/alhambra-guided-private-tour-with-fast-track-entry-t278442/`,
  // Granada: Alhambra and Nasrid Palaces Guided Tour at Night
  "Alhambra night tour": `${GYG}/granada-l207/granada-night-visit-to-the-alhambra-nasrid-palaces-t221412/`,
  "Alhambra night tour Nasrid Palaces": `${GYG}/granada-l207/granada-night-visit-to-the-alhambra-nasrid-palaces-t221412/`,
  // No single Generalife-only tour checked yet: all Alhambra tours and tickets.
  "Alhambra Generalife guided tour": `${GYG}/alhambra-l2772/`,
  // Entry tickets (resale with GetYourGuide's booking fee, not the official shop).
  // GetYourGuide's Alhambra entry-ticket list; its top seller is the
  // "Alhambra and Nasrid Palaces Entry Ticket".
  "Alhambra entry ticket": `${GYG}/alhambra-l2772/entry-tickets-tc123/`,
  // Granada: Alhambra Night Visit Entry Ticket (Nasrid Palaces or Generalife at night)
  "Alhambra night entry ticket": `${GYG}/granada-l207/granada-alhambra-night-visit-ticket-t522349/`,
  // Granada: Alhambra Gardens and Generalife Ticket (no Nasrid Palaces)
  "Alhambra gardens ticket": `${GYG}/granada-l207/granada-alhambra-generalife-skip-the-ticket-line-entry-t171748/`,
  // Entry tickets and tours for the Nasrid Palaces.
  "Nasrid Palaces tickets": `${GYG}/nasrid-palaces-l89094/`,
  // From Seville: the top coach trips sell the Alhambra entry as an option, so
  // link the filtered list rather than one trip that may not include it.
  "Alhambra day trip from Seville": `${GYG}/seville-l48/day-trips-tc360/alhambra-tl2772/`,
  "Alhambra small group day trip from Seville": `${GYG}/seville-l48/day-trips-tc360/alhambra-tl2772/`,
  // From Seville: Private Granada Day-Trip with Alhambra Visit
  "Alhambra private day trip from Seville": `${GYG}/seville-l48/private-granada-day-trip-with-alhambra-from-seville-t72273/`,
  // From Malaga: Granada Full-Day Trip with Alhambra (Nasrid Palaces included)
  "Alhambra day trip from Malaga": `${GYG}/malaga-l402/from-malaga-granada-full-day-trip-with-alhambra-t422041/`,
  "Alhambra small group tour from Malaga": `${GYG}/malaga-l402/day-trips-tc360/alhambra-tl2772/`,
  "Alhambra private day trip from Malaga": `${GYG}/malaga-l402/day-trips-tc360/alhambra-tl2772/`,
  // Granada: Alhambra Guided Tour w/ Nasrid Palaces & City Pass (Cathedral, Royal Chapel, buses)
  "Alhambra tour with city pass": `${GYG}/granada-l207/granada-alhambra-guided-tour-w-nasrid-palaces-city-pass-t444772/`,
  // Granada: Albaicín and Sacromonte Guided Sunset Walking Tour
  "Albaicin Sacromonte walking tour": `${GYG}/granada-l207/granada-25-hour-albaicin-sacromonte-walking-tour-t184220/`,
  // Granada: Flamenco Show at Cueva La Faraona (Sacromonte cave, 1 hour)
  "Sacromonte flamenco cave show": `${GYG}/granada-l207/granada-flamenco-show-at-the-cueva-la-faraona-t840866/`,
  // Granada: 3-Hour Cathedral and Royal Chapel Tour
  "Granada Cathedral Royal Chapel tour": `${GYG}/granada-l207/granada-tour-por-catedrales-y-capillas-t165483/`,
};

// Which GetYourGuide product to send each official ticket type to. GetYourGuide
// has no resale product for every combined ticket, so those go to the list.
export const TICKET_GYG_KEY: Record<string, string> = {
  general: "Alhambra entry ticket",
  "alhambra-experiences": "Alhambra entry ticket",
  "dobla-de-oro": "Alhambra entry ticket",
  "rodriguez-acosta": "Alhambra entry ticket",
  "night-nasrid": "Alhambra night entry ticket",
  "dobla-de-oro-night": "Alhambra night entry ticket",
  "generalife-night": "Alhambra night entry ticket",
  "gardens-generalife": "Alhambra gardens ticket",
};

export type GygPlacement = { page: string; position: string };

export function gygUrl(keyOrUrl: string, placement: GygPlacement) {
  const target = keyOrUrl.startsWith("http")
    ? keyOrUrl
    : GYG_PRODUCTS[keyOrUrl] ?? `${GYG}/s/?q=${encodeURIComponent(keyOrUrl)}`;
  const url = new URL(target);
  url.searchParams.set("partner_id", GYG_PARTNER_ID);
  url.searchParams.set("utm_source", UTM_SOURCE);
  url.searchParams.set("utm_medium", "online_publisher");
  url.searchParams.set("utm_campaign", "affiliate_exit");
  url.searchParams.set("sub_id", `${placement.page}_${placement.position}`.replace(/[^a-zA-Z0-9_-]/g, "-"));
  return url.toString();
}

// Featured tour cards. No "from" prices: GetYourGuide prices change daily and by
// currency, so the card sends people to the live price instead of guessing.
// Phase 2: these come from the `gyg_products` table with checked live data.
export type Offer = {
  id: string;
  title: string;
  badge?: string;
  photo: "lions" | "myrtles" | "hero" | "generalife";
  duration: string;
  includes: string[];
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
    query: "Alhambra guided tour Nasrid Palaces",
  },
  {
    id: "small-group",
    title: "Small-group tour with Nasrid Palaces",
    badge: "Best when sold out",
    photo: "myrtles",
    duration: "3 hours",
    includes: ["Entry ticket included", "Nasrid Palaces + Generalife", "Smaller group"],
    query: "Alhambra small group tour",
  },
  {
    id: "night",
    title: "Nasrid Palaces night tour",
    photo: "hero",
    duration: "1.5–2 hours",
    includes: ["Night entry ticket", "Palaces lit after dark", "Fewer crowds"],
    query: "Alhambra night tour",
  },
  {
    id: "day-trip",
    title: "Day trip from Seville",
    photo: "generalife",
    duration: "11–13 hours",
    includes: ["Return transport", "Alhambra ticket on most options", "Free time in Granada"],
    query: "Alhambra day trip from Seville",
  },
];
