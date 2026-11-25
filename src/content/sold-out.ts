// "Alhambra tickets sold out" page content.
// Sources: official ticket site; turismo.granada.org (Granada Card types);
// artvisitguide.com (Experiences/Gardens outlast General);
// turismo.granada.org/en/what-do-if-there-are-no-alhambra-tickets-official-website
// (last-minute tickets 8–10 pm the day before; Granada Card quota and tiers;
// free-access areas; warning about tours that get cancelled), checked 25 Nov 2026.

export type Timeframe = "now" | "week" | "later";

export type OptionId = "tour" | "experiences" | "dobla" | "card" | "midnight" | "gardensNight" | "daytrip";

export type SoldOutOption = {
  id: OptionId;
  title: string;
  what: string;
  price: string;
  availability: "Often" | "Sometimes" | "Rarely";
  palaces: string;
  cta: { label: string; kind: "gyg" | "link"; query?: string; href?: string };
};

export const OPTIONS: Record<OptionId, SoldOutOption> = {
  tour: {
    id: "tour",
    title: "Guided tour with tickets included",
    what: "Licensed operators book their own tickets in advance, so tours often have space when entry tickets are sold out.",
    price: "Live price on GetYourGuide",
    availability: "Often",
    palaces: "Nasrid Palaces by day",
    cta: { label: "Check tours for your date", kind: "gyg", query: "Alhambra guided tour Nasrid Palaces" },
  },
  experiences: {
    id: "experiences",
    title: "Alhambra Experiences ticket",
    what: "An official ticket sold on the Alhambra ticket site: the Nasrid Palaces at night, then the Generalife and gardens the next day. Needs two days in Granada. GetYourGuide sells the night visit separately.",
    price: "Official price €22.27",
    availability: "Often",
    palaces: "Nasrid Palaces at night",
    cta: { label: "Compare night tickets", kind: "gyg", query: "Alhambra night entry ticket" },
  },
  dobla: {
    id: "dobla",
    title: "Dobla de Oro General ticket",
    what: "An official ticket sold on the Alhambra ticket site: the full daytime visit plus the Albaicín monuments. Often still on sale after General is gone. Also compare resale entry tickets.",
    price: "Official price €30.48",
    availability: "Sometimes",
    palaces: "Nasrid Palaces by day",
    cta: { label: "Compare entry tickets", kind: "gyg", query: "Alhambra entry ticket" },
  },
  card: {
    id: "card",
    title: "Alhambra tour + Granada city pass",
    what: "Some Alhambra tickets are kept for the official Granada Card (city pass with monuments and buses), so it can have space when the General ticket is gone. GetYourGuide sells a guided tour combined with a city pass. Good if you're staying two days.",
    price: "Live price on GetYourGuide",
    availability: "Sometimes",
    palaces: "Nasrid Palaces by day",
    cta: { label: "See tour + city pass", kind: "gyg", query: "Alhambra tour with city pass" },
  },
  midnight: {
    id: "midnight",
    title: "Check again for cancelled tickets",
    what: "Some last-minute tickets go on sale on the official site between 8 pm and 10 pm the evening before (Granada's official tourism office). Check entry tickets again then. There's no guarantee.",
    price: "Live price on GetYourGuide",
    availability: "Rarely",
    palaces: "Nasrid Palaces by day",
    cta: { label: "Check entry tickets", kind: "gyg", query: "Alhambra entry ticket" },
  },
  gardensNight: {
    id: "gardensNight",
    title: "Gardens by day + palaces at night",
    what: "Two tickets that sell out much later: the Gardens & Generalife ticket by day and the Nasrid Palaces night visit. Official price €12.73 each; resale costs a little more.",
    price: "Two tickets",
    availability: "Often",
    palaces: "Nasrid Palaces at night",
    cta: { label: "Gardens ticket", kind: "gyg", query: "Alhambra gardens ticket" },
  },
  daytrip: {
    id: "daytrip",
    title: "Day trip from Seville or Málaga",
    what: "Transport and a guide in one booking, with the Alhambra ticket on most options (check the listing). The easiest fix if you're not staying in Granada.",
    price: "Live price on GetYourGuide",
    availability: "Often",
    palaces: "Nasrid Palaces by day",
    cta: { label: "See day trips", kind: "gyg", query: "Alhambra day trip from Seville" },
  },
};

