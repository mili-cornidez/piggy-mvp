/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://piggy-mvp-back-production.up.railway.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;