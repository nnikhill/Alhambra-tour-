import type { Post } from "@/content/posts";

const TAG: Record<Post["category"], string> = {
  Planning: "bg-[#eef1f8] text-brand",
  Tips: "bg-[#f8e7d2] text-[#8a4b0a]",
  News: "bg-[#fde8e7] text-[#a3261c]",
};

export function CategoryTag({ c }: { c: Post["category"] }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.78rem] font-semibold ${TAG[c]}`}>{c}</span>;
}

