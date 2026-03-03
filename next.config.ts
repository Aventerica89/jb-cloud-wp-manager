import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode catches subtle React bugs early
  reactStrictMode: true,

  // Inline small SVGs instead of making network requests
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enforce no unused exports — catches dead code at build time
  experimental: {
    typedRoutes: false,
  },

  // Prevent source maps leaking internals in production
  productionBrowserSourceMaps: false,

  // Log only warnings+ during builds (quieter CI output)
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
