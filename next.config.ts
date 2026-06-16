import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.105", "localhost"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "whitelion-assets.blr1.cdn.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
