import { listPublished } from "@/lib/blog/repo";
import { absoluteUrl } from "@/lib/site";

// /llms.txt: plain-text site map for AI assistants. Key pages are fixed; the
// guides list comes from the published posts, so new posts appear here too.
export const revalidate = 3600;

const HEAD = '# Alhambra Tour Ticket\n\n> Independent visitor guide to the Alhambra in Granada, Spain: ticket types and official prices, Nasrid Palaces entry times, opening hours, guided tours and day trips. Not the official Alhambra website. Ticket and tour links go to GetYourGuide (affiliate).\n\n## Key pages\n- [Alhambra tickets compared](https://www.alhambratourticket.com/tickets/): every ticket type, official prices, which include the Nasrid Palaces\n- [Nasrid Palaces tickets and entry time](https://www.alhambratourticket.com/tickets/nasrid-palaces/)\n- [Alhambra tickets sold out](https://www.alhambratourticket.com/tickets/sold-out/): ways in when tickets are gone\n- [Alhambra opening hours](https://www.alhambratourticket.com/plan/opening-hours/)\n- [How to get to the Alhambra](https://www.alhambratourticket.com/plan/getting-there/)\n- [What to see in the Alhambra](https://www.alhambratourticket.com/guide/)\n- [Alhambra night visit](https://www.alhambratourticket.com/tickets/night-visit/)\n- [Guided tours compared](https://www.alhambratourticket.com/tours/)\n- [Day trips from Seville and Málaga](https://www.alhambratourticket.com/day-trips/)';
const TAIL = 'Facts are checked against the official site, alhambra-patronato.es. Last checked: 2026-11-21.';

export async function GET() {
  const posts = await listPublished();
  const guides = posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}/`)})`).join("\n");
  const local = "- [Albaicín](" + absoluteUrl("/granada/albaicin/") + "), [Sacromonte](" + absoluteUrl("/granada/sacromonte/") + "), [Granada Cathedral](" + absoluteUrl("/granada/cathedral/") + ")";
  const body = `${HEAD}\n\n## Visitor guides\n${guides}\n${local}\n\n${TAIL}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
