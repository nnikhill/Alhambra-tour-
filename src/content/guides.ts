// Evergreen guide pages rendered by <GuideArticle>.
// Every fact here was checked on 21–24 Nov 2026 against the sources listed on
// each guide. Official = alhambra-patronato.es and tickets.alhambra-patronato.es.
// Block syntax is the same as posts.ts: [text](/path) and **bold**.

import type { Block } from "./posts";
import type { Photo } from "./photos";
import { PHOTOS } from "./photos";

export type Guide = {
  path: string;
  pageId: string; // used in the affiliate sub_id
  crumbs: { href: string; label: string }[];
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  photo: Photo;
  updated: string;
  body: Block[];
  faq: { q: string; a: string }[];
  sidebar: { title: string; text: string; label: string; product: string };
  next: { href: string; title: string; text: string }[];
  sources: { label: string; url: string }[];
  schema?: Record<string, unknown>[]; // extra JSON-LD for this page
  ogImage?: string; // 1200x630 share image
};

const CHECKED = "2026-11-24";

const OFFICIAL_HOURS = { label: "Opening hours & prices, Patronato de la Alhambra y Generalife", url: "https://www.alhambra-patronato.es/en?p=13635" };
const OFFICIAL_TICKETS = { label: "Official ticket shop and visit rules, tickets.alhambra-patronato.es", url: "https://tickets.alhambra-patronato.es/en/" };
const OFFICIAL_FAQ = { label: "Visitor FAQ (buses, parking, accessibility), alhambra-patronato.es", url: "https://www.alhambra-patronato.es/en?p=13621" };

// ---------------------------------------------------------------------------
// /plan/opening-hours/  · primary keyword: "alhambra opening hours"
// ---------------------------------------------------------------------------
export const OPENING_HOURS: Guide = {
  path: "/plan/opening-hours/",
  ogImage: "/images/og/og-opening-hours.jpg",
  pageId: "hours",
  crumbs: [{ href: "/", label: "Home" }, { href: "/plan/", label: "Plan your visit" }, { href: "/plan/opening-hours/", label: "Opening hours" }],
  title: "Alhambra opening hours 2026",
  seoTitle: "Alhambra Opening Hours 2026: Day, Night & Closed Days",
  description: "Alhambra opening hours 2026: 8:30–18:00 in winter, 8:30–20:00 in summer, night visit days and times, ticket office hours and the two closed days.",
  intro: "The times for day visits, night visits and the ticket office, season by season, plus the one rule that matters more than any of them: your Nasrid Palaces time.",
  photo: PHOTOS.myrtles,
  updated: CHECKED,
  body: [
    { type: "answer", text: "The Alhambra opens every day at 8:30. From 15 October to 31 March it closes at 18:00; from 1 April to 14 October it closes at 20:00. Night visits to the Nasrid Palaces run Friday and Saturday 20:00–21:30 in winter and Tuesday to Saturday 22:00–23:30 in summer. It is closed on 25 December and 1 January." },
    { type: "h2", id: "day", text: "Alhambra opening hours for day visits" },
    { type: "p", text: "Day hours cover the whole monument: the Nasrid Palaces, the Alcazaba, the Generalife and gardens, the Palace of Charles V and the Bath of the Mosque." },
    { type: "table", head: ["Season", "Open", "Ticket office"], rows: [
      ["15 Oct – 31 Mar", "Every day, 08:30 – 18:00", "08:00 – 18:00"],
      ["1 Apr – 14 Oct", "Every day, 08:30 – 20:00", "08:00 – 20:00"],
    ] },
    { type: "tip", title: "Your ticket is for the day. The palaces are for one half hour.", text: "You can walk the gardens and the Alcazaba any time the monument is open, but the official rules say the Nasrid Palaces visit can only take place at the time printed on your ticket. Arrive late and you lose it. See [how the Nasrid Palaces entry time works](/tickets/nasrid-palaces/)." },
    { type: "h2", id: "night", text: "Night visit opening hours" },
    { type: "p", text: "There are two separate night visits with separate tickets. The Nasrid Palaces night visit does not include the Generalife, and the Generalife night visit does not include the palaces." },
    { type: "table", head: ["Night visit", "Season", "Days and times", "Ticket office"], rows: [
      ["Nasrid Palaces", "15 Oct – 31 Mar", "Fri & Sat, 20:00 – 21:30", "19:00 – 20:45"],
      ["Nasrid Palaces", "1 Apr – 14 Oct", "Tue – Sat, 22:00 – 23:30", "21:00 – 22:45"],
      ["Gardens & Generalife", "1 Apr – 31 May and 1 Sep – 14 Oct", "Tue – Sat, 22:00 – 23:30", "21:00 – 22:45"],
      ["Gardens & Generalife", "15 Oct – 14 Nov", "Fri & Sat, 20:00 – 21:30", "19:00 – 20:45"],
    ] },
    { type: "p", text: "The official timetable lists no Generalife night visits from June to August or from mid-November to March. For which night ticket to choose, read our [Alhambra night visit guide](/tickets/night-visit/)." },
    { type: "h2", id: "closed", text: "When is the Alhambra closed?" },
    { type: "list", items: [
      "**25 December and 1 January:** the monument and the Albaicín's Andalusian monuments are closed.",
      "**After the August 2026 earthquakes:** the Alcazaba was closed for inspections. The official ticket site says it reopened from 23 September 2026 with a route adapted to safety requirements, and that routes can still change.",
    ] },
    { type: "h2", id: "other", text: "Hours for the other Alhambra monuments" },
    { type: "table", head: ["Place", "Season", "Hours"], rows: [
      ["Andalusian monuments in the Albaicín", "15 Sep – 30 Apr", "Every day, 10:00 – 17:00"],
      ["Andalusian monuments in the Albaicín", "1 May – 14 Sep", "09:00 – 14:30 and 17:00 – 20:30"],
      ["Rodríguez-Acosta Foundation", "All year", "Every day, 10:00 – 14:00"],
      ["Torres Bermejas (free)", "15 Oct – 31 Mar", "Sat & Sun, 08:30 – 18:00"],
      ["Silla del Moro (free)", "15 Oct – 31 Mar", "Sat 08:30 – 18:00, Sun 08:30 – 14:00"],
    ] },
    { type: "p", text: "Entry to the Andalusian monuments in the Albaicín is free on Sundays, according to the official site." },
    { type: "h2", id: "booking", text: "When can you buy tickets?" },
    { type: "p", text: "Online, by phone and from the ticket machines you can buy up to 23:59 on the day before your visit. On the day itself, only the ticket office sells what is left, and for the Nasrid Palaces that is often nothing. If the date you want is gone, these are [your options when Alhambra tickets are sold out](/tickets/sold-out/)." },
    { type: "cta", title: "Want someone else to handle the timing?", text: "Guided tours come with the entry ticket and a fixed palace time, and the guide gets you there on time.", label: "See Alhambra guided tours", query: "Alhambra guided tour Nasrid Palaces" },
    { type: "p", text: "Next: work out [how long you need at the Alhambra](/blog/how-long-do-you-need-at-the-alhambra/) and [how to get up the hill](/plan/getting-there/)." },
  ],
  faq: [
    { q: "What time does the Alhambra open?", a: "8:30 every day of the year except 25 December and 1 January. The ticket office opens at 8:00." },
    { q: "What time does the Alhambra close?", a: "18:00 from 15 October to 31 March and 20:00 from 1 April to 14 October." },
    { q: "Is the Alhambra open on Mondays?", a: "Yes. Day visits run Monday to Sunday. Only the night visits skip some weekdays." },
    { q: "What time are night visits to the Alhambra?", a: "The Nasrid Palaces night visit runs Friday and Saturday 20:00–21:30 from 15 October to 31 March, and Tuesday to Saturday 22:00–23:30 from 1 April to 14 October." },
    { q: "Is the Alcazaba open?", a: "The official ticket site says the Alcazaba reopened from 23 September 2026 with an adapted route after the August earthquakes. Check the official site before you go, as routes can change." },
  ],
  sidebar: { title: "Palace times sold out?", text: "Tours with the entry ticket included often still have places.", label: "Check tours for your date", product: "Alhambra guided tour Nasrid Palaces" },
  next: [
    { href: "/tickets/", title: "Alhambra tickets compared", text: "What each ticket includes and costs." },
    { href: "/plan/getting-there/", title: "How to get there", text: "Walk, minibus, taxi or car." },
    { href: "/guide/", title: "What to see", text: "The palaces, fortress and gardens in order." },
  ],
  sources: [OFFICIAL_HOURS, OFFICIAL_TICKETS],
};

