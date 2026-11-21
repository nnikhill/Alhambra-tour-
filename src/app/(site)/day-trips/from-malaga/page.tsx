import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import { DayTripPage } from "@/components/day-trips/day-trip-page";

// Primary keyword: "alhambra day trip from malaga".
// Also: "malaga to granada day trip", "alhambra tour from malaga",
// "alhambra tour from malaga cruise port", "alhambra from costa del sol".

export const metadata: Metadata = withOg({
  title: "Alhambra Day Trip from Málaga 2026: Tours & Cruise Port",
  description:
    "Alhambra day trips from Málaga and the Costa del Sol compared: coach, small-group and private, plus cruise port trips and the train or bus.",
  alternates: { canonical: "/day-trips/from-malaga/" },
}, "/day-trips/from-malaga/");

export default function Page() {
  return <DayTripPage slug="malaga" />;
}
