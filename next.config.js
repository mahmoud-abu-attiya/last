/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    domains: ['elnagahtravels.com', 'backend.elnagahtravels.com'],
  },
}

module.exports = nextConfig
