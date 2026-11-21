import type { Metadata } from "next";

// Admin lives outside the public (site) group: no site header/footer, never
// indexed, always rendered per request (needed for the CSP nonce).
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-soft text-ink">{children}</div>;
}