// ---------------------------------------------------------------------------
// /plan/getting-there/  · primary keyword: "how to get to the alhambra"
// ---------------------------------------------------------------------------
export const GETTING_THERE_GUIDE: Guide = {
  path: "/plan/getting-there/",
  ogImage: "/images/og/og-getting-there.jpg",
  pageId: "getting-there",
  crumbs: [{ href: "/", label: "Home" }, { href: "/plan/", label: "Plan your visit" }, { href: "/plan/getting-there/", label: "Getting there" }],
  title: "How to get to the Alhambra",
  seoTitle: "How to Get to the Alhambra: Entrances, Bus, Walk & Car",
  description: "How to get to the Alhambra and which entrance to use: the walk to the Gate of Justice, the C30 and C32 minibuses, taxis, the car park and the main entrance.",
  intro: "The Alhambra sits on a hill above the city centre. Here is each way up, where it drops you, and how much time to leave before your palace slot.",
  photo: PHOTOS.hero,
  updated: CHECKED,
  body: [
    { type: "answer", text: "From the city centre, take the red C30 or C32 minibus from Plaza Isabel la Católica, by the Columbus statue, or walk up the Cuesta de Gomérez from Plaza Nueva in about 15–20 minutes. Taxis and cars go to the main entrance, where the Alhambra car park is." },
    { type: "h2", id: "options", text: "The ways up at a glance" },
    { type: "table", head: ["Option", "From", "Drops you at"], rows: [
      ["Walk (Cuesta de Gomérez)", "Plaza Nueva", "Gate of Justice, near the palaces"],
      ["Minibus C30", "Plaza Isabel la Católica", "Main entrance (last stop: Alhambra – Generalife 2)"],
      ["Minibus C32", "Plaza Isabel la Católica, via the Albaicín", "Main entrance, then on to the Albaicín"],
      ["Taxi or car", "Anywhere", "Main entrance and car park"],
    ] },
    { type: "h2", id: "entrances", text: "The Alhambra entrances" },
    { type: "p", text: "The official map shows three ways in. You need your ticket and your original ID card or passport at all of them: tickets are issued in the visitor's name." },
    { type: "table", head: ["Entrance", "Where", "Use it if"], rows: [
      ["Pabellón de Acceso (main entrance)", "East end, by the Generalife, car park and ticket office", "You arrive by minibus, taxi or car, or need the ticket office"],
      ["Puerta de la Justicia (Gate of Justice)", "South side, at the top of the walk from Plaza Nueva", "You walk up with your ticket already on your phone; it is the closest to the Nasrid Palaces and the Alcazaba"],
      ["Puerta de los Carros", "Below the Palace of Charles V", "Shown as an entrance on the official map; follow staff directions on the day"],
    ] },
    { type: "tip", title: "Which entrance for an early palace slot?", text: "With an 8:30 palace time, the main entrance is a 15–30 minute walk from the palaces. Walking up to the Gate of Justice puts you much closer." },
    { type: "h2", id: "walk", text: "Walking to the Alhambra" },
    { type: "p", text: "The classic route starts at **Plaza Nueva**. Walk up the Cuesta de Gomérez, through the Gate of the Pomegranates and into the shady Alhambra woods. It is uphill all the way, and most people take 15–20 minutes. You arrive by the Gate of Justice, which is the closest entrance to the Nasrid Palaces." },
    { type: "p", text: "A second path, the Cuesta del Rey Chico, climbs from the Paseo de los Tristes along the river. It is steeper and quieter." },
    { type: "tip", title: "Wear proper shoes", text: "The slope is steep in places and the paths are cobbled. In summer, walk up before 10:00 or take the minibus." },
    { type: "h2", id: "bus", text: "Taking the bus to the Alhambra" },
    { type: "p", text: "Small red minibuses are the easiest way up. The official Alhambra site lists three lines that serve the monument:" },
    { type: "list", items: [
      "**C30, Alhambra – Centro:** from Plaza Isabel la Católica. The last stop, Alhambra – Generalife 2, is by the main entrance.",
      "**C32, Alhambra – Albaicín:** also passes the Alhambra, then carries on to the Albaicín. Get off at the Alhambra stops or you will end up across the valley.",
      "**C35, Cementerio – Barranco del Abogado – Centro.**",
    ] },
    { type: "p", text: "Buses come roughly every 8–12 minutes, according to local guides. Check fares and the current timetable on Granada's city transport site, as both change." },
    { type: "h3", text: "From the train or bus station" },
    { type: "p", text: "There is no direct bus. Ride into the centre to the **Catedral** stop, then change to the C30 or C32. From the bus station, line 33 goes to the Cathedral; from the train station, line 4 runs along the Gran Vía." },
    { type: "h2", id: "car", text: "Taxi, car and parking" },
    { type: "p", text: "Taxis drop you at the main entrance. Private cars can't drive up through the old town, so drivers reach the Alhambra from the Ronda Sur ring road and follow the signs. The official Alhambra car park has 360 spaces in four areas, is guarded 24 hours, and sits next to the ticket office." },
    { type: "h2", id: "time", text: "How much time to leave before your palace slot" },
    { type: "p", text: "Getting up the hill is the quick part. Inside, the Nasrid Palaces entrance is a walk from the main entrance, and guides put it at 15 to 30 minutes depending on your pace. If you collect your ticket from a machine, the official site asks you to do it at least an hour before your palace time." },
    { type: "cta", title: "Coming from Seville or Málaga?", text: "Day trips include the transport, the entry ticket and a guide, so you don't have to work out buses or parking at all.", label: "See day trips", href: "/day-trips/" },
    { type: "p", text: "Still planning? Check the [Alhambra opening hours](/plan/opening-hours/) and [what to see once you're inside](/guide/)." },
  ],
  faq: [
    { q: "Which entrance of the Alhambra should I use?", a: "The main entrance (Pabellón de Acceso) if you arrive by minibus, taxi or car or need the ticket office. If you walk up from Plaza Nueva with your ticket, the Gate of Justice is closer to the Nasrid Palaces." },
    { q: "Can you walk to the Alhambra from the city centre?", a: "Yes. From Plaza Nueva it is about 15–20 minutes up the Cuesta de Gomérez. It is steep and uphill the whole way." },
    { q: "Which bus goes to the Alhambra?", a: "The C30 and C32 minibuses from Plaza Isabel la Católica. The official site also lists the C35." },
    { q: "Is there parking at the Alhambra?", a: "Yes. The official car park has 360 spaces, is guarded 24 hours and is next to the main entrance." },
    { q: "How do I get to the Alhambra from the train station?", a: "There is no direct bus. Take a bus to the Catedral stop in the centre and change to the C30 or C32 minibus." },
  ],
  sidebar: { title: "Rather not plan the logistics?", text: "Guided tours meet near the entrance and include your ticket.", label: "See guided tours", product: "Alhambra guided tour Nasrid Palaces" },
  next: [
    { href: "/plan/opening-hours/", title: "Opening hours", text: "Day, night and closed days." },
    { href: "/tickets/nasrid-palaces/", title: "Nasrid Palaces entry time", text: "How the timed slot works." },
    { href: "/granada/cathedral/", title: "Granada Cathedral", text: "In the centre, where the Alhambra buses start." },
  ],
  sources: [
    OFFICIAL_FAQ,
    OFFICIAL_HOURS,
    { label: "How to reach the Alhambra, lovegranada.com", url: "https://www.lovegranada.com/alhambra/travel/" },
    { label: "From the bus station to the centre, turismo.granada.org", url: "https://turismo.granada.org/en/how-get-city-centre-granada-bus-station" },
    { label: "Going to the Alhambra, alhambradegranada.org", url: "https://alhambradegranada.org/en/info/goingtothealhambra.asp" },
    { label: "Official map of the complex with entrances (accessibility map, PDF), Patronato", url: "https://alhambra-patronato.es/wp-content/uploads/2024/10/PLANO_ACCESIBILIDAD.pdf" },
    OFFICIAL_TICKETS,
  ],
};

