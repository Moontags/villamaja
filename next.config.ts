import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Varmistetaan, että juurihakemisto on projektin juuri eikä esim. käyttäjän kotihakemisto
    root: process.cwd(),
  },
  images: {
    qualities: [70, 75, 85, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },
};

export default nextConfig;
