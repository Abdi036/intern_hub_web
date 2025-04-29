// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "intern-hub-server.onrender.com" }],
  },
};

export default nextConfig;
