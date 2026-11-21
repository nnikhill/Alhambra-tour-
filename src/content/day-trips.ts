// Day trip pages content (Seville, Málaga).
// Sources, Nov 2026: civitatis.com, andalucia.com, freetour.com, guruwalk.com,
// headout.com (Seville trips); tourscanner.com, expedia.com, spain.info
// (Málaga trips); thetrainline.com, rome2rio.com, everyrail.com (trains, buses).
// "From" prices are typical starting prices — replace with exact GetYourGuide
// products. Timelines are typical; each operator sets its own times.

export type StyleId = "coach" | "small" | "private" | "diy";

export type TripStyle = {
  id: StyleId;
  tab: string;
  name: string;
  price: string;
  priceNote?: string;
  length: string;
  group: string;
  timeline: [string, string][];
  query?: string;
};

export type City = {
  slug: "seville" | "malaga";
  name: string;
  path: string;
  facts: { value: string; label: string }[];
  intro: string;
  styles: TripStyle[];
  tourIf: string[];
  diyIf: string[];
  transport: { mode: string; time: string; detail: string }[];
  overnight: { title: string; text: string };
  extra?: { title: string; text: string };
  faq: { q: string; a: string }[];
  other: { name: string; path: string };
};

export const DAY_TRIP_CHECKLIST = [
  { title: "Nasrid Palaces included", text: "Some cheaper trips only cover the gardens. Look for “Nasrid Palaces” in what's included." },
  { title: "Bring the ID you booked with", text: "Alhambra tickets carry your name. No matching passport or ID can mean no entry." },
  { title: "Pick-up point and time", text: "Check whether it's a hotel pick-up or a fixed meeting point, and how early it is." },
  { title: "Return time", text: "Know when you're back. Cruise passengers: check it against your all-aboard time." },
  { title: "Lunch is usually extra", text: "Most trips don't include food. Budget roughly €15–20 for lunch in Granada." },
  { title: "Ignore the Alcazaba", text: "It has been closed since the August 2026 earthquakes, even if an itinerary still lists it." },
];

