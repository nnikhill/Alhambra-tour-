import { Check, X } from "lucide-react";
import { KEY_FACTS } from "@/content/facts";
import { gygUrl } from "@/lib/gyg";

const ROWS: { label: string; official: boolean | string; tour: boolean | string }[] = [
  { label: "Price per adult", official: `Official €${KEY_FACTS.generalPrice} + booking fee`, tour: "Higher: guide included" },
  { label: "Nasrid Palaces included", official: true, tour: true },
  { label: "Available for most dates", official: "Often sold out", tour: true },
  { label: "Cancellation", official: "Usually non-refundable", tour: "Varies: check the listing" },
  { label: "Expert guide", official: false, tour: true },
  { label: "Gets you to your palace slot on time", official: false, tour: true },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto size-5 text-brand" aria-label="Yes" />;
  if (v === false) return <X className="mx-auto size-5 text-[#9aa1ad]" aria-label="No" />;
  return <span className="font-semibold">{v}</span>;
}

export function Compare() {
  return (
    <section id="compare" aria-labelledby="compare-title" className="scroll-mt-24 bg-soft py-16 sm:py-20">
      <div className="wrap grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <h2 id="compare-title" className="section-title">Entry ticket or guided tour?</h2>
          <p className="mt-4 text-muted">
            Happy exploring alone? An entry ticket is the cheapest way in. Want the history explained, or are entry tickets gone for your date? Book a guided tour with the ticket included.
          </p>
          <p className="mt-4 text-muted">
            Licensed tour operators book their own tickets in advance, which is why tours often still have places when entry tickets are gone.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full text-center text-[0.97rem]">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="w-[44%] p-4 text-left text-sm font-medium text-muted"><span className="sr-only">Feature</span></th>
                <th scope="col" className="p-4 font-bold">Entry ticket</th>
                <th scope="col" className="bg-[#eef1f8] p-4 font-bold text-brand">Guided tour</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-b border-line last:border-0">
                  <th scope="row" className="p-4 text-left font-medium">{r.label}</th>
                  <td className="p-4"><Cell v={r.official} /></td>
                  <td className="bg-[#f6f8fc] p-4"><Cell v={r.tour} /></td>
                </tr>
              ))}
              <tr>
                <td className="p-4" />
                <td className="p-4">
                  <a
                    href={gygUrl("Alhambra entry ticket", { page: "home", position: "compare_ticket" })}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn btn-outline min-h-11 w-full px-3 text-[0.92rem]"
                    data-track="affiliate_click"
                  >
                    See tickets
                  </a>
                </td>
                <td className="bg-[#f6f8fc] p-4">
                  <a
                    href={gygUrl("Alhambra guided tour Nasrid Palaces", { page: "home", position: "compare" })}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn btn-primary min-h-11 w-full px-3 text-[0.92rem]"
                    data-track="affiliate_click"
                  >
                    See tours
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
