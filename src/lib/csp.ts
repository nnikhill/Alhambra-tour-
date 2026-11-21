// Content-Security-Policy, in two strengths.
//
// 1. Strict (nonce): fresh nonce per request + 'strict-dynamic'. Only scripts
//    Next.js stamps with the nonce (and scripts they load) can run. Needs
//    dynamic rendering, so by default it applies to /admin and /api/admin only.
//    Set CSP_NONCE_EVERYWHERE=1 to use it on every page (pages then stop being
//    static/CDN-cached).
// 2. Static: same restrictions minus the nonce, so public pages stay static.
//    Next's inline bootstrap scripts need 'unsafe-inline' without a nonce.

// Images may come from any https host: pasted articles keep their images,
// and Vercel Blob uploads live on their own domain. Scripts stay locked down.

function common(isDev: boolean, upgrade: boolean) {
  return [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: https:`,
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(upgrade ? ["upgrade-insecure-requests"] : []),
  ];
}

// upgrade-insecure-requests is left out on plain-http hosts (local `next start`),
// where it would turn same-origin requests into failing https ones.
export function strictCsp(nonce: string, isDev = false, upgrade = !isDev) {
  return [
    ...common(isDev, upgrade),
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "frame-ancestors 'none'",
  ].join("; ");
}

export function staticCsp(isDev = false, upgrade = !isDev) {
  return [...common(isDev, upgrade), `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`, "frame-ancestors 'self'"].join("; ");
}
