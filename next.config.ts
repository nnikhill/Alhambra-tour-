import type { NextConfig } from "next";

// STATIC_EXPORT=1 npm run build → plain HTML in /out for previews.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, trailingSlash: true, distDir: ".next-export" } : {}),
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