// ---------------------------------------------------------------------------
// /tickets/nasrid-palaces/  · "nasrid palaces tickets" + "nasrid palaces entry time"
// ---------------------------------------------------------------------------
export const NASRID_PALACES: Guide = {
  path: "/tickets/nasrid-palaces/",
  ogImage: "/images/og/og-nasrid-palaces.jpg",
  pageId: "nasrid",
  crumbs: [{ href: "/", label: "Home" }, { href: "/tickets/", label: "Tickets" }, { href: "/tickets/nasrid-palaces/", label: "Nasrid Palaces" }],
  title: "Nasrid Palaces tickets and entry time",
  seoTitle: "Nasrid Palaces Tickets 2026: Which Ticket & Entry Times",
  description: "Which Alhambra tickets include the Nasrid Palaces, what they cost, how the fixed entry time works, and what to do if palace slots are sold out.",
  intro: "You can't buy the Nasrid Palaces on their own by day. They come inside certain Alhambra tickets, each with a fixed entry time. Here is which tickets include them and how not to lose your slot.",
  photo: PHOTOS.abencerrages,
  updated: CHECKED,
  body: [
    { type: "answer", text: "To see the Nasrid Palaces by day, get an Alhambra General ticket (official price €22.27). Your ticket shows a palace entry time, and the official rules say you can only go in at that time: be in the queue early, because late arrivals lose the visit. If day slots are gone, the night visit (€12.73) or a guided tour with tickets included are the usual ways in." },
    { type: "h2", id: "which-ticket", text: "Which tickets include the Nasrid Palaces?" },
    { type: "table", head: ["Ticket type", "Nasrid Palaces", "Official price (adult)"], rows: [
      ["Alhambra General", "By day, at your slot", "€22.27"],
      ["Alhambra + Rodríguez-Acosta Foundation", "By day, at your slot", "€25.45"],
      ["Dobla de Oro General", "By day, plus Albaicín monuments", "€30.48"],
      ["Alhambra Experiences", "At night, gardens the next day", "€22.27"],
      ["Night visit: Nasrid Palaces", "At night only", "€12.73"],
      ["Dobla de Oro at Night", "At night, plus Albaicín monuments", "€23.06"],
      ["Gardens, Generalife and Alcazaba", "Not included", "€12.73"],
    ] },
    { type: "p", text: "Prices are from the official price list. Resale tickets on GetYourGuide cost more because a booking fee is added. Children under 12 go free but still need their own ticket, and every ticket is issued in the visitor's name. For every ticket side by side, see [all Alhambra tickets compared](/tickets/)." },
    { type: "cta", title: "Book a ticket with the Nasrid Palaces", text: "Compare Alhambra entry tickets that include the palaces by day. Check the palace time and cancellation terms on each listing.", label: "See entry tickets", query: "Alhambra entry ticket" },
    { type: "h2", id: "entry-time", text: "How the Nasrid Palaces entry time works" },
    { type: "list", items: [
      "**One fixed time.** The rest of the Alhambra is open to you all day, but the palaces only at the time printed on your ticket.",
      "**Late means no entry.** The official rules say the palace visit can only take place at that time. Staff don't move you to a later slot.",
      "**Collect early if you must collect.** If your ticket needs printing from a machine, the official site asks you to do it at least an hour before your palace time.",
      "**Bring the ID you booked with.** Original passport or ID card. A photocopy isn't enough.",
    ] },
    { type: "h3", text: "Where the queue is" },
    { type: "p", text: "The palace entrance is by the Palace of Charles V, near the Puerta del Vino, a walk of 15 to 30 minutes from the main entrance. Coming from the city on foot via the Gate of Justice puts you much closer. See [how to get to the Alhambra](/plan/getting-there/)." },
    { type: "h3", text: "Which slot to pick" },
    { type: "p", text: "The first slot of the morning is the calmest. With a morning slot, do the palaces first and the Generalife after. With an afternoon slot, see the gardens and the Alcazaba first. The palaces take about 45 minutes to an hour and a half inside. Travelling with children? See [the Alhambra with kids](/blog/alhambra-with-kids/)." },
    { type: "tip", title: "Resale tickets: check the time before you pay", text: "Many resale tickets on booking sites say the palace time is assigned by availability and may differ from the one you asked for. If your day is tight, choose a listing that confirms a time, or a guided tour where the guide manages it." },
    { type: "cta", title: "Day slots sold out?", text: "Licensed tour companies hold their own tickets, so guided tours often still have palace times when the official site doesn't.", label: "Check tours with Nasrid Palaces", query: "Alhambra guided tour Nasrid Palaces" },
    { type: "h2", id: "sold-out", text: "If Nasrid Palaces tickets are sold out" },
    { type: "list", ordered: true, items: [
      "**Guided tour with tickets.** The most reliable fallback. See [Alhambra guided tours compared](/tours/).",
      "**Night visit.** A different ticket pool, with the palaces lit at night. See the [night visit guide](/tickets/night-visit/).",
      "**Alhambra Experiences.** Palaces at night, gardens the next day, if you are in Granada for two days.",
      "**Dobla de Oro.** Costs more, sells out later, and adds the Albaicín monuments.",
    ] },
    { type: "p", text: "The full step-by-step plan is in [Alhambra tickets sold out? What to do](/tickets/sold-out/)." },
    { type: "h2", id: "inside", text: "What you see inside" },
    { type: "p", text: "Three connected palaces: the **Mexuar**, the **Comares Palace** with the Court of the Myrtles and the Hall of the Ambassadors, and the **Palace of the Lions** with its famous fountain court. Our [guide to what to see in the Alhambra](/guide/) walks through each one, and [the Alhambra's history](/blog/alhambra-history/) explains which sultan built them." },
  ],
  faq: [
    { q: "Can you buy a ticket for just the Nasrid Palaces?", a: "By day, no. The palaces come with the Alhambra General ticket and a few combined tickets. At night there is a separate Nasrid Palaces night ticket (€12.73)." },
    { q: "What happens if I miss my Nasrid Palaces time?", a: "The official rules say the palace visit can only take place at the time on your ticket, so you will normally not be let in. The rest of your ticket stays valid for the day." },
    { q: "How long is the visit inside the Nasrid Palaces?", a: "Most people spend 45 minutes to an hour and a half inside." },
    { q: "Do children need a Nasrid Palaces ticket?", a: "Yes. Children under 12 are free, but they need their own ticket like everyone else." },
  ],
  sidebar: { title: "No palace slot on your date?", text: "Compare tours and tickets that include the Nasrid Palaces.", label: "See Nasrid Palaces options", product: "Nasrid Palaces tickets" },
  next: [
    { href: "/tickets/", title: "All tickets compared", text: "Which ticket fits your visit." },
    { href: "/tickets/sold-out/", title: "Tickets sold out?", text: "Every way in, in order." },
    { href: "/plan/opening-hours/", title: "Opening hours", text: "Day and night times." },
  ],
  sources: [
    OFFICIAL_HOURS,
    OFFICIAL_TICKETS,
    { label: "Visiting the Nasrid Palaces, earthtrekkers.com", url: "https://www.earthtrekkers.com/alhambra/" },
    { label: "Nasrid Palaces guide, thebettervacation.com", url: "https://thebettervacation.com/granada/nasrid-palaces/" },
  ],
};

