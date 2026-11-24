// Single source of truth for prices, rules and statuses.
// Phase 2: these move to the `facts` table and are edited in the admin.
// Every value carries the date it was last checked against a source.

export const LAST_CHECKED = "2026-11-24";

export type SiteStatus = {
  area: string;
  state: "open" | "closed" | "limited";
  note: string;
  since?: string;
  source: string;
};

const OFFICIAL_TICKETS_PAGE = "https://tickets.alhambra-patronato.es/en/";

export const STATUS: SiteStatus[] = [
  { area: "Nasrid Palaces", state: "open", note: "Open, entry at the time on your ticket. Side rooms of the Hall of the Boat temporarily closed", source: OFFICIAL_TICKETS_PAGE },
  {
    area: "Alcazaba",
    state: "limited",
    note: "Reopened 23 Sep 2026 on an adapted route after the August earthquakes; Torre de la Vela still closed",
    since: "2026-09-23",
    source: OFFICIAL_TICKETS_PAGE,
  },
  { area: "Generalife & gardens", state: "open", note: "Open as normal", source: OFFICIAL_TICKETS_PAGE },
]

export type OfficialTicket = {
  slug: string;
  name: string;
  price: number; // EUR, adult, online
  nasrid: "day" | "night" | "none";
  includes: string;
  when: "Day" | "Night" | "Day + night";
  sellsOut: "Fastest" | "Fast" | "Slower";
  bestFor: string;
};

// Prices: official price list, alhambra-patronato.es/en?p=13635 (checked 24 Nov 2026).
export const OFFICIAL_TICKETS: OfficialTicket[] = [
  {
    slug: "general",
    name: "Alhambra General",
    price: 22.27,
    nasrid: "day",
    includes: "Nasrid Palaces, Generalife, gardens, Partal",
    when: "Day",
    sellsOut: "Fastest",
    bestFor: "First visit, the full experience",
  },
  {
    slug: "alhambra-experiences",
    name: "Alhambra Experiences",
    price: 22.27,
    nasrid: "night",
    includes: "Nasrid Palaces at night, gardens and Generalife next day",
    when: "Day + night",
    sellsOut: "Fast",
    bestFor: "When General is gone and you have 2 days",
  },
  {
    slug: "dobla-de-oro",
    name: "Dobla de Oro General",
    price: 30.48,
    nasrid: "day",
    includes: "General ticket plus the Andalusi monuments in the Albaicín",
    when: "Day",
    sellsOut: "Fast",
    bestFor: "A backup with daytime palace entry",
  },
  {
    slug: "rodriguez-acosta",
    name: "Alhambra + Rodríguez-Acosta",
    price: 25.45,
    nasrid: "day",
    includes: "General ticket plus the Rodríguez-Acosta Foundation",
    when: "Day",
    sellsOut: "Slower",
    bestFor: "Art lovers, another daytime backup",
  },
  {
    slug: "night-nasrid",
    name: "Night visit: Nasrid Palaces",
    price: 12.73,
    nasrid: "night",
    includes: "Nasrid Palaces lit at night",
    when: "Night",
    sellsOut: "Fast",
    bestFor: "Couples, photographers, a second visit",
  },
  {
    slug: "dobla-de-oro-night",
    name: "Dobla de Oro at Night",
    price: 23.06,
    nasrid: "night",
    includes: "Nasrid Palaces at night plus Andalusi monuments by day",
    when: "Day + night",
    sellsOut: "Slower",
    bestFor: "Night visit with more of Granada",
  },
  {
    slug: "gardens-generalife",
    name: "Gardens & Generalife",
    price: 12.73,
    nasrid: "none",
    includes: "Generalife palace and gardens, no Nasrid Palaces",
    when: "Day",
    sellsOut: "Slower",
    bestFor: "Gardens only, or a last resort",
  },
  {
    slug: "generalife-night",
    name: "Night visit: Generalife",
    price: 8.48,
    nasrid: "none",
    includes: "Generalife gardens lit at night",
    when: "Night",
    sellsOut: "Slower",
    bestFor: "A short evening walk",
  },
];

// Only facts confirmed on the official site. (Daily capacity, people per slot
// and the operators' share were removed: no official source found.)
export const KEY_FACTS = {
  generalPrice: 22.27,
}

