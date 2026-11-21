// Ready-made booking cards (CTA management): pick one in the editor or write
// your own. query = a GetYourGuide product key from src/lib/gyg.ts or a search.
export const BOOKING_PRESETS = [
  { name: "Tours with tickets (sold-out dates)", title: "Tickets sold out for your date?", text: "Guided tours include the entry ticket and a Nasrid Palaces time.", label: "Check tours for your date", query: "Alhambra guided tour Nasrid Palaces" },
  { name: "Entry tickets", title: "Ready to book?", text: "Compare Alhambra entry tickets with the Nasrid Palaces for your date.", label: "Check entry tickets", query: "Alhambra entry ticket" },
  { name: "Private tours", title: "Want to go at your own pace?", text: "A private tour with the Nasrid Palaces ticket included.", label: "See private tours", query: "Alhambra private tour" },
  { name: "Small-group tours", title: "Prefer a smaller group?", text: "Small-group tours with the entry ticket included.", label: "See small-group tours", query: "Alhambra small group tour" },
  { name: "Night tours", title: "See the palaces after dark", text: "Night tours of the Nasrid Palaces, ticket included.", label: "See night tours", query: "Alhambra night tour Nasrid Palaces" },
  { name: "Gardens ticket", title: "Palace tickets gone?", text: "The Gardens & Generalife ticket often has space when the General ticket is sold out.", label: "Check gardens tickets", query: "Alhambra gardens ticket" },
  { name: "Day trips from Seville", title: "Coming from Seville?", text: "Day trips with transport, a guide and the Alhambra ticket.", label: "See trips from Seville", query: "Alhambra day trip from Seville" },
  { name: "Day trips from Málaga", title: "Coming from Málaga?", text: "Day trips with transport, a guide and the Alhambra ticket.", label: "See trips from Málaga", query: "Alhambra day trip from Malaga" },
];
