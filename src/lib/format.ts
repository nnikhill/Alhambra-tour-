// Accepts "2026-11-21" or a full ISO timestamp. Dates are shown in Spain's
// time zone so a post published late at night doesn't show the previous day.
export function formatDate(iso: string) {
  const d = iso.length <= 10 ? new Date(iso + "T12:00:00Z") : new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Madrid" });
}

export function euro(n: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(n);
}