// ---------------------------------------------------------------------------
// /guide/  · primary keyword: "what to see in the alhambra"
// ---------------------------------------------------------------------------
export const WHAT_TO_SEE: Guide = {
  path: "/guide/",
  ogImage: "/images/og/og-guide.jpg",
  pageId: "guide",
  crumbs: [{ href: "/", label: "Home" }, { href: "/guide/", label: "Inside the Alhambra" }],
  title: "What to see in the Alhambra",
  seoTitle: "What to See in the Alhambra: Palaces, Fortress & Gardens",
  description: "What to see in the Alhambra, area by area: the Nasrid Palaces, Alcazaba, Palace of Charles V and Generalife, the best order and which ticket covers what.",
  intro: "The Alhambra is a walled city, not a single building. Here are its five areas, what not to miss in each, and the order that fits your palace time.",
  photo: PHOTOS.lions,
  updated: CHECKED,
  body: [
    { type: "answer", text: "The Alhambra has five main areas: the Nasrid Palaces (the Court of the Lions and the Court of the Myrtles), the Alcazaba fortress, the Palace of Charles V, the Medina and Partal, and the Generalife summer palace and gardens. Seeing everything takes 3 to 4 hours, and only the Alhambra General ticket covers all of it by day." },
    { type: "h2", id: "at-a-glance", text: "The Alhambra at a glance" },
    { type: "table", head: ["Area", "Don't miss", "Time"], rows: [
      ["Nasrid Palaces", "Court of the Myrtles, Court of the Lions", "45 min – 1.5 h"],
      ["Alcazaba", "Ramparts and the Plaza de Armas (Torre de la Vela closed for now)", "30 – 45 min"],
      ["Palace of Charles V", "Round courtyard, Alhambra Museum", "20 – 40 min"],
      ["Medina & Partal", "Partal pool and portico", "20 – 30 min"],
      ["Generalife", "Patio de la Acequia, Water Stairway", "45 min – 1 h"],
    ] },
    { type: "h2", id: "nasrid", text: "The Nasrid Palaces" },
    { type: "p", text: "The reason most people come. Built for the Nasrid sultans between the 13th and 15th centuries, these three connected palaces are the high point of the visit, and the only part with a [fixed entry time](/tickets/nasrid-palaces/)." },
    { type: "list", items: [
      "**The Mexuar:** the first rooms you enter, used for the sultan's council and audiences.",
      "**The Comares Palace:** the **Court of the Myrtles**, with its long reflecting pool, leads to the Hall of the Ambassadors under the Comares Tower.",
      "**The Palace of the Lions:** the **Court of the Lions**, built for Muhammad V in the 1360s, with the Hall of the Abencerrages and the Hall of the Two Sisters and their honeycomb domes.",
    ] },
    { type: "tip", title: "After the 2026 earthquakes", text: "The official ticket site says access to the Throne Room (the Hall of the Ambassadors) was restored from 17 November 2026. The side rooms of the Hall of the Boat, which leads into it, are still temporarily closed." },
    { type: "h2", id: "alcazaba", text: "The Alcazaba" },
    { type: "p", text: "The fortress at the western tip of the hill and the oldest part of the Alhambra. Its watchtower, the **Torre de la Vela**, has the best view over Granada and the Albaicín, but it is temporarily closed to visitors after the 2026 earthquakes (official ticket site, November 2026)." },
    { type: "tip", title: "Open again after the 2026 earthquakes", text: "The Alcazaba closed for inspections after the August 2026 earthquakes. The official ticket site says it reopened from 23 September 2026 with an adapted route. The Torre de la Vela and the side rooms of the Hall of the Boat (in the Nasrid Palaces) are still closed, and the route may change." },
    { type: "p", text: "More in our [Alcazaba guide](/guide/alcazaba/): the towers, the parade ground and which tickets include it." },
    { type: "h2", id: "charles-v", text: "The Palace of Charles V" },
    { type: "p", text: "A Renaissance palace dropped into the middle of the Moorish city in the 16th century, with a striking round courtyard. It houses the **Alhambra Museum** and the **Museum of Fine Arts**." },
    { type: "h2", id: "medina-partal", text: "The Medina and the Partal" },
    { type: "p", text: "Between the palaces and the Generalife lie the remains of the town where the court's officials and craftsmen lived, the Bath of the Mosque, and the **Partal**: a portico reflected in a still pool, one of the most photographed spots in the complex." },
    { type: "h2", id: "generalife", text: "The Generalife" },
    { type: "p", text: "The sultans' summer palace, on the next hill, set in terraced gardens. The **Patio de la Acequia** is a long water channel lined with fountains and flowerbeds. Don't miss the **Water Stairway**, where water runs down the handrails. More in our [Generalife gardens guide](/blog/generalife-gardens-guide/)." },
    { type: "h2", id: "free", text: "What you can see for free" },
    { type: "p", text: "Without a ticket you can walk the Alhambra woods and parts of the outer complex. The official site lists the **Torres Bermejas** and the **Silla del Moro** as free visits, open at weekends." },
    { type: "h2", id: "order", text: "The order to see it in" },
    { type: "p", text: "Plan around your palace time. With a morning slot, do the Nasrid Palaces first, then the Partal and the Generalife. With an afternoon slot, start with the Generalife and the Alcazaba and finish in the palaces. Expect about 3.5 km of walking, with slopes and steps. Our [visit planner](/plan/) builds the route around your slot." },
    { type: "h2", id: "tickets", text: "Which ticket covers what" },
    { type: "table", head: ["Ticket", "Nasrid Palaces", "Alcazaba", "Generalife"], rows: [
      ["Alhambra General", "Yes (your slot)", "Yes", "Yes"],
      ["Gardens, Generalife and Alcazaba", "No", "Yes", "Yes"],
      ["Night visit: Nasrid Palaces", "At night", "No", "No"],
      ["Night visit: Generalife", "No", "No", "At night"],
    ] },
    { type: "cta", title: "See it with someone who knows the stories", text: "A licensed guide explains the inscriptions, the water engineering and the legends you would walk straight past.", label: "See Alhambra guided tours", query: "Alhambra guided tour Nasrid Palaces" },
    { type: "p", text: "Next: [which ticket to buy](/tickets/), [the opening hours](/plan/opening-hours/), [how long you need](/blog/how-long-do-you-need-at-the-alhambra/) and [a short history of the Alhambra](/blog/alhambra-history/)." },
  ],
  faq: [
    { q: "What is the most important part of the Alhambra?", a: "The Nasrid Palaces, especially the Court of the Myrtles and the Court of the Lions. Make sure your ticket includes them." },
    { q: "How long does it take to see the whole Alhambra?", a: "About 3 to 4 hours for the palaces, the Alcazaba, the Palace of Charles V and the Generalife." },
    { q: "Is the Generalife part of the Alhambra?", a: "Yes. It's the summer palace and gardens on the neighbouring hill, included in the General ticket and in the Gardens ticket." },
    { q: "Can you see the Alhambra for free?", a: "Partly. The Alhambra woods and the Torres Bermejas and Silla del Moro (weekends) are free. The palaces, the Alcazaba and the Generalife need a ticket." },
  ],
  sidebar: { title: "See it all with a guide", text: "Entry ticket and Nasrid Palaces included, about 3 hours.", label: "Check availability", product: "Alhambra guided tour Nasrid Palaces" },
  next: [
    { href: "/tickets/", title: "Alhambra tickets compared", text: "Pick the ticket that covers what you want." },
    { href: "/tickets/nasrid-palaces/", title: "Nasrid Palaces entry", text: "How the timed slot works." },
    { href: "/blog/alhambra-after-the-2026-earthquakes/", title: "What's open after the 2026 earthquakes", text: "Every area's status, including the Alcazaba." },
  ],
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: "Alhambra",
      description: "Palace and fortress complex in Granada, Spain: the Nasrid Palaces, the Alcazaba, the Palace of Charles V and the Generalife.",
      address: { "@type": "PostalAddress", streetAddress: "Calle Real de la Alhambra, s/n", addressLocality: "Granada", postalCode: "18009", addressCountry: "ES" },
      geo: { "@type": "GeoCoordinates", latitude: 37.1761, longitude: -3.5881 },
      url: "https://www.alhambra-patronato.es/",
      sameAs: ["https://en.wikipedia.org/wiki/Alhambra"],
    },
  ],
  sources: [
    OFFICIAL_HOURS,
    OFFICIAL_TICKETS,
    { label: "Alhambra and Generalife, Frommer's", url: "https://www.frommers.com/destinations/granada/attractions/alhambra-and-generalife/" },
    { label: "What to see at the Alhambra, The Tour Guy", url: "https://thetourguy.com/travel-blog/spain/granada/alhambra/top-things-to-see-at-the-alhambra/" },
  ],
};

