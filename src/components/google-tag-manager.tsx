import Script from "next/script";

// Google Tag Manager for the public site only (the admin never loads it).
// Consent Mode v2: in the EEA/UK/Switzerland, analytics and ad storage start as
// "denied" (cookieless pings) until a consent banner (CMP) grants them; other
// regions start as "granted". gtm.js loads once the page has finished loading
// (clicks before that are queued in dataLayer), so it doesn't slow the page.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NWMGCK7X";

const EEA = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH"];

export function GoogleTagManager() {
  if (!/^GTM-[A-Z0-9]+$/.test(GTM_ID)) return null;
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,region:${JSON.stringify(EEA)}});
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`;
  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">{init}</Script>
      <Script id="gtm" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
      </noscript>
    </>
  );
}
