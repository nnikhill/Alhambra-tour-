// Night visit page content.
// Schedule: alhambra-patronato.es (Nasrid Palaces night visit page) and
// alhambradegranada.org/en/info/openingtimes.asp, checked Nov 2026.
// Guided night tour "from" price: thebettervacation.com (€48 shared tour).

export type NightSeason = {
  id: "summer" | "winter";
  label: string;
  range: string;
  days: number[]; // 0 = Sunday … 6 = Saturday
  daysLabel: string;
  time: string;
  ticketOffice: string;
};

export const NIGHT_SEASONS: Record<NightSeason["id"], NightSeason> = {
  summer: {
    id: "summer",
    label: "Summer schedule",
    range: "1 April – 14 October",
    days: [2, 3, 4, 5, 6],
    daysLabel: "Tuesday to Saturday",
    time: "22:00 – 23:30",
    ticketOffice: "21:00 – 22:45",
  },
  winter: {
    id: "winter",
    label: "Winter schedule",
    range: "15 October – 31 March",
    days: [5, 6],
    daysLabel: "Friday and Saturday",
    time: "20:00 – 21:30",
    ticketOffice: "19:00 – 20:45",
  },
};

export function seasonFor(d: Date): NightSeason {
  const md = (d.getMonth() + 1) * 100 + d.getDate();
  return md >= 401 && md <= 1014 ? NIGHT_SEASONS.summer : NIGHT_SEASONS.winter;
}

export function runsOn(d: Date) {
  return seasonFor(d).days.includes(d.getDay());
}

export const NIGHT_GUIDED_FROM = 49;
export const NIGHT_QUERY = "Alhambra night tour Nasrid Palaces";

export const DAY_VS_NIGHT: { label: string; day: string; night: string }[] = [
  { label: "Nasrid Palaces", day: "Yes", night: "Yes, lit after dark" },
  { label: "Generalife gardens", day: "Yes", night: "No (separate night ticket)" },
  { label: "Alcazaba fortress", day: "Closed since Aug 2026", night: "No" },
  { label: "Time inside", day: "About 3 hours", night: "About 1.5 hours" },
  { label: "Official price", day: "€22.27", night: "€12.73" },
  { label: "Runs", day: "Every day", night: "2–5 nights a week" },
];

export type NightOption = {
  id: string;
  title: string;
  price: string;
  text: string;
  points: string[];
  featured?: boolean;
  cta: { label: string; kind: "gyg" | "official" };
};

export const NIGHT_OPTIONS: NightOption[] = [
  {
    id: "guided",
    title: "Guided night tour",
    price: `From €${NIGHT_GUIDED_FROM}`,
    text: "A licensed guide walks you through the palaces and explains what you're seeing in the dark.",
    points: ["Night ticket included", "Often available when the official site is sold out", "Free cancellation on most tours"],
    featured: true,
    cta: { label: "See night tours", kind: "gyg" },
  },
  {
    id: "ticket",
    title: "Official night ticket",
    price: "€12.73",
    text: "The cheapest way in. You walk the palaces on your own at your booked time.",
    points: ["Nasrid Palaces only", "No changes or refunds", "Sells out fast on weekends"],
    cta: { label: "Official ticket site", kind: "official" },
  },
  {
    id: "experiences",
    title: "Alhambra Experiences",
    price: "€22.27",
    text: "Palaces at night, then the Generalife and gardens by day the next morning.",
    points: ["Night + day on one ticket", "Best if you're in Granada 2 days", "Same official site"],
    cta: { label: "Official ticket site", kind: "official" },
  },
];

export const NIGHT_PLAN: { title: string; text: string }[] = [
  { title: "Pick a night it runs", text: "In winter that's only Friday and Saturday, so check your dates with the tool above before you plan dinner." },
  { title: "Book a ticket or a guided tour", text: "Night tickets go fast on weekends. If the official site shows nothing, a guided night tour usually still has places." },
  { title: "Arrive 30 minutes early", text: "Bring the passport or ID you booked with. Your entry time is printed on the ticket and late arrivals can be refused." },
  { title: "Walk the palaces in the dark", text: "Mexuar, the Comares Palace and the Court of the Myrtles, then the Court of the Lions. No flash, please. It spoils the lighting for everyone." },
  { title: "See it lit up from across the valley", text: "Afterwards, head over to the Mirador de San Nicolás in the Albaicín for the classic view of the Alhambra glowing on its hill." },
];

export const NIGHT_FAQ = [
  {
    q: "What days does the Alhambra night visit run?",
    a: "From 1 April to 14 October the Nasrid Palaces night visit runs Tuesday to Saturday, 22:00 to 23:30. From 15 October to 31 March it runs only on Friday and Saturday, 20:00 to 21:30.",
  },
  {
    q: "How much is the Alhambra night visit?",
    a: "The official Nasrid Palaces night ticket costs €12.73. Guided night tours with the ticket included start at around €49 per person.",
  },
  {
    q: "What do you see on the night visit?",
    a: "The Nasrid Palaces: the Mexuar, the Comares Palace, the Palace of the Lions and the Lindaraja corridor. The Generalife has its own separate night visit, and the Alcazaba is not part of either.",
  },
  {
    q: "Is the Alhambra night visit worth it?",
    a: "Yes, if you have already seen it by day or you're in Granada for two days. It's shorter, cheaper and calmer. If it's your only visit, go by day so you also see the gardens.",
  },
  {
    q: "Can I visit the Alhambra by day and by night on one ticket?",
    a: "Yes. The Alhambra Experiences ticket (€22.27) gives you the Nasrid Palaces at night and the Generalife and gardens by day the following day.",
  },
  {
    q: "Can I take photos at night?",
    a: "Yes, but the Alhambra asks visitors not to use flash, because it dazzles other people and spoils the lighting.",
  },
];
