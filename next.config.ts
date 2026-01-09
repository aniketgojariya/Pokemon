import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // or 'http' if needed, though https is recommended
        hostname: '**',   // Wildcard to match any hostname
        port: '',
        pathname: '/**', // Wildcard to match any path
      },
    ],
  },

};

export default nextConfig;
