import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, // set to false if you want a temporary redirect (307 status code)
      },
    ];
  },
};

module.exports = nextConfig;
