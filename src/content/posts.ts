// Blog posts. Phase 2: these move to the `pages` table (type = post) and are
// written in the admin. The shape here matches what the admin editor will save.
//
// Inline text supports [link text](/path) and **bold**.
//
// SEO + interlinking rules every post follows:
//  1. One primary keyword, in the title, the first paragraph and one H2.
//  2. A "Short answer" block first, written to win the featured snippet.
//  3. Links up to the pillar (/plan/) and across to the money pages
//     (/tickets/, /tours/, /tickets/sold-out/, /tickets/night-visit/) with
//     descriptive anchor text, plus at least one sibling post.
//  4. An FAQ at the end (FAQPage schema) for People Also Ask.
//
// Sources, Nov 2026: alhambradegranada.org (Aug 2026 earthquake report,
// opening times); alhambra-patronato.es (300 people per half hour, visit
// rules); headout.com and civitatis.com (season, time of day, summer heat,
// Nov–Feb quieter); earthtrekkers.com (Nasrid Palaces 45 min–1.5 h);
// adventurousmiriam.com (Generalife and Alcazaba times, ~3.5 km walked);
// lovegranada.com (3–5 hours for the whole complex).

import type { Photo } from "./photos";
import { PHOTOS } from "./photos";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "answer"; text: string }
  | { type: "tip"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "cta"; title: string; text: string; label: string; query?: string; href?: string };

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  category: "Planning" | "Tips" | "News";
  photo: Photo;
  published: string;
  updated: string;
  readMins: number;
  featured?: boolean;
  body: Block[];
  faq: { q: string; a: string }[];
};

