import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve hero assets directly from /public — avoids Vercel Image Optimization
    // quota limits that break lazy-loaded slides in production.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tvqzwrzwaadgbcczjmqs.supabase.co",
      },
      {
        protocol: "https",
        hostname: "sushiboom.com.ar",
      },
      {
        protocol: "https",
        hostname: "valiant-deer-565.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "valiant-deer-565.convex.site",
      },
    ],
  },
};

export default nextConfig;
