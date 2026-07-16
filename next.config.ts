import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "**", // dev phase-এ যেকোনো https domain allow — production-এ specific domain-এ restrict করে দিও
      },
    ],
  },
};

export default nextConfig;
