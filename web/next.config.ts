import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives in a subdirectory alongside another lockfile at the
  // repo root (the mobile-app-mockup project) — pin the workspace root so
  // Next doesn't have to guess.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
