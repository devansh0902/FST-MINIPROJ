import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Exp 12: small Docker image
  images: {
    // Exp 9: remote hosts allowed for next/image
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};
export default nextConfig;
