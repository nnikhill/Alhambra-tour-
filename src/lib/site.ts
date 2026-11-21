export const SITE = {
  name: "Alhambra Tour Ticket",
  shortName: "Alhambra Tour Ticket",
  // Production domain as the fallback so a missing env var on Vercel can never
  // put localhost into canonicals and the sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://alhambratourticket.com",
  description:
    "An independent guide to getting into the Alhambra in Granada: every ticket type, what to do when tickets sell out, and the tours worth booking.",
  author: { name: "Alhambra Tour Ticket", url: "/" },
  locale: "en",
};

// Public contact address (set NEXT_PUBLIC_CONTACT_EMAIL on Vercel).
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

// Byline used on articles and guides. The brand is the author: no invented
// person. Add a real named author here later if one writes for the site.
export const AUTHOR = {
  name: SITE.name,
  url: SITE.url,
  bio: "Alhambra Tour Ticket is an independent guide to visiting the Alhambra in Granada. We check ticket rules, prices and opening hours against the official Patronato de la Alhambra y Generalife website and update our pages when they change.",
};

export const NAV = [
  { href: "/tickets/", label: "Tickets" },
  { href: "/tours/", label: "Tours" },
  { href: "/day-trips/", label: "Day trips" },
  { href: "/plan/", label: "Plan your visit" },
  { href: "/guide/", label: "Inside the Alhambra" },
  { href: "/blog/", label: "Blog" },
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}
