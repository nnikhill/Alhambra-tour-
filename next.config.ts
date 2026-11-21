import type { NextConfig } from "next";
import { staticCsp } from "./src/lib/csp";

// STATIC_EXPORT=1 npm run build → plain HTML in /out for previews.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Every URL ends in "/" (canonicals, sitemap, internal links), so production
  // must serve them that way too; /tickets now 308-redirects to /tickets/.
  trailingSlash: true,
  ...(staticExport ? { output: "export" as const, distDir: ".next-export" } : {}),
  // Security + caching headers on Vercel (ignored by the local static export).
  // Strict nonce CSP for /admin comes from src/proxy.ts; everything else gets
  // the static CSP here so pages stay static and CDN-cached.
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    const nonceEverywhere = process.env.CSP_NONCE_EVERYWHERE === "1";
    return [
      ...(nonceEverywhere
        ? []
        : [{ source: "/((?!admin|api/admin|api/auth).*)", headers: [{ key: "Content-Security-Policy", value: staticCsp(isDev, !isDev && process.env.CSP_LOCAL_HTTP !== "1") }] }]),
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
      {
        // Photos and share images keep their file names when unchanged, so let
        // browsers and the CDN cache them for a week and revalidate after.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
