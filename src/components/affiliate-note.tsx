import Link from "next/link";

// Shown near the first booking link on every money page (FTC and GetYourGuide
// partner rules): who we are, and that ticket/tour links are affiliate links.
export function AffiliateNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[0.85rem] leading-snug text-muted ${className}`}>
      Independent guide, not the official Alhambra ticket seller. Ticket and tour links go to GetYourGuide, and we may earn a
      commission at no extra cost to you.{" "}
      <Link href="/affiliate-disclosure/" className="underline underline-offset-2">How we earn</Link>
    </p>
  );
}
