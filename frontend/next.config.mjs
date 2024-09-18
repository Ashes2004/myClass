/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Add Firebase Storage domain
  },
  reactStrictMode: false, // Set to false to avoid strict mode warnings
  eslint: {
    // Ignore ESLint errors during builds (helpful for production)
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Custom Webpack configuration if needed for specific modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Avoid 'fs' module errors in the frontend
      };
    }
    return config;
  },
};

export default nextConfig;
