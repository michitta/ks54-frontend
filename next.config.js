/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ["page.tsx"],
    webpack: (config, { isServer }) => {
      return config;
    },
  };
  
  module.exports = nextConfig;
  