// ---------------------------------------------------------------------------
// /guide/alcazaba/  · primary keyword: "alcazaba alhambra"
// Current status checked on tickets.alhambra-patronato.es, 24 Nov 2026.
// ---------------------------------------------------------------------------
export const ALCAZABA: Guide = {
  path: "/guide/alcazaba/",
  pageId: "alcazaba",
  crumbs: [{ href: "/", label: "Home" }, { href: "/guide/", label: "Inside the Alhambra" }, { href: "/guide/alcazaba/", label: "Alcazaba" }],
  title: "The Alcazaba of the Alhambra: what to see and what's open now",
  seoTitle: "Alcazaba of the Alhambra: What to See, Tickets & What's Open",
  description: "The Alhambra's oldest part: the Alcazaba fortress, its towers and parade ground, which tickets include it, how long to spend, and what is closed after the 2026 earthquakes.",
  intro: "The Alcazaba is the fortress at the western tip of the Alhambra and its oldest part. Here is what to see inside, which tickets cover it, and what is still closed after the 2026 earthquakes.",
  photo: PHOTOS.alcazaba,
  updated: CHECKED,
  body: [
    { type: "answer", text: "The Alcazaba is the military fortress at the western end of the Alhambra, rebuilt by Muhammad I, the first Nasrid sultan, in the 13th century. It is included in the General, Gardens & Generalife and the other daytime tickets, takes 30–45 minutes, and is open on an adapted route since 23 September 2026. Its famous watchtower, the Torre de la Vela, is still temporarily closed." },
    { type: "h2", id: "status", text: "What's open now (November 2026)" },
    { type: "p", text: "The Alcazaba closed for inspections after the August 2026 earthquakes. According to the official ticket site, it has been open since 23 September on a visitor route adapted to safety and conservation needs, the **Torre de la Vela is temporarily closed**, and the route may change. Check the [latest status after the earthquakes](/blog/alhambra-after-the-2026-earthquakes/) before you go." },
    { type: "h2", id: "what", text: "What the Alcazaba is" },
    { type: "p", text: "The Sabika hill was fortified before the palaces were built. When Muhammad I founded the Nasrid kingdom in the 13th century, he rebuilt this fortress first and raised its two great towers, the Torre de la Vela and the Torre del Homenaje. It housed the garrison that guarded the palaces, and the ruins of their houses still fill the parade ground." },
    { type: "p", text: "The fortress is roughly a triangle, with the Torre de la Vela at the western point, the Torre del Homenaje to the north-east and the Torre Hueca to the south-east. Tradition says the flag of Castile was raised over the Torre de la Vela on 2 January 1492, the day Granada surrendered." },
    { type: "h2", id: "see", text: "What to see inside" },
    { type: "list", items: [
      "**Plaza de Armas:** the parade ground inside the walls, with the foundations of the soldiers' quarter, its streets, cisterns and a bathhouse.",
      "**Torre de la Vela:** the watchtower on the western tip, with the widest view over Granada, the Albaicín and the Sierra Nevada. Temporarily closed in November 2026.",
      "**Torre del Homenaje:** the keep, one of the two largest towers of the Alhambra, which guarded the fortress entrance.",
      "**Puerta and Torre de las Armas:** the old gate to the city on the north side, with a terrace looking over the Darro valley and the Albaicín.",
      "**Jardín de los Adarves:** a garden on the southern ramparts, between the inner and outer walls.",
    ] },
    { type: "table", head: ["Ticket", "Alcazaba included?"], rows: [
      ["Alhambra General", "Yes, by day"],
      ["Gardens & Generalife", "Yes"],
      ["Dobla de Oro, Rodríguez-Acosta, Alhambra Experiences", "Yes, on the daytime visit"],
      ["Night visits (Nasrid Palaces or Generalife)", "No"],
      ["Guided tours with tickets", "Usually: check the listing (our first-pick tour includes it)"],
    ] },
    { type: "p", text: "See [all 8 official tickets compared](/tickets/) for prices and what else each one covers." },
    { type: "h2", id: "when", text: "How long, and when in your visit" },
    { type: "p", text: "Plan **30–45 minutes**, a little less while the Torre de la Vela is closed. The Alcazaba sits next to the Nasrid Palaces entrance, so it fits best just before your [palace time slot](/tickets/nasrid-palaces/): arrive early, walk the fortress, then queue for the palaces. If you walk up from Plaza Nueva, the Gate of Justice brings you in close to both. See [how to get to the Alhambra](/plan/getting-there/)." },
    { type: "tip", title: "Don't spend your palace slot here", text: "Your ticket is valid all day, but the Nasrid Palaces only at the time printed on it. Leave the Alcazaba with at least 15 minutes to spare." },
    { type: "cta", title: "See the fortress with a guide", text: "Guided tours with the Nasrid Palaces usually cover the Alcazaba too, ticket included. Check each listing for what it includes.", label: "See guided tours", query: "Alhambra guided tour Nasrid Palaces" },
    { type: "p", text: "Planning the whole visit? See [what to see in the Alhambra](/guide/), area by area." },
  ],
  faq: [
    { q: "Is the Alcazaba open?", a: "Yes. It has been open since 23 September 2026 on an adapted route after the August earthquakes. The Torre de la Vela is temporarily closed (official ticket site, November 2026)." },
    { q: "Is the Alcazaba included in the Alhambra ticket?", a: "Yes, in the General ticket and the other daytime tickets, including Gardens & Generalife. Night visits don't include it." },
    { q: "How long does it take to see the Alcazaba?", a: "About 30–45 minutes, a little less while the Torre de la Vela is closed." },
    { q: "Is the Alcazaba the oldest part of the Alhambra?", a: "Yes. It is the fortress at the western end of the hill, rebuilt by Muhammad I in the 13th century on earlier fortifications." },
  ],
  sidebar: { title: "Want the history explained?", text: "Guided tours with the Nasrid Palaces usually include the Alcazaba.", label: "See guided tours", product: "Alhambra guided tour Nasrid Palaces" },
  next: [
    { href: "/guide/", title: "What to see in the Alhambra", text: "All five areas in order." },
    { href: "/tickets/nasrid-palaces/", title: "Nasrid Palaces entry time", text: "How the timed slot works." },
    { href: "/blog/alhambra-history/", title: "Alhambra history", text: "Who built it and when." },
  ],
  sources: [
    OFFICIAL_TICKETS,
    { label: "Torres de la Vela y del Homenaje, built by Alhamar (Muhammad I), Cuadernos de la Alhambra 38 (2002), Patronato", url: "https://www.alhambra-patronato.es/ria/bitstream/handle/10514/14193/4%20C.A%2038%20%282002%29%20encriptado.pdf?sequence=1" },
    { label: "Alcazaba of the Alhambra (layout, 1492 flag), Wikipedia", url: "https://en.wikipedia.org/wiki/Alcazaba_of_the_Alhambra" },
    { label: "The Alcazaba, Granada tourism office", url: "https://turismo.granada.org/en/alcazaba-old-citadel" },
  ],
};

