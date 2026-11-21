import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import { DayTripPage } from "@/components/day-trips/day-trip-page";

// Primary keyword: "alhambra day trip from seville".
// Also: "seville to granada day trip", "alhambra tour from seville",
// "granada day trip from seville", "how far is the alhambra from seville".

export const metadata: Metadata = withOg({
  title: "Alhambra Day Trip from Seville 2026: Tours & Timings",
  description:
    "Coach, small-group and private Alhambra day trips from Seville compared: the day hour by hour, what's included and how to do it by train.",
  alternates: { canonical: "/day-trips/from-seville/" },
}, "/day-trips/from-seville/");

export default function Page() {
  return <DayTripPage slug="seville" />;
}
