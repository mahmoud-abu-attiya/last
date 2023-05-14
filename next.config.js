/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    dangerouslyAllowSVG: true,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['elnagahtravels.com', "www.pmfurniture.com", 'backend.elnagahtravels.com', "www.visitcascais.com", "d2poqm5pskresc.cloudfront.net", 'images.unsplash.com',"www.almosafer.com", "cms-cdn.almosafer.com"],
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
