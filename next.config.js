/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: `dist`,
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