export const CITIES: Record<City["slug"], City> = {
  seville: {
    slug: "seville",
    name: "Seville",
    path: "/day-trips/from-seville/",
    facts: [
      { value: "250 km", label: "by road" },
      { value: "~3 h", label: "each way by coach" },
      { value: "12–13 h", label: "full day" },
      { value: "€175", label: "from, with ticket + guide" },
    ],
    intro: "It's a long day, but it works. Choose how you want to travel and see what the day looks like hour by hour.",
    styles: [
      {
        id: "coach",
        tab: "Coach tour",
        name: "Coach day trip with guide",
        price: "From €175",
        length: "12–13 hours",
        group: "Coach group",
        query: "Alhambra day trip from Seville",
        timeline: [
          ["07:00", "Pick-up in central Seville"],
          ["08:30", "Coffee stop on the motorway"],
          ["10:30", "Guided tour: Nasrid Palaces and Generalife, about 3 hours"],
          ["13:30", "Free time for lunch in Granada"],
          ["16:30", "Coach leaves Granada"],
          ["19:30", "Back in Seville"],
        ],
      },
      {
        id: "small",
        tab: "Small group",
        name: "Small-group minivan trip",
        price: "From €189",
        length: "10–12 hours",
        group: "Up to 8 people",
        query: "Alhambra small group day trip from Seville",
        timeline: [
          ["07:30", "Meet your driver in Seville"],
          ["10:15", "Arrive in Granada"],
          ["10:30", "Guided tour of the palaces and gardens"],
          ["13:30", "Lunch and time in the Albaicín"],
          ["16:30", "Drive back"],
          ["19:00", "Back in Seville"],
        ],
      },
      {
        id: "private",
        tab: "Private",
        name: "Private driver and guide",
        price: "From €250",
        priceNote: "per person for 2; less per person in bigger groups",
        length: "9–11 hours",
        group: "Just your party",
        query: "Alhambra private day trip from Seville",
        timeline: [
          ["08:00", "Pick-up at your hotel"],
          ["10:30", "Private guided tour, at your pace"],
          ["13:30", "Lunch wherever you like"],
          ["15:00", "Optional walk in the Albaicín"],
          ["16:30", "Drive back"],
          ["19:00", "Drop-off at your hotel"],
        ],
      },
      {
        id: "diy",
        tab: "On my own",
        name: "Train + your own ticket",
        price: "Train + €22.27 ticket",
        priceNote: "advance train fares from about €37 each way",
        length: "Your own pace",
        group: "Independent",
        timeline: [
          ["07:40", "First train from Seville (2 h 20 – 2 h 55)"],
          ["10:20", "Arrive in Granada, taxi or bus up the hill"],
          ["11:30", "Your timed Nasrid Palaces slot (book weeks ahead)"],
          ["14:30", "Lunch and a walk in the city"],
          ["20:28", "Last train back to Seville"],
        ],
      },
    ],
    tourIf: [
      "You don't have an Alhambra ticket yet. Tours hold their own allocation.",
      "You don't want to time a 2.5-hour train around a fixed palace entry slot.",
      "You want the guide, the ticket and the transport in one booking.",
    ],
    diyIf: [
      "You already have a General ticket with a late-morning slot.",
      "You'd rather stay a night in Granada, which we recommend from Seville.",
    ],
    transport: [
      { mode: "Train", time: "2 h 20 – 2 h 55", detail: "About 9 trains a day, first around 07:40" },
      { mode: "Car", time: "About 2 h 30", detail: "Toll-free A-92 motorway" },
      { mode: "Coach tour", time: "About 3 h", detail: "Includes a rest stop" },
    ],
    overnight: {
      title: "Day trip or one night in Granada?",
      text: "From Seville you'll spend 5–6 hours on the road. If you can, stay one night: see the palaces by day, then add the night visit or a sunset at the Mirador de San Nicolás.",
    },
    faq: [
      { q: "How far is the Alhambra from Seville?", a: "About 250 km by road. That's around 2.5–3 hours by coach or car, and 2 h 20 to 2 h 55 by train." },
      { q: "Can you do the Alhambra as a day trip from Seville?", a: "Yes. Most coach trips take 12–13 hours door to door, with about 3 hours inside the Alhambra and some free time in Granada." },
      { q: "How much is a day trip from Seville to the Alhambra?", a: "Coach trips with ticket and guide start at about €175 per person. Small-group minivan trips start around €189, and private trips cost more." },
      { q: "Is the Alhambra ticket included?", a: "On the trips we list, yes, including the Nasrid Palaces. Always check, because some cheaper trips only include the gardens." },
      { q: "Is the Alcazaba included?", a: "No. The Alcazaba has been closed since the August 2026 earthquakes. The Nasrid Palaces and the Generalife are open." },
      { q: "What should I bring?", a: "The passport or ID you booked with, comfortable shoes, water and money for lunch, which is usually not included." },
    ],
    other: { name: "Málaga", path: "/day-trips/from-malaga/" },
  },
  malaga: {
    slug: "malaga",
    name: "Málaga",
    path: "/day-trips/from-malaga/",
    facts: [
      { value: "125 km", label: "by road" },
      { value: "1.5–2 h", label: "each way" },
      { value: "9–11 h", label: "full day" },
      { value: "€99", label: "from, with ticket + guide" },
    ],
    intro: "Granada is close enough for an easy day out. Choose how you want to travel and see what the day looks like hour by hour.",
    styles: [
      {
        id: "coach",
        tab: "Coach tour",
        name: "Coach day trip with guide",
        price: "From €99",
        length: "10–11 hours",
        group: "Coach group",
        query: "Alhambra day trip from Malaga",
        timeline: [
          ["08:00", "Pick-up in Málaga (Costa del Sol pick-ups earlier)"],
          ["09:45", "Arrive in Granada"],
          ["10:00", "Guided tour: Nasrid Palaces and Generalife, 2–3 hours"],
          ["13:00", "Free time for lunch in Granada"],
          ["16:30", "Coach leaves Granada"],
          ["18:30", "Back in Málaga"],
        ],
      },
      {
        id: "small",
        tab: "Small group",
        name: "Small-group trip",
        price: "From €130",
        length: "9–10 hours",
        group: "Usually 8–12 people",
        query: "Alhambra small group tour from Malaga",
        timeline: [
          ["08:30", "Meet in central Málaga"],
          ["10:15", "Arrive in Granada"],
          ["10:30", "Guided tour of the palaces and gardens"],
          ["13:30", "Lunch and time in the Albaicín"],
          ["16:30", "Drive back"],
          ["18:15", "Back in Málaga"],
        ],
      },
      {
        id: "private",
        tab: "Private",
        name: "Private driver and guide",
        price: "From €210",
        priceNote: "per person, minimum 2",
        length: "7–9 hours",
        group: "Just your party",
        query: "Alhambra private day trip from Malaga",
        timeline: [
          ["08:30", "Pick-up at your hotel or the cruise port"],
          ["10:15", "Private guided tour, at your pace"],
          ["13:15", "Lunch wherever you like"],
          ["14:30", "Optional walk in the Albaicín"],
          ["15:30", "Drive back"],
          ["17:15", "Drop-off"],
        ],
      },
      {
        id: "diy",
        tab: "On my own",
        name: "Train or bus + your own ticket",
        price: "Bus or train + €22.27 ticket",
        priceNote: "bus €13–28 each way; train from about €23",
        length: "Your own pace",
        group: "Independent",
        timeline: [
          ["08:00", "ALSA bus from Málaga (about 1 h 45, hourly)"],
          ["09:45", "Arrive in Granada, taxi or bus up the hill"],
          ["10:30", "Your timed Nasrid Palaces slot (book weeks ahead)"],
          ["13:30", "Lunch and a walk in the city"],
          ["17:00", "Bus or direct Avant train back (about 1 h 20)"],
        ],
      },
    ],
    tourIf: [
      "You don't have an Alhambra ticket yet. Tours hold their own allocation.",
      "You're arriving by cruise ship and need a guaranteed return time.",
      "You're staying on the Costa del Sol and want a pick-up near your hotel.",
    ],
    diyIf: [
      "You already have a ticket with a timed slot that fits the bus or train.",
      "You want to stay in Granada for the evening or overnight.",
    ],
    transport: [
      { mode: "Train", time: "About 1 h 20", detail: "Direct Renfe Avant, about 3 a day" },
      { mode: "Bus", time: "About 1 h 45", detail: "ALSA, roughly hourly, €13–28" },
      { mode: "Car", time: "About 1 h 30", detail: "Toll-free A-92 motorway" },
    ],
    overnight: {
      title: "A day trip from Málaga works well",
      text: "At under two hours each way you get a full morning in the palaces and time in the city. Stay overnight only if you want the night visit too.",
    },
    extra: {
      title: "Coming in on a cruise ship?",
      text: "Private trips from Málaga port take about 7 hours. Book one with a set return time, and check it against your all-aboard time, not the departure time.",
    },
    faq: [
      { q: "How far is the Alhambra from Málaga?", a: "About 125 km. It takes around 1.5–2 hours by coach or car, about 1 h 20 on the direct train and about 1 h 45 by bus." },
      { q: "Can you do the Alhambra as a day trip from Málaga?", a: "Yes, easily. Most coach trips take 10–11 hours including about 2–3 hours inside the Alhambra and free time in Granada." },
      { q: "How much is a day trip from Málaga to the Alhambra?", a: "Coach trips with ticket and guide start around €99 per person, small-group trips around €130, and private trips from about €210 per person for two." },
      { q: "Can I do it from the Málaga cruise port?", a: "Yes. Private trips can pick you up at the port and take about 7 hours. Check the return time against your all-aboard time." },
      { q: "Are there trips from the Costa del Sol?", a: "Yes. Many trips also pick up in Torremolinos, Benalmádena and Marbella. Expect an earlier start and a longer day." },
      { q: "Is the Alcazaba included?", a: "No. The Alcazaba has been closed since the August 2026 earthquakes. The Nasrid Palaces and the Generalife are open." },
    ],
    other: { name: "Seville", path: "/day-trips/from-seville/" },
  },
};
