import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.197'],
  experimental: {
    optimizePackageImports: ['simple-icons'],
  },
};

export default nextConfig;
