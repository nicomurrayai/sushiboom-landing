import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve hero assets directly from /public — avoids Vercel Image Optimization
    // quota limits that break lazy-loaded slides in production.
    unoptimized: true,
  },
};

export default nextConfig;
