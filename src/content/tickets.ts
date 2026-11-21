// Ticket-page content. Coverage reflects the official ticket descriptions;
// the Alcazaba and the Andalusi (Albaicín) monuments have been closed since the
// August 2026 earthquakes, so coverage notes say so.

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
    text: "Same official site. Experiences gives you the palaces at night and the gardens next day; Dobla de Oro adds Albaicín monuments to a daytime visit. Both often outlast the General ticket.",
  },
  {
    title: "Book a guided tour with tickets included",
    text: "Licensed operators hold 39% of the yearly tickets, so tours often have space when the official site shows sold out. It costs more because a guide is included.",
  },
  {
    title: "Try the official site again at midnight",
    text: "Cancelled tickets are released back on the official site. Checking just after midnight Spanish time gives you the best chance.",
  },
  {
    title: "Settle for the gardens",
    text: "The Gardens & Generalife ticket skips the Nasrid Palaces but sells out much later. Pair it with a night visit to the palaces if one is free.",
  },
];

export const HOW_TO_BOOK = [
  { title: "Go to tickets.alhambra-patronato.es", text: "The only official ticket site. Lookalike sites resell at a mark-up." },
  { title: "Choose Alhambra General", text: "Pick the date first; greyed-out dates are sold out." },
  { title: "Pick your Nasrid Palaces time", text: "A 30-minute slot. Choose one at least an hour after you plan to arrive." },
  { title: "Enter each visitor's name and ID number", text: "Tickets are personal. Children under 12 go free but still need a ticket." },
  { title: "Pay and save the PDF", text: "Tickets are non-refundable. Bring the same passport or ID you booked with." },
];

export const TICKETS_FAQ = [
  {
    q: "Which Alhambra ticket should I buy?",
    a: "For a first visit, buy the Alhambra General ticket. It is the only standard ticket that includes the Nasrid Palaces by day, plus the Generalife and gardens. If it is sold out for your date, look at Alhambra Experiences or Dobla de Oro next.",
  },
  {
    q: "How much are Alhambra tickets in 2026?",
    a: "The General ticket costs €22.27 for adults when booked online. Night visits to the Nasrid Palaces cost €12.73, and the gardens-only ticket €12.73. Children under 12 go free.",
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
    q: "Are tickets cheaper on the official site?",
    a: "Yes. The official site sells at face value. Tour operators and resellers charge more because they include a guide, free cancellation or a ticket on dates the official site has sold out.",
  },
  {
    q: "Is the Alcazaba included right now?",
    a: "Tickets that list the Alcazaba still include it on paper, but it has been closed for safety inspections since the August 2026 earthquakes. Check the status before you go.",
  },
];
