import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/shop', destination: '/', permanent: false },
      { source: '/shop/:path*', destination: '/', permanent: false },
      { source: '/farms', destination: '/', permanent: false },
      { source: '/farms/:path*', destination: '/', permanent: false },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  serverExternalPackages: ['stripe'],
}

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

export default nextConfig
