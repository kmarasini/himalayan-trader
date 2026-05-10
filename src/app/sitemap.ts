import type { MetadataRoute } from 'next'
import { coffeeLots } from '@/lib/products'
import { farms } from '@/lib/farms'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://himalayantrader.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages = ['/', '/shop', '/farms', '/wholesale', '/about'].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.8,
    }),
  )

  const lotPages = coffeeLots
    .filter((l) => l.available)
    .map((lot) => ({
      url: `${BASE}/shop/${lot.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const farmPages = farms.map((farm) => ({
    url: `${BASE}/farms/${farm.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...static_pages, ...lotPages, ...farmPages]
}
