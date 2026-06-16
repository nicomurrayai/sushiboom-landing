import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