const TURISMO_FAQ = { label: "Visitor FAQ (buses from Plaza Nueva), turismo.granada.org", url: "https://turismo.granada.org/en/faq-frequent-asked-questions" };

// ---------------------------------------------------------------------------
// /granada/albaicin/  · primary keyword: "albaicin granada"
// ---------------------------------------------------------------------------
export const ALBAICIN: Guide = {
  path: "/granada/albaicin/",
  ogImage: "/images/og/og-albaicin.jpg",
  pageId: "albaicin",
  crumbs: [{ href: "/", label: "Home" }, { href: "/granada/albaicin/", label: "Albaicín" }],
  title: "Albaicín, Granada: what to see and the best walk to San Nicolás",
  seoTitle: "Albaicín, Granada: What to See & Best Walk to San Nicolás",
  description: "Walk Granada's old Moorish quarter: the route from Plaza Nueva to the Mirador de San Nicolás, how long it takes and when to go for sunset.",
  intro: "Granada's old Moorish quarter faces the Alhambra across the river. Here is what to see, a simple walking route up to the Mirador de San Nicolás, and how to time it for sunset.",
  photo: PHOTOS.hero,
  updated: CHECKED,
  body: [
    { type: "answer", text: "The Albaicín is Granada's old Moorish quarter, on the hill facing the Alhambra and part of its UNESCO World Heritage listing since 1994. Start at Plaza Nueva, follow the Carrera del Darro along the river to the Paseo de los Tristes, then climb the steep lanes to the Mirador de San Nicolás for sunset over the Alhambra. Allow about two hours with stops." },
    { type: "h2", id: "what", text: "What the Albaicín is" },
    { type: "p", text: "Before the Alhambra was built up, Granada grew on this hill. Today it's a maze of whitewashed houses, walled gardens (cármenes), old churches built on mosque sites and tiny squares. It shares its UNESCO listing with the Alhambra, and from almost every corner you look straight across at it." },
    { type: "h2", id: "route", text: "A two-hour Albaicín walking route" },
    { type: "list", ordered: true, items: [
      "**Plaza Nueva.** The flat start, at the foot of both hills.",
      "**Carrera del Darro.** A narrow street along the River Darro, with the Alhambra walls above you.",
      "**Paseo de los Tristes.** A wider riverside promenade with one of the best low-level views of the Alhambra.",
      "**Up through the lanes.** From here the streets climb steeply and are cobbled. Take it slowly and expect to get a little lost.",
      "**Mirador de San Nicolás.** The famous viewpoint: the Alhambra and the Generalife with the Sierra Nevada behind.",
    ] },
    { type: "tip", title: "Time it for sunset", text: "Reach San Nicolás about half an hour before sunset and watch the Alhambra walls turn red. It gets busy, so arrive early for a spot at the wall." },
    { type: "h2", id: "monuments", text: "The Andalusi monuments" },
    { type: "p", text: "The Alhambra's managing body also runs a set of smaller Moorish monuments in and around the Albaicín: the Bañuelo (Arab baths), Casa Horno de Oro, Dar al-Horra Palace and the Corral del Carbón. From 15 September to 30 April they open every day 10:00–17:00, entry is free on Sundays, and they're included in the Dobla de Oro ticket, according to the official site." },
    { type: "h2", id: "getting-up", text: "Getting up without the climb" },
    { type: "p", text: "Granada's tourism office says the **C31** minibus to the Albaicín leaves from Plaza Nueva. Ride up to the top and walk down instead: the views are the same and your legs will thank you. The **C34** from the same square goes to Sacromonte." },
    { type: "h2", id: "guided", text: "Guided walk or on your own?" },
    { type: "p", text: "On your own is easy if you follow the route above. A guide adds the history behind the gates, cisterns and churches you'd walk past, and the best guided walks combine the Albaicín with [Sacromonte](/granada/sacromonte/) at sunset." },
    { type: "cta", title: "Walk the Albaicín and Sacromonte with a local guide", text: "A guided sunset walk through both quarters, ending at the best viewpoints.", label: "See the sunset walk", query: "Albaicin Sacromonte walking tour" },
    { type: "p", text: "Fitting it into a short stay? See [Granada in one day](/blog/granada-in-one-day/) and [what to see in the Alhambra](/guide/)." },
  ],
  faq: [
    { q: "How long do you need for the Albaicín?", a: "About two hours for the walk from Plaza Nueva to the Mirador de San Nicolás with stops. Longer if you visit the Andalusi monuments or stop for lunch." },
    { q: "Is the Albaicín steep?", a: "Yes. Above the river the lanes are steep and cobbled. Wear proper shoes, or take the C31 minibus up from Plaza Nueva and walk down." },
    { q: "When is the best time to visit the Mirador de San Nicolás?", a: "Sunset, when the Alhambra glows red. Arrive about half an hour early, as it gets crowded." },
    { q: "Is the Albaicín a UNESCO site?", a: "Yes. The Alhambra and Generalife were listed in 1984, and the listing was extended to the Albaicín in 1994." },
  ],
  sidebar: { title: "See it with a local", text: "Sunset walking tour of the Albaicín and Sacromonte.", label: "Check dates", product: "Albaicin Sacromonte walking tour" },
  next: [
    { href: "/granada/sacromonte/", title: "Sacromonte", text: "Cave houses and flamenco next door." },
    { href: "/blog/granada-in-one-day/", title: "Granada in one day", text: "The Alhambra plus the city." },
    { href: "/guide/", title: "What to see in the Alhambra", text: "The palaces, fortress and gardens." },
  ],
  sources: [
    OFFICIAL_HOURS,
    TURISMO_FAQ,
    { label: "Albaicín, afar.com (UNESCO listing with the Alhambra)", url: "https://www.afar.com/places/albaicin-granada-2" },
    { label: "El Albaicín, andalucia.com", url: "https://www.andalucia.com/cities/granada/albaicin.htm" },
  ],
};

// ---------------------------------------------------------------------------
// /granada/sacromonte/  · primary keyword: "sacromonte granada"
// ---------------------------------------------------------------------------
export const SACROMONTE: Guide = {
  path: "/granada/sacromonte/",
  ogImage: "/images/og/og-sacromonte.jpg",
  pageId: "sacromonte",
  crumbs: [{ href: "/", label: "Home" }, { href: "/granada/sacromonte/", label: "Sacromonte" }],
  title: "Sacromonte, Granada: cave houses, flamenco and how to visit",
  seoTitle: "Sacromonte, Granada: Cave Houses, Flamenco & How to Visit",
  description: "Granada's cave quarter: what to see in Sacromonte, where to watch flamenco in a cave, and how to get up and back safely at night.",
  intro: "Sacromonte is the hillside of cave houses beyond the Albaicín, known as the cradle of Granada's flamenco. Here is what to see, how to get there and what a cave flamenco show is like.",
  photo: PHOTOS.generalife,
  updated: CHECKED,
  body: [
    { type: "answer", text: "Sacromonte is Granada's cave-house district on the Valparaíso hill, opposite the Alhambra and next to the Albaicín. Go in the late afternoon for the views and the cave museum, then stay for a flamenco show in one of the caves. The C34 minibus from Plaza Nueva saves you the climb." },
    { type: "h2", id: "what", text: "What Sacromonte is" },
    { type: "p", text: "Granada's tourism office calls Sacromonte the city's most distinctive neighbourhood, known for its houses dug into the hillside and considered the cradle of flamenco. Walk up the Cuesta del Chapiz from the river and turn onto the Camino del Sacromonte, lined with cave homes and small flamenco venues." },
    { type: "h2", id: "see", text: "What to see" },
    { type: "list", items: [
      "**Camino del Sacromonte.** The main lane, with whitewashed cave fronts and views back to the Alhambra.",
      "**Museo Cuevas del Sacromonte.** A cave museum on the hill that shows how families lived in the caves.",
      "**Sacromonte Abbey.** At the top of the hill, a 17th-century abbey and pilgrimage site.",
      "**The views.** Some of the best, and least crowded, views of the Alhambra in the city.",
    ] },
    { type: "h2", id: "flamenco", text: "Seeing flamenco in a Sacromonte cave" },
    { type: "p", text: "The caves host small, intimate shows, usually about an hour long, with guitar, singing and dance a few metres from your seat. Shows sell out at weekends, so book ahead, and check whether a drink or dinner is included before you choose." },
    { type: "cta", title: "Flamenco in a Sacromonte cave", text: "A one-hour show in a traditional cave on the Camino del Sacromonte.", label: "See the flamenco show", query: "Sacromonte flamenco cave show" },
    { type: "h2", id: "getting-there", text: "Getting there and back at night" },
    { type: "p", text: "Granada's tourism office says the **C34** minibus to Sacromonte leaves from Plaza Nueva. On foot, follow the river from Plaza Nueva to the Paseo de los Tristes and climb the Cuesta del Chapiz: steep but short. After a late show, a taxi or the minibus back down is easier than the dark, uneven lanes." },
    { type: "tip", title: "Combine it with the Albaicín", text: "Walk the [Albaicín](/granada/albaicin/) to San Nicolás for sunset, then carry on to Sacromonte for a late flamenco show. Guided sunset walks cover both." },
    { type: "p", text: "Planning a short stay? See [Granada in one day](/blog/granada-in-one-day/)." },
  ],
  faq: [
    { q: "Is Sacromonte worth visiting?", a: "Yes, especially in the late afternoon and evening for the views of the Alhambra and a flamenco show in a cave." },
    { q: "How do you get to Sacromonte?", a: "Take the C34 minibus from Plaza Nueva, or walk along the river to the Paseo de los Tristes and climb the Cuesta del Chapiz." },
    { q: "How long is a flamenco show in Sacromonte?", a: "Most cave shows last about an hour. Some include a drink or dinner, so check the listing." },
    { q: "Is Sacromonte safe at night?", a: "The main lane is busy on show nights, but paths are steep, uneven and dark. Take the minibus or a taxi back down after a late show." },
  ],
  sidebar: { title: "Flamenco in a cave", text: "A one-hour show in a Sacromonte cave.", label: "Check show dates", product: "Sacromonte flamenco cave show" },
  next: [
    { href: "/granada/albaicin/", title: "Albaicín", text: "The walk to San Nicolás." },
    { href: "/blog/granada-in-one-day/", title: "Granada in one day", text: "The Alhambra plus the city." },
    { href: "/tickets/night-visit/", title: "Alhambra at night", text: "Night visit days and times." },
  ],
  sources: [
    { label: "Sacromonte, turismo.granada.org", url: "https://turismo.granada.org/en/barrio-turistico/sacromonte" },
    TURISMO_FAQ,
    { label: "Sacromonte, andalucia.org", url: "https://www.andalucia.org/en/granada-cultural-tourism-sacromonte" },
    { label: "Sacromonte Abbey, andalucia.org", url: "https://andalucia.org/en/granada-cultural-tourism-abadia-del-sacromonte" },
  ],
};

