import type { NextConfig } from "next";

// English lives at the root (/, /sisoc, /shineapp); Spanish under /es.
// Internally every page is under app/[lang], so the English root paths are rewritten to /en/*,
// and direct /en/* visits are redirected to the root to avoid duplicate URLs.
const EN_PATHS = ["", "/sisoc", "/shineapp"];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      // social images stay under /en: their generated URLs point there and have no root rewrite
      { source: "/en/:path((?!(?:.*/)?opengraph-image$).*)", destination: "/:path", permanent: true },
    ];
  },
  async rewrites() {
    return EN_PATHS.map((p) => ({ source: p || "/", destination: `/en${p}` }));
  },
};

export default nextConfig;
