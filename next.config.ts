import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    domains: ["drive.google.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sydneymarthoma.church",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
