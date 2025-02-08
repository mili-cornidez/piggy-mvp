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
        destination: "https://localhost:3001/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
