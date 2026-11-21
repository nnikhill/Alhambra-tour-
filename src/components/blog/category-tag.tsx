const TAG: Record<string, string> = {
  planning: "bg-[#eef1f8] text-brand",
  tips: "bg-[#f8e7d2] text-[#8a4b0a]",
  news: "bg-[#fde8e7] text-[#a3261c]",
  history: "bg-[#f3e6d8] text-[#6b3d0a]",
};

export function CategoryTag({ c }: { c: { slug: string; name: string } | null }) {
  if (!c) return null;
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.78rem] font-semibold ${TAG[c.slug] ?? "bg-soft text-ink"}`}>{c.name}</span>;
}
