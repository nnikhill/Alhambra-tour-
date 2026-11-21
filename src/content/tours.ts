// Guided tours page content. "From" prices are typical starting prices seen
// across booking sites in Nov 2026 (thebettervacation.com, hellotickets.com,
// headout.com, civitatis.com). Replace with exact GetYourGuide products.

export type TourType = {
  id: string;
  name: string;
  priceFrom: number;
  priceNote?: string;
  duration: string;
  group: string;
  nasrid: "day" | "night" | "no";
  bestFor: string;
  watchOut: string;
  query: string;
};

export const TOUR_TYPES: TourType[] = [
  {
    id: "group",
    name: "Group tour with Nasrid Palaces",
    priceFrom: 49,
    duration: "About 3 hours",
    group: "Larger groups",
    nasrid: "day",
    bestFor: "First visits on a budget",
    watchOut: "Groups can be big; you'll use a headset",
    query: "Alhambra guided tour Nasrid Palaces",
  },
  {
    id: "small",
    name: "Small-group tour",
    priceFrom: 69,
    duration: "About 3 hours",
    group: "Usually 15 or fewer",
    nasrid: "day",
    bestFor: "Couples and anyone who wants to ask questions",
    watchOut: "Sells out sooner than big-group tours",
    query: "Alhambra small group tour",
  },
  {
    id: "private",
    name: "Private tour",
    priceFrom: 250,
    priceNote: "price depends on group size",
    duration: "3–4 hours",
    group: "Just your party",
    nasrid: "day",
    bestFor: "Families, slow walkers, groups of 4+",
    watchOut: "Check whether tickets are included in the price",
    query: "Alhambra private tour",
  },
  {
    id: "night",
    name: "Night tour of the Nasrid Palaces",
    priceFrom: 49,
    duration: "1.5–2 hours",
    group: "Small to mid-size groups",
    nasrid: "night",
    bestFor: "Couples, photographers, a second visit",
    watchOut: "Palaces only; runs on set evenings",
    query: "Alhambra night tour Nasrid Palaces",
  },
  {
    id: "no-nasrid",
    name: "Gardens & Generalife tour",
    priceFrom: 36,
    duration: "About 2 hours",
    group: "Mid-size groups",
    nasrid: "no",
    bestFor: "Last-minute dates when palace tours are full",
    watchOut: "No Nasrid Palaces, and the Alcazaba is currently closed",
    query: "Alhambra Generalife guided tour",
  },
  {
    id: "daytrip",
    name: "Day trip from Seville or Málaga",
    priceFrom: 175,
    duration: "11–13 hours",
    group: "Coach groups",
    nasrid: "day",
    bestFor: "Visitors not staying in Granada",
    watchOut: "A long day with limited free time",
    query: "Alhambra day trip from Seville",
  },
];

export const WORTH_IT = {
  yes: [
    "The Nasrid Palaces have almost no signs. A guide explains what the carvings and inscriptions say",
    "Tickets are included, often on dates the official site shows sold out",
    "Your guide gets you to the palace entrance for your fixed time slot",
    "Most tours on GetYourGuide can be cancelled for free up to 24 hours before",
  ],
  no: [
    "It costs more than the €22.27 official ticket",
    "You move at the group's pace, not your own",
    "If you like to linger, the official audio guide works well",
  ],
};

export const CHECKLIST = [
  { title: "Entry ticket included?", text: "Some tours sell only the guide. Look for \"ticket included\" in the listing." },
  { title: "Nasrid Palaces included?", text: "The palaces are the highlight. Gardens-only tours are cheaper for a reason." },
  { title: "Group size", text: "Small-group tours cap numbers. Big groups use headsets and move slower." },
  { title: "Guide language", text: "Tours run in English, Spanish, French, German and Italian. Pick the language before you pay." },
  { title: "Meeting point", text: "Most meet near the ticket office at the top of the hill. Allow 20–30 minutes from the city centre." },
  { title: "Free cancellation", text: "Book a tour you can cancel up to 24 hours before, especially if your plans may change." },
];

export const TOUR_DAY = [
  { title: "Meet your guide at the entrance", text: "Usually near the ticket office. Bring the ID you booked with." },
  { title: "Palace of Charles V", text: "The Renaissance palace in the middle of the complex. Your guide sets the scene here." },
  { title: "Nasrid Palaces at your time slot", text: "The Mexuar, the Comares Palace and the Court of the Lions. This is the part the guide is worth most for." },
  { title: "Partal gardens", text: "Pools and towers along the walls, with views over the Albaicín." },
  { title: "Generalife", text: "The summer palace and its water gardens. Many tours end here, so you can stay on." },
];

export const TOURS_FAQ = [
  {
    q: "Is a guided tour of the Alhambra worth it?",
    a: "For a first visit, usually yes. The Nasrid Palaces have little signage, the complex is large, and a guide keeps you on time for your palace slot. Tours also include tickets, often on dates the official site has sold out.",
  },
  {
    q: "How long is an Alhambra guided tour?",
    a: "Most daytime tours with the Nasrid Palaces last about 3 hours. Night tours of the palaces take 1.5 to 2 hours. Day trips from Seville or Málaga take 11 to 13 hours including travel.",
  },
  {
    q: "How much does an Alhambra guided tour cost?",
    a: "Group tours with tickets start at around €49 per person, small-group tours around €69, and night tours around €49. Private tours start at about €250, depending on group size.",
  },
  {
    q: "Do guided tours include the Alhambra entry ticket?",
    a: "Most do, but not all. Check that the listing says the entry ticket is included, and that it includes the Nasrid Palaces.",
  },
  {
    q: "Which language are the tours in?",
    a: "English and Spanish tours run most often. French, German and Italian tours are also common. Choose the language when you book.",
  },
  {
    q: "Are tours affected by the Alcazaba closure?",
    a: "Tours still run. The Alcazaba fortress has been closed for inspections since the August 2026 earthquakes, so tours skip it until it reopens.",
  },
];
