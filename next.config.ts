import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsHmrCache: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