export const RANKING: Record<Timeframe, { label: string; intro: string; order: OptionId[] }> = {
  now: {
    label: "Today or tomorrow",
    intro: "This close, official tickets are almost always gone. Go straight to options with their own ticket supply.",
    order: ["tour", "gardensNight", "daytrip", "midnight"],
  },
  week: {
    label: "Within a week",
    intro: "Check the other official tickets first, then lock in a tour before those sell out too.",
    order: ["tour", "experiences", "dobla", "card", "midnight"],
  },
  later: {
    label: "More than a week away",
    intro: "You still have time to get an official ticket. Work down this list and book as soon as one appears.",
    order: ["experiences", "dobla", "card", "tour", "midnight"],
  },
};

export const DONT = [
  { title: "Don't buy from unknown sites", text: "Book through the official ticket site or a large platform with verified reviews and clear cancellation terms, such as GetYourGuide. Unknown sellers may not deliver a valid ticket." },
  { title: "Don't buy someone else's ticket", text: "Tickets carry the visitor's name, and staff check ID. A ticket in another name won't get you in." },
  { title: "Don't count on the ticket office", text: "On-the-day tickets are only sold if any are left, which rarely happens in spring, summer or autumn." },
  { title: "Don't book a tour without the palaces", text: "Granada's tourism office warns that some companies sell gardens-only tours or cancel tours sold after tickets run out. Check the listing says the Nasrid Palaces entry is included, and choose free cancellation." },
];

// What you can see without any ticket (turismo.granada.org free-access list).
export const FREE_AREAS = [
  { name: "Palace of Charles V", text: "The Renaissance palace inside the walls, next to the Nasrid Palaces entrance." },
  { name: "Gate of Justice and Gate of Wine", text: "The main gate into the complex and the gateway beyond it, both in the free area." },
  { name: "Alhambra Forest and Cuesta de los Chinos", text: "The wooded slopes and the old path up the hill from the river." },
];

export const SOLD_OUT_FAQ = [
  {
    q: "Is the Alhambra really sold out?",
    a: "Usually only the General ticket is sold out. Alhambra Experiences, Dobla de Oro, the night visits, the Gardens ticket and guided tours with tickets often still have space for the same dates.",
  },
  {
    q: "How far in advance do Alhambra tickets sell out?",
    a: "In spring, summer and autumn the General ticket often sells out weeks ahead, sometimes up to two months. In winter you can sometimes still book a week or two before.",
  },
  {
    q: "When are cancelled Alhambra tickets released?",
    a: "Granada's official tourism office says some last-minute tickets may go on sale on the official Alhambra site between 8 pm and 10 pm the day before. Check again then, but there's no guarantee.",
  },
  {
    q: "Are tours on GetYourGuide real if the official site is sold out?",
    a: "Many are: tour operators buy official tickets in advance, which is why tours can have space on sold-out dates. But Granada's official tourism office warns that some companies cancel tours booked after tickets sell out, and some sell gardens-only tours. Book only a listing that says the Nasrid Palaces entry is included, has recent reviews and offers free cancellation.",
  },
  {
    q: "Can I buy Alhambra tickets at the door?",
    a: "Only if tickets for that day are left, which is rare outside winter. Don't travel to Granada counting on it.",
  },
  {
    q: "Does the Granada Card include the Alhambra?",
    a: "Yes. A number of Alhambra tickets are kept for the Granada Card. The 72-hour and 48-hour cards include general Alhambra entry, the 24-hour card the Nasrid Palaces night visit, and the Jardines card the gardens. Check availability on the Granada Card booking site before you count on it.",
  },
  {
    q: "I only have one day in Granada. What should I book?",
    a: "A guided tour with tickets included is the most reliable option for a single day. If you'd rather go alone, try the Gardens ticket by day plus the Nasrid Palaces night visit.",
  },
];
