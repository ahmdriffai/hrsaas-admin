import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["www.gravatar.com"],
    dangerouslyAllowLocalIP: true, // 🔥 ini kunci
  },
  output: "standalone",
};

export default nextConfig;