export const POSTS: Post[] = [
  {
    slug: "best-time-to-visit-the-alhambra",
    title: "The best time to visit the Alhambra",
    seoTitle: "Best Time to Visit the Alhambra (Season, Day & Hour) 2026",
    excerpt: "Spring is the classic answer, but the time printed on your ticket matters more than the month. Here's how to choose both.",
    category: "Planning",
    photo: PHOTOS.myrtles,
    published: "2026-11-21",
    updated: "2026-11-21",
    readMins: 6,
    featured: true,
    body: [
      { type: "answer", text: "The best time to visit the Alhambra is spring (April to June) or autumn (September and October), on a weekday, with the first Nasrid Palaces slot of the morning. In summer, go early or go at night." },
      { type: "p", text: "Ask ten people and nine will say \"spring\". They're not wrong. But after the season, the thing that shapes your visit most is the time printed on your ticket, because the Nasrid Palaces only let you in during a fixed half-hour slot. Get the season and the slot right and the Alhambra feels calm, even on a busy day." },
      { type: "h2", id: "at-a-glance", text: "The seasons at a glance" },
      { type: "table", head: ["Season", "Weather", "Crowds", "Book ahead"], rows: [
        ["Spring (Apr–Jun)", "Mild, gardens in bloom", "Busiest", "Several weeks"],
        ["Summer (Jul–Aug)", "Very hot, often 35°C+", "Busy", "Weeks"],
        ["Autumn (Sep–Oct)", "Warm, some rain in Oct", "Busy", "A few weeks"],
        ["Winter (Nov–Mar)", "Cool, short days", "Quietest", "A few days"],
      ] },
      { type: "h2", id: "best-season", text: "Best season to visit the Alhambra" },
      { type: "h3", text: "Spring: the prettiest, and the busiest" },
      { type: "p", text: "From April the **Generalife gardens** are in full bloom and the weather is ideal for walking. That's exactly why everyone comes then. Palace slots for spring weekends can sell out weeks ahead, so book as soon as your dates are fixed." },
      { type: "h3", text: "Summer: go early or go at night" },
      { type: "p", text: "Midday heat in Granada regularly passes 35°C, and most of the visit is outdoors. Take the 8:30 slot, carry water, and save the hottest hours for a long lunch. Or skip the heat entirely with the [Alhambra night visit](/tickets/night-visit/), which runs Tuesday to Saturday in summer." },
      { type: "h3", text: "Autumn: our favourite" },
      { type: "p", text: "Warm days, softer light on the stucco, and a little more room to breathe than in spring. **Late September** is the sweet spot. October is lovely too, but it can bring rain." },
      { type: "h3", text: "Winter: the quiet season" },
      { type: "p", text: "From November to February visitor numbers drop noticeably. Days are cool and the gardens are bare, but the palaces are just as beautiful, and you'll often find tickets a few days out. Hours are shorter (8:30 to 18:00) and night visits only run on Friday and Saturday." },
      { type: "h2", id: "time-of-day", text: "Best time of day" },
      { type: "p", text: "The Nasrid Palaces admit 300 people every half hour, so they never get truly packed. The rest of the complex is different: tour groups and the heat both peak around midday." },
      { type: "list", items: [
        "**8:30, the first slot:** the calmest palaces and the coolest gardens. Worth the early alarm.",
        "**Late afternoon:** thinner crowds and long shadows that make the carvings stand out.",
        "**Midday (12:00–15:00):** the busiest and hottest. Avoid it if you can choose.",
      ] },
      { type: "tip", title: "Plan around your slot, not the opening time", text: "With a morning slot, see the palaces first and walk up to the Generalife after. With an afternoon slot, do the gardens first. Our [visit planner](/plan/) works out the timings for you." },
      { type: "h2", id: "day-of-week", text: "Best day of the week" },
      { type: "p", text: "Weekdays are calmer than weekends, when Spanish visitors add to the crowds. If your dates are flexible, **Tuesday to Thursday** is the safest choice." },
      { type: "cta", title: "Your ideal slot already gone?", text: "Licensed tour operators hold their own tickets, so guided tours often have morning places when the official site shows sold out.", label: "Check tours for your date", query: "Alhambra guided tour Nasrid Palaces" },
      { type: "h2", id: "sold-out", text: "What if the dates you want are sold out?" },
      { type: "p", text: "It happens a lot in spring. Don't give up on your dates. Try a [guided tour with tickets included](/tours/), switch to a different [ticket type](/tickets/) that sells out later, or follow our step-by-step plan for when [Alhambra tickets are sold out](/tickets/sold-out/)." },
      { type: "p", text: "Still deciding how long to set aside? Read [how long you need at the Alhambra](/blog/how-long-do-you-need-at-the-alhambra/)." },
    ],
    faq: [
      { q: "What is the best month to visit the Alhambra?", a: "May and late September are the best balance of good weather and gardens. April to June is the most popular period, so book well ahead." },
      { q: "What is the best time of day to visit the Alhambra?", a: "The first slot at 8:30 on a weekday. It's the coolest and calmest time. Midday is the busiest and hottest." },
      { q: "Is the Alhambra worth visiting in winter?", a: "Yes. It's the quietest time of year and tickets are easier to get. The gardens are bare, but the Nasrid Palaces are just as impressive." },
    ],
  },
  {
    slug: "how-long-do-you-need-at-the-alhambra",
    title: "How long do you need at the Alhambra?",
    seoTitle: "How Long Do You Need at the Alhambra? Realistic Timings (2026)",
    excerpt: "Most visitors spend about three hours. Here's how that time splits between the palaces, the gardens and the long walk in between.",
    category: "Tips",
    photo: PHOTOS.lions,
    published: "2026-11-21",
    updated: "2026-11-21",
    readMins: 5,
    body: [
      { type: "answer", text: "You need about 3 hours at the Alhambra to see the Nasrid Palaces, the Generalife and the gardens. Allow 4 to 5 hours if you like to take your time, and about 1.5 hours if you only do the palaces." },
      { type: "p", text: "The Alhambra is bigger than most people expect. It's not one building but a hilltop of palaces, gardens and walkways, and you'll cover around 3.5 km on foot. Here's how long you need at the Alhambra, part by part, so you can plan the rest of your day in Granada." },
      { type: "h2", id: "by-area", text: "How long each part takes" },
      { type: "table", head: ["Area", "Time", "Notes"], rows: [
        ["Nasrid Palaces", "45 min – 1.5 h", "Fixed entry time. The highlight."],
        ["Generalife and gardens", "30 – 45 min", "Uphill walk from the palaces"],
        ["Charles V Palace and Partal", "About 30 min", "Free to walk around"],
        ["Walking between areas", "20 – 30 min", "Around 3.5 km in total"],
        ["Alcazaba", "Closed", "Since the Aug 2026 earthquakes"],
      ] },
      { type: "h2", id: "itineraries", text: "Three ways to plan your time" },
      { type: "h3", text: "1.5 hours: palaces only" },
      { type: "p", text: "Short on time? Book the [night visit](/tickets/night-visit/). It covers just the Nasrid Palaces, which is what most people come for, and it's quieter and cheaper than a day ticket." },
      { type: "h3", text: "3 hours: the classic visit" },
      { type: "p", text: "Palaces, Charles V Palace, the Partal gardens and the Generalife. This is what the General ticket and most [guided tours](/tours/) cover, and it's the right amount of time for a first visit." },
      { type: "h3", text: "Half a day: at your own pace" },
      { type: "p", text: "Add time for photos, a coffee break and the walk back down through the woods. Leave the afternoon for the Albaicín and sunset at the Mirador de San Nicolás." },
      { type: "tip", title: "Don't be late for the palaces", text: "Your ticket is valid all day, but the Nasrid Palaces only at the time printed on it. If you miss the slot, you won't be let in. Aim to be at their entrance 30 minutes early." },
      { type: "h2", id: "order", text: "Which order to see it in" },
      { type: "p", text: "It depends on your palace time. With a **morning slot**, start with the palaces and walk up to the Generalife afterwards. With an **afternoon slot**, see the Generalife first and finish in the palaces. Enter your slot in our [Alhambra visit planner](/plan/) and it lays out the whole day, including how long it takes to get up the hill." },
      { type: "cta", title: "Want the timing done for you?", text: "On a guided tour the guide knows the route and the slot, so you see everything in about 3 hours without watching the clock.", label: "See guided tours", query: "Alhambra guided tour Nasrid Palaces" },
      { type: "h2", id: "save-time", text: "How to save time" },
      { type: "list", items: [
        "Have your passport and QR code ready at the entrance.",
        "Take the C30 or C32 minibus up instead of walking if your slot is early.",
        "Visit on a weekday morning, when there are fewer groups. See [the best time to visit the Alhambra](/blog/best-time-to-visit-the-alhambra/).",
      ] },
    ],
    faq: [
      { q: "Is 2 hours enough for the Alhambra?", a: "Just about, if you focus on the Nasrid Palaces and walk quickly through the Generalife. Three hours is more comfortable." },
      { q: "How long is the Nasrid Palaces visit?", a: "Between 45 minutes and 1.5 hours. You must enter during the half-hour slot printed on your ticket." },
      { q: "How long is a guided tour of the Alhambra?", a: "Most guided tours last about 3 hours and cover the Nasrid Palaces, the Generalife and the gardens." },
    ],
  },
  {
    slug: "alhambra-after-the-2026-earthquakes",
    title: "Is the Alhambra open after the August 2026 earthquakes?",
    seoTitle: "Is the Alhambra Open? What's Closed After the 2026 Earthquakes",
    excerpt: "The palaces and gardens reopened the next day. The Alcazaba is still closed. Here's what that means for your visit and your ticket.",
    category: "News",
    photo: PHOTOS.hero,
    published: "2026-11-21",
    updated: "2026-11-21",
    readMins: 3,
    body: [
      { type: "answer", text: "Yes, the Alhambra is open. The Nasrid Palaces and the Generalife reopened on 19 August 2026. The Alcazaba fortress has been closed since 18 August 2026 and stays closed until further notice." },
      { type: "h2", id: "what-happened", text: "What happened" },
      { type: "p", text: "On 18 August 2026 a magnitude 4.8 earthquake struck near Granada, followed by smaller tremors. Staff helped visitors out and the whole complex closed that afternoon for safety inspections." },
      { type: "p", text: "It reopened the next morning at its usual hours. Inspectors found no significant structural damage in the Nasrid Palaces or the Alcazaba, only minor damage such as fallen plasterwork in the Throne Room and chipped battlements." },
      { type: "h2", id: "open-closed", text: "What's open and what's closed" },
      { type: "table", head: ["Area", "Status"], rows: [
        ["Nasrid Palaces", "Open, on a slightly changed route"],
        ["Generalife and gardens", "Open, on a set route"],
        ["Charles V Palace and Partal", "Open"],
        ["Alcazaba", "Closed until further notice"],
        ["Andalusi monuments (Albaicín)", "Closed for inspection in August; check before you go"],
      ] },
      { type: "h2", id: "tickets", text: "Does it change which ticket to buy?" },
      { type: "p", text: "Not really. The Nasrid Palaces were always the main event, and they're open. The **General ticket** and [guided tours with tickets](/tours/) still cover everything that's open. If you're looking at a Dobla de Oro ticket, check first whether the Albaicín monuments it includes have reopened. Our [Alhambra ticket comparison](/tickets/) shows what each ticket includes." },
      { type: "cta", title: "Palaces open, tickets still selling fast", text: "If the official site is sold out for your date, tours with tickets included often still have space.", label: "Check availability", query: "Alhambra guided tour Nasrid Palaces" },
      { type: "h2", id: "before-you-go", text: "Before you go" },
      { type: "list", items: [
        "Follow staff instructions. Routes inside may be adjusted.",
        "Check the official ticket site or @alhambracultura on X for updates on the day.",
        "Plan about 3 hours. With the Alcazaba closed, the visit is slightly shorter. See [how long you need at the Alhambra](/blog/how-long-do-you-need-at-the-alhambra/).",
      ] },
      { type: "p", text: "We check the official channels regularly and update this page when anything changes. For opening hours, transport and the rules at the gate, see our guide to [planning your Alhambra visit](/plan/)." },
    ],
    faq: [
      { q: "Is the Alhambra open now?", a: "Yes. The Nasrid Palaces, the Generalife and the gardens are open at their usual hours. Only the Alcazaba is closed." },
      { q: "Was the Alhambra damaged in the earthquake?", a: "Only minor, non-structural damage was found, such as fallen plasterwork and chipped battlements. No significant structural damage was reported." },
      { q: "Is the Alcazaba open?", a: "No. It has been closed since 18 August 2026 while inspections continue." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
