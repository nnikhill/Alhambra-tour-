import { SITE } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@/components/analytics";
import { GoogleTagManager } from "@/components/google-tag-manager";

// Public website chrome: header, footer, site-wide JSON-LD and analytics.
// The admin area (src/app/admin) has its own layout without these.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <GoogleTagManager />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 btn btn-white">
          Skip to content
        </a>
        <JsonLd
          data={[
            { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
              logo: `${SITE.url}/images/logo.png`,
              description: "Independent visitor guide and GetYourGuide affiliate. Not affiliated with the Patronato de la Alhambra y Generalife.",
            },
          ]}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics vercel={!!process.env.VERCEL} />
    </>
  );
}
