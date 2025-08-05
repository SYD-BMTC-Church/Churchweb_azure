import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["drive.google.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "sydneymarthoma.church",
        pathname: "/wp-content/uploads/**", // Allow images from this path
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc?id=**", // Allow images from this path
      },
    ],
  },
};

export default nextConfig;
