// "Alhambra tickets sold out" page content.
// Sources: official ticket site; turismo.granada.org (Granada Card types);
// artvisitguide.com (Experiences/Gardens outlast General);
// thebettervacation.com (cancelled tickets released around midnight CET).

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
    what: "A guided Alhambra tour with the Nasrid Palaces, plus a city pass with entry to the Cathedral, the Royal Chapel and other sights, and city bus rides. Good if you're staying two days.",
    price: "Live price on GetYourGuide",
    availability: "Sometimes",
    palaces: "Nasrid Palaces by day",
    cta: { label: "See tour + city pass", kind: "gyg", query: "Alhambra tour with city pass" },
  },
  midnight: {
    id: "midnight",
    title: "Check again for cancelled tickets",
    what: "Availability changes as tickets are cancelled and released. Check entry tickets again the evening before your visit.",
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
    a: "Returned tickets go back on sale on the official site. Checking just after midnight Spanish time gives you the best chance, but there's no guarantee.",
  },
  {
    q: "Are tours on GetYourGuide real if the official site is sold out?",
    a: "Yes. Licensed tour operators buy official tickets in advance and include them in the tour. That is why tours can have space on dates the official site shows as sold out. They cost more because a guide is included.",
  },
  {
    q: "Can I buy Alhambra tickets at the door?",
    a: "Only if tickets for that day are left, which is rare outside winter. Don't travel to Granada counting on it.",
  },
  {
    q: "I only have one day in Granada. What should I book?",
    a: "A guided tour with tickets included is the most reliable option for a single day. If you'd rather go alone, try the Gardens ticket by day plus the Nasrid Palaces night visit.",
  },
];
