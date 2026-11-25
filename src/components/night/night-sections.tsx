import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Euro,
  Landmark,
  Play,
  Shield,
  Trees,
} from "lucide-react";
import { DAY_VS_NIGHT, NIGHT_PLAN, NIGHT_QUERY } from "@/content/night";
import { gygUrl } from "@/lib/gyg";

/* Section 2: Three ways in after dark */
export function NightOptions() {
  const options = [
    {
      id: "guided",
      badge: "Easiest to get",
      image: "/images/photos/night-hero-960.webp",
      alt: "The illuminated Alhambra fortress at night",
      subtitle: "Guided night tour",
      price: "Live price on GetYourGuide",
      description: "A licensed guide walks you through the palaces and explains what you're seeing in the dark.",
      points: [
        "Night ticket included",
        "Often available when night tickets are gone",
        "Cancellation terms on each listing",
      ],
      ctaLabel: "See night tours",
      ctaKind: "primary",
      href: gygUrl(NIGHT_QUERY, { page: "night", position: "card_guided" }),
    },
    {
      id: "ticket",
      image: "/images/photos/night-lions-800.webp",
      alt: "Court of the Lions arches lit with soft lighting at night",
      subtitle: "Night entry ticket",
      price: "Official price €12.73",
      description: "The cheapest way in. You visit the palaces on your own at your booked time. Resale tickets on GetYourGuide are a little more.",
      points: [
        "Nasrid Palaces only",
        "Usually no changes or refunds",
        "Sells out fast on weekends",
      ],
      ctaLabel: "Night entry tickets",
      ctaKind: "outline",
      href: gygUrl("Alhambra night entry ticket", { page: "night", position: "card_ticket" }),
    },
    {
      id: "experiences",
      image: "/images/photos/hero-960.webp",
      alt: "The Alhambra complex illuminated across the hill",
      subtitle: "Alhambra Experiences",
      price: "Official price €22.27",
      description: "An official combined ticket: palaces at night, with the Generalife and gardens today the next morning. GetYourGuide sells this night and gardens visits as separate tickets.",
      points: [
        "Night + day on one ticket",
        "Best if you're in Granada 2 days",
        "Or book night + gardens tickets separately",
      ],
      ctaLabel: "Compare night tickets",
      ctaKind: "outline",
      href: gygUrl("Alhambra Experiences night tour", { page: "night", position: "card_experiences" }),
    },
  ];

  return (
    <section id="night-options" aria-labelledby="opts-title" className="scroll-mt-24 bg-[#fbf9f5] py-14 sm:py-18">
      <div className="wrap">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-deep">
            &mdash; NIGHT VISIT OPTIONS &mdash;
          </p>
          <h2 id="opts-title" className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            3 ways to see the Alhambra at night
          </h2>
          <p className="mx-auto mt-2.5 max-w-[56ch] text-sm text-muted sm:text-base">
            Official prices per adult. Tours and resale tickets show the live price for your date before you pay.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {options.map((o) => (
            <article
              key={o.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Image with optional badge */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-soft">
                <img
                  src={o.image}
                  alt={o.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
                {o.badge && (
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-[#f4b740] px-3 py-1 text-xs font-bold text-ink shadow-sm">
                    {o.badge}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {o.subtitle}
                </span>
                <h3 className="mt-1 font-serif text-xl font-bold text-ink">
                  {o.price}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {o.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line/60 pt-4 text-sm text-[#2b313b]">
                  {o.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#1e3425]" aria-hidden />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <a
                    href={o.href}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className={`flex h-11 w-full items-center justify-center gap-1.5 rounded-xl font-semibold transition ${
                      o.ctaKind === "primary"
                        ? "bg-[#1e3425] text-white hover:bg-[#15261b]"
                        : "border border-line bg-white text-ink hover:bg-[#faf8f5]"
                    }`}
                    data-track="affiliate_click"
                  >
                    <span>{o.ctaLabel}</span>
                    {o.ctaKind === "primary" && <ArrowRight className="size-4" />}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Section 3: Day vs night, side by side */
export function DayVsNight() {
  const rows = [
    { label: "Nasrid Palaces", icon: Landmark, day: "Yes", night: "Yes, lit after dark" },
    { label: "Generalife gardens", icon: Trees, day: "Yes", night: "No (separate night ticket)" },
    { label: "Alcazaba fortress", icon: Shield, day: "Yes (adapted route)", night: "No" },
    { label: "Time inside", icon: Clock, day: "About 3 hours", night: "About 1.5 hours" },
    { label: "Official price", icon: Euro, day: "€22.27", night: "€12.73" },
    { label: "Runs", icon: Calendar, day: "Every day", night: "2–5 nights a week" },
  ];

  return (
    <section aria-labelledby="dvn-title" className="bg-[#fbf9f5] border-t border-line/50 py-14 sm:py-18">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-deep">
            &mdash; USEFUL INFO &mdash;
          </p>
          <h2 id="dvn-title" className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Night visit or day visit?
          </h2>
          <p className="mt-3.5 max-w-[46ch] text-sm leading-relaxed text-muted sm:text-base">
            The night visit is the Nasrid Palaces only, while visiting with far fewer people. It&rsquo;s the best second visit
            here. If you only have one visit, go by day so you also get the gardens.
          </p>
          <Link
            href="/tickets/"
            className="mt-5 inline-flex items-center gap-1.5 font-semibold text-ink underline underline-offset-4 hover:text-[#b87428]"
          >
            <span>Compare all ticket types</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-[#f8f6f2]">
                <th scope="col" className="w-[40%] px-5 py-3.5 font-semibold text-muted">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="px-5 py-3.5 font-bold text-ink">
                  By day
                </th>
                <th scope="col" className="bg-[#1e3425] px-5 py-3.5 font-bold text-white">
                  At night
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => {
                const Icon = r.icon;
                return (
                  <tr key={r.label} className="transition-colors hover:bg-[#fbfaf8]">
                    <th scope="row" className="flex items-center gap-2.5 px-5 py-3.5 font-semibold text-ink">
                      <Icon className="size-4 text-[#b87428]" />
                      <span>{r.label}</span>
                    </th>
                    <td className="px-5 py-3.5 text-muted">{r.day}</td>
                    <td className="bg-[#f2f7f3] px-5 py-3.5 font-semibold text-ink">{r.night}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* Section 4: How a night visit goes */
export function NightPlan() {
  const steps = [
    {
      num: 1,
      title: "Pick a night it runs",
      text: "In winter that's only Friday and Saturday, so check your dates with the tool above before you plan dinner.",
    },
    {
      num: 2,
      title: "Book ticket or guided tour",
      text: "Night tickets go fast on weekends. If they are gone, a guided night tour with the ticket included often fills places.",
    },
    {
      num: 3,
      title: "Arrive 30 minutes early",
      text: "Bring the passport or ID you booked with. Your entry time is printed on the ticket and arrivals can be refused.",
    },
    {
      num: 4,
      title: "Walk the palaces in the dark",
      text: "Marvel at the Nasrid Palaces, the Court of the Myrtles, then the Court of the Lions. No flash, please. It's a special experience.",
    },
    {
      num: 5,
      title: "See it up close from across the valley",
      text: "Afterwards, head over to the Mirador de San Nicolás in the Albaicín for the classic view of the Alhambra glowing on its hill.",
    },
  ];

  return (
    <section aria-labelledby="plan-title" className="bg-[#fbf9f5] border-t border-line/50 py-14 sm:py-18">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* Left Side: Photo with play button */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[4/5] sm:rounded-3xl shadow-md">
          <img
            src="/images/photos/abencerrages-1280.webp"
            alt="Alhambra arched pavilion with tiled roof and cypress trees overlooking Granada"
            loading="lazy"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex size-14 items-center justify-center rounded-full border-2 border-white/60 bg-black/40 text-white shadow-xl backdrop-blur-md transition-transform hover:scale-105">
              <Play className="ml-0.5 size-6 fill-white text-white" />
            </span>
          </div>
        </div>

        {/* Right Side: Step list */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-deep">
            &mdash; HOW TO PLAN &mdash;
          </p>
          <h2 id="plan-title" className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            How to plan your night at the Alhambra
          </h2>

          <ol className="mt-7 space-y-5">
            {steps.map((s) => (
              <li key={s.num} className="grid grid-cols-[2.25rem_1fr] items-start gap-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#1e3425] font-bold text-sm text-white shadow-sm">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-bold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}