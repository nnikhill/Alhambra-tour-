// Ticket-page content. Coverage reflects the official ticket descriptions.
// The Alcazaba reopened on 23 Sep 2026 on an adapted route (official ticket site).

export type Coverage = {
  nasrid: "day" | "night" | false;
  generalife: "day" | "night" | false;
  alcazaba: boolean;
  albaicin: boolean;
  extra?: string;
};

export const COVERAGE: Record<string, Coverage> = {
  general: { nasrid: "day", generalife: "day", alcazaba: true, albaicin: false },
  "alhambra-experiences": { nasrid: "night", generalife: "day", alcazaba: true, albaicin: false, extra: "2 visits on consecutive days" },
  "dobla-de-oro": { nasrid: "day", generalife: "day", alcazaba: true, albaicin: true },
  "rodriguez-acosta": { nasrid: "day", generalife: "day", alcazaba: true, albaicin: false, extra: "Rodríguez-Acosta Foundation" },
  "night-nasrid": { nasrid: "night", generalife: false, alcazaba: false, albaicin: false },
  "dobla-de-oro-night": { nasrid: "night", generalife: false, alcazaba: false, albaicin: true },
  "gardens-generalife": { nasrid: false, generalife: "day", alcazaba: true, albaicin: false },
  "generalife-night": { nasrid: false, generalife: "night", alcazaba: false, albaicin: false },
};

// The three tickets that cover the full daytime visit, shown as the main cards.
export const FEATURED = ["general", "alhambra-experiences", "dobla-de-oro"] as const;

export const SOLD_OUT_STEPS = [
  {
    title: "Check Alhambra Experiences and Dobla de Oro",
    text: "Experiences gives you the palaces at night and the gardens next day; Dobla de Oro adds Albaicín monuments to a daytime visit. Both are official tickets that often outlast the General ticket.",
  },
  {
    title: "Book a guided tour with tickets included",
    text: "Licensed operators book their own tickets in advance, so tours often have space when entry tickets are sold out. It costs more because a guide is included.",
  },
  {
    title: "Check entry tickets again the night before",
    text: "Availability changes as tickets are cancelled and released. Look again the evening before your visit.",
  },
  {
    title: "Settle for the gardens",
    text: "The Gardens & Generalife ticket skips the Nasrid Palaces but sells out much later. Pair it with a night visit to the palaces if one is free.",
  },
];

export const HOW_TO_BOOK = [
  { title: "Choose a ticket that includes the Nasrid Palaces", text: "For a first visit you want the palaces by day. Gardens-only tickets don't include them." },
  { title: "Pick your date and check the palace time", text: "Some resale tickets assign the Nasrid Palaces time by availability. Read the listing before you pay." },
  { title: "Enter each visitor's name and ID number", text: "Tickets are personal. Children under 12 go free but still need a ticket in their name." },
  { title: "Check the cancellation terms", text: "Alhambra tickets are often non-refundable. The terms are shown on each listing before you pay." },
  { title: "Bring the same passport or ID", text: "Staff can check that it matches the name on the ticket." },
];

export const TICKETS_FAQ = [
  {
    q: "Which Alhambra ticket should I buy?",
    a: "For a first visit, buy the Alhambra General ticket. It is the only standard ticket that includes the Nasrid Palaces by day, plus the Generalife and gardens. If it is sold out for your date, look at Alhambra Experiences or Dobla de Oro next.",
  },
  {
    q: "How much are Alhambra tickets in 2026?",
    a: "The General ticket costs €22.27 for adults when booked online. Night visits to the Nasrid Palaces cost €12.73, and the gardens-only ticket €12.73. Children under 12 go free; EU citizens over 65, European Youth Card holders and people with a disability of 33% or more pay a reduced price with official proof.",
  },
  {
    q: "Which tickets include the Nasrid Palaces?",
    a: "By day: General, Dobla de Oro and the Alhambra + Rodríguez-Acosta ticket. At night: the Nasrid Palaces night visit, Alhambra Experiences and Dobla de Oro at Night.",
  },
  {
    q: "Can I buy Alhambra tickets at the door?",
    a: "Only if any are left for that day, which is rare in spring, summer and autumn. Book online in advance.",
  },
  {
    q: "Why do resale tickets cost more than €22.27?",
    a: "€22.27 is the official face value. Resellers such as GetYourGuide add a booking fee, and tours add a guide. In return you often get tickets on dates the official allocation has sold out.",
  },
  {
    q: "Is the Alcazaba included right now?",
    a: "Yes. It reopened on 23 September 2026 on an adapted route after the August earthquakes, so some areas may still be closed off.",
  },
];
