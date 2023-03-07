// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n,
};

module.exports = nextConfig;
