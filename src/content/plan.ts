// "Plan your visit" content.
// Sources, Nov 2026: alhambra-patronato.es (visit rules, 300 people per half
// hour, ID, food/drink, bags); alhambradegranada.org (opening times, walk from
// Plaza Nueva 1,150 m); lovegranada.com & granadadirect.com (C30/C32 buses,
// every ~10–12 min from Plaza Isabel la Católica); granadainfo.com (15–20 min
// walk); civitatis.com, headout.com (best season and time of day, summer heat).

export const PLAN_FACTS = [
  { value: "8:30", label: "opens every day" },
  { value: "~3 h", label: "for a full visit" },
  { value: "€22.27", label: "General ticket" },
  { value: "2", label: "closed days a year" },
];

export const HOURS = [
  { season: "1 Apr – 14 Oct", day: "08:30 – 20:00", night: "Tue–Sat 22:00 – 23:30" },
  { season: "15 Oct – 31 Mar", day: "08:30 – 18:00", night: "Fri–Sat 20:00 – 21:30" },
];

export const GETTING_THERE = [
  {
    id: "walk",
    title: "Walk up",
    time: "15–20 min",
    text: "From Plaza Nueva, take the Cuesta de Gomérez up through the woods (about 1.2 km, all uphill). You come in near the Gate of Justice, close to the palaces.",
  },
  {
    id: "bus",
    title: "Alhambra minibus",
    time: "Every 10–12 min",
    text: "Red minibuses C30 and C32 leave from Plaza Isabel la Católica, by the Columbus statue. Get off at the Alhambra stops by the main entrance.",
  },
  {
    id: "taxi",
    title: "Taxi or car",
    time: "About 10 min",
    text: "Taxis drop you at the main entrance (Access Pavilion). Drivers can use the Alhambra car park next to it.",
  },
];

export const RULES = [
  { title: "Bring the ID you booked with", text: "Tickets carry your name. You must show the original passport or ID card at the entrance." },
  { title: "Be on time for the palaces", text: "Your Nasrid Palaces slot is fixed. If you miss it, you won't be let in." },
  { title: "Have your QR code ready", text: "On your phone or printed. Children under 12 need their own ticket too." },
  { title: "No food or drink inside", text: "There are set areas for eating. Smoking isn't allowed anywhere in the complex, even outdoors." },
  { title: "Keep bags small", text: "Small bags are fine. Wear a backpack on your front so it doesn't brush the walls." },
  { title: "No flash, tripod or selfie stick", text: "Photos are fine. Flash and tripods aren't, especially in the palaces." },
];

export const SEASONS = [
  { name: "Spring", months: "Apr – Jun", verdict: "Best overall", text: "Gardens in bloom and mild weather. Also the busiest time, so book weeks ahead." },
  { name: "Summer", months: "Jul – Aug", verdict: "Go early", text: "Heat can pass 35°C. Take the first slot of the day or go at night." },
  { name: "Autumn", months: "Sep – Oct", verdict: "Great choice", text: "Warm days, softer light and slightly fewer visitors than spring." },
  { name: "Winter", months: "Nov – Mar", verdict: "Quietest", text: "Fewer visitors and cool days. Shorter hours, and night visits only on Friday and Saturday." },
];

export const PLAN_FAQ = [
  {
    q: "How long do you need at the Alhambra?",
    a: "Plan on about 3 hours for the Nasrid Palaces, the Generalife and the gardens. Allow 4 or more if you like to take your time or take lots of photos.",
  },
  {
    q: "What is the best time of day to visit the Alhambra?",
    a: "The first slot of the morning on a weekday is the calmest. Midday is the busiest and hottest time, when most tour groups are inside.",
  },
  {
    q: "How do I get to the Alhambra from the city centre?",
    a: "Walk up the Cuesta de Gomérez from Plaza Nueva (15–20 minutes uphill) or take the C30 or C32 minibus from Plaza Isabel la Católica.",
  },
  {
    q: "Do I need my passport to enter the Alhambra?",
    a: "Yes. Tickets are personal, and you need the original passport or ID card you booked with. Children under 12 are listed with their adult's ID.",
  },
  {
    q: "What happens if I miss my Nasrid Palaces time?",
    a: "You can still see the rest of the Alhambra with your ticket, but you won't be let into the Nasrid Palaces. Aim to be at their entrance 30 minutes early.",
  },
  {
    q: "Is the Alcazaba open?",
    a: "Yes. It reopened on 23 September 2026 on an adapted route after the August 2026 earthquakes. Some areas may still be closed off.",
  },
];
