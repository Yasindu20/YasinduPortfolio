import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Only run ESLint on local development, not during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;