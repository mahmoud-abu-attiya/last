/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    domains: ['elnagahtravels.com', 'backend.elnagahtravels.com', 'images.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*).(jpg|jpeg|png|svg|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig
