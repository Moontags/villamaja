import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Varmistetaan, että juurihakemisto on projektin juuri eikä esim. käyttäjän kotihakemisto
    root: process.cwd(),
  },
  images: {
    qualities: [70, 75, 85, 90],
  },
};

export default nextConfig;
