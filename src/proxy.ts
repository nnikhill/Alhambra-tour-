import { NextResponse, type NextRequest } from "next/server";
import { strictCsp } from "@/lib/csp";

// Strict nonce CSP for the admin area (always dynamic, where XSS would hurt
// most). Public pages get the static CSP from next.config headers() unless
// CSP_NONCE_EVERYWHERE=1. See src/lib/csp.ts.
export function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  const path = request.nextUrl.pathname;
  const isAdmin = path === "/admin" || path.startsWith("/admin/") || path.startsWith("/api/admin/") || path.startsWith("/api/auth/");
  if (!isAdmin && process.env.CSP_NONCE_EVERYWHERE !== "1") return NextResponse.next();

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const https = request.nextUrl.protocol === "https:" || request.headers.get("x-forwarded-proto") === "https";
  const csp = strictCsp(nonce, isDev, https);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  if (isAdmin) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store");
  }
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|images/|favicon|icon|apple-icon|robots.txt|sitemap.xml|llms.txt).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
