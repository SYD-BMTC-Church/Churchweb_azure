/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
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

module.exports = nextConfig;