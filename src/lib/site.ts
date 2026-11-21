export const SITE = {
  name: "Alhambra Tour",
  shortName: "Alhambra Tour",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "An independent guide to getting into the Alhambra in Granada: every ticket type, what to do when tickets sell out, and the tours worth booking.",
  author: { name: "Alhambra Tour", url: "/" },
  locale: "en",
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
