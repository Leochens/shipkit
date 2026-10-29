import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Use the compiler API so type checking works without a detached CLI process.
  experimental: { useTypeScriptCli: false },
};

export default nextConfig;
