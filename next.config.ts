import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Only run ESLint on local development, not during build
    ignoreDuringBuilds: true,
  },
  // Add image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60, // Cache optimized images for at least 60 seconds
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Define responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Define image sizes
  },
  // Enable compression
  compress: true,
  // Add experimental optimization features
  experimental: {
    // Enable optimizeCss for production builds
    optimizeCss: true,
    // Remove modularizeImports as it's not supported in your Next.js version
    // Remove serverActions as it's not supported in the current format
    // Remove optimizePackageImports as it's not supported
  },
  // Improve output for production builds
  output: 'standalone',
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Configure powered by header
  poweredByHeader: false,
  // Add cache headers for static assets
  headers: async () => [
    {
      source: '/_next/static/(.*?)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/(.*).(jpg|jpeg|png|gif|webp|avif|ico|svg)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

export default nextConfig;