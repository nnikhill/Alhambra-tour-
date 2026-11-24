import { notFound } from "next/navigation";

// Unknown URLs render the site's own 404 (with header, footer and links)
// instead of Next's bare default, still with a 404 status.
export default function Missing() {
  notFound();
}
