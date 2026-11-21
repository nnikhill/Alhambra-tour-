import { CalendarClock, IdCard, Ticket, TriangleAlert } from "lucide-react";
import { KEY_FACTS } from "@/content/facts";

const TIPS = [
  { icon: Ticket, title: "Book early", text: "General tickets often sell out weeks ahead in spring, summer and autumn." },
  { icon: CalendarClock, title: "Your palace time is fixed", text: `The Nasrid Palaces run on ${KEY_FACTS.slotMinutes}-minute slots. Miss yours and you can't get in.` },
  { icon: IdCard, title: "Bring your ID", text: "Tickets carry your name. Bring the passport or ID you booked with." },
  { icon: TriangleAlert, title: "Alcazaba closed", text: "The fortress has been closed for inspections since the August 2026 earthquakes." },
];

export function KnowBefore() {
  return (
    <section aria-labelledby="know-title" className="bg-soft py-16 sm:py-20">
      <div className="wrap">
        <h2 id="know-title" className="section-title">Good to know before you book</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIPS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-line bg-white p-6">
              <Icon className="size-7 text-brand" aria-hidden />
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-[0.95rem] text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
