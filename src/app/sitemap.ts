import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://himalayantrader.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/wholesale', '/about', '/contact'].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }))
}
