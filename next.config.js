/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Active le mode strict en développement
  experimental: {}, // Laisser vide ou inclure uniquement des options valides dans les versions stables de Next.js
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Supprime les consoles en production
  },
  webpack(config, { isServer }) {
    // Ajoute la configuration de splitChunks
    config.optimization.splitChunks = {
      chunks: 'all', // Divise les chunks pour tout le code
    };
  
    return config;
  },
};

module.exports = nextConfig;