// ---------------------------------------------------------------------------
// /granada/cathedral/  · primary keyword: "granada cathedral tickets"
// ---------------------------------------------------------------------------
export const CATHEDRAL: Guide = {
  path: "/granada/cathedral/",
  ogImage: "/images/og/og-cathedral.jpg",
  pageId: "cathedral",
  crumbs: [{ href: "/", label: "Home" }, { href: "/granada/cathedral/", label: "Granada Cathedral" }],
  title: "Granada Cathedral & Royal Chapel tickets: prices and tours",
  seoTitle: "Granada Cathedral & Royal Chapel Tickets: Prices & Tours",
  description: "What Granada Cathedral and the Royal Chapel cost, how prices change after 28 Nov 2026, and whether a guided tour is worth it. Checked officially.",
  intro: "Two monuments side by side in the city centre: the Renaissance cathedral and the Royal Chapel, where Ferdinand and Isabella are buried. Here's what tickets cost and how to see both.",
  photo: PHOTOS.stucco,
  updated: CHECKED,
  body: [
    { type: "answer", text: "Granada Cathedral costs €10 (reduced €8) until 28 November 2026, while the Kerygma exhibition runs, and €7 (reduced €5) from 29 November 2026. The Royal Chapel next door costs €7 (reduced €5). Children under 12 go free at both, according to the official ticket site." },
    { type: "h2", id: "prices", text: "Ticket prices" },
    { type: "table", head: ["Monument", "Adult", "Reduced", "Under 12"], rows: [
      ["Cathedral (until 28 Nov 2026)", "€10", "€8", "Free"],
      ["Cathedral (from 29 Nov 2026)", "€7", "€5", "Free"],
      ["Royal Chapel", "€7", "€5", "Free"],
    ] },
    { type: "p", text: "Reduced prices are for students up to 25, large families and people with disabilities, with proof. Prices are from the official ticket site of the Archdiocese of Granada." },
    { type: "h2", id: "hours", text: "Opening hours" },
    { type: "p", text: "Hours differ between the cathedral and the Royal Chapel and change for services and holidays. Check the official visiting-hours page on the day. Granada's monuments were inspected after the August 2026 earthquakes, and the cathedral had reopened to visitors by mid-September 2026." },
    { type: "h2", id: "royal-chapel", text: "The Royal Chapel" },
    { type: "p", text: "Next door to the cathedral, the Royal Chapel holds the tombs of the Catholic Monarchs, Ferdinand and Isabella, who took Granada in 1492. It's a separate ticket and a separate entrance, so plan time for both." },
    { type: "h2", id: "tour", text: "Guided tour or on your own?" },
    { type: "p", text: "On your own is cheaper. A guided tour covers both monuments in one booking and explains the story that links them to the Alhambra." },
    { type: "cta", title: "See the Cathedral and Royal Chapel with a guide", text: "A guided walking tour with tickets for both monuments included.", label: "See the guided tour", query: "Granada Cathedral Royal Chapel tour" },
    { type: "p", text: "Fit both into a day with the Alhambra using [Granada in one day](/blog/granada-in-one-day/), then walk on to the [Albaicín](/granada/albaicin/)." },
  ],
  faq: [
    { q: "How much is Granada Cathedral?", a: "€10 (reduced €8) until 28 November 2026, then €7 (reduced €5) from 29 November 2026. Under-12s are free." },
    { q: "Is the Royal Chapel included in the cathedral ticket?", a: "No. The Royal Chapel is a separate ticket: €7, reduced €5, under-12s free." },
    { q: "Who is buried in the Royal Chapel?", a: "The Catholic Monarchs, Ferdinand and Isabella." },
  ],
  sidebar: { title: "Both monuments, one booking", text: "Guided tour with Cathedral and Royal Chapel tickets.", label: "Check dates", product: "Granada Cathedral Royal Chapel tour" },
  next: [
    { href: "/blog/granada-in-one-day/", title: "Granada in one day", text: "The Alhambra plus the city." },
    { href: "/granada/albaicin/", title: "Albaicín", text: "The walk to San Nicolás." },
    { href: "/guide/", title: "What to see in the Alhambra", text: "The palaces, fortress and gardens." },
  ],
  sources: [
    { label: "Ticket prices, ticketsgranadacristiana.com (official)", url: "https://ticketsgranadacristiana.com/en/tarifas/" },
    { label: "Granada in October: cathedral reopened 11 Sep 2026, donporque.com", url: "https://donporque.com/que-ver-en-granada-en-octubre-durante-un-fin-de-semana/" },
  ],
};

export const GUIDES = [WHAT_TO_SEE, ALCAZABA, OPENING_HOURS, GETTING_THERE_GUIDE, NASRID_PALACES, ALBAICIN, SACROMONTE, CATHEDRAL];
