import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sydneymarthoma.church",
        pathname: "/wp-content/uploads/**", // Allow images from this path
      },
    ],
  },
};

export default nextConfig;
