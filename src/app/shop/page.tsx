import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { ShopContent } from '@/components/shop/ShopContent'

export const metadata: Metadata = {
  title: 'Shop Green Coffee Beans',
  description:
    'Browse all available lots of unroasted specialty green coffee from Nepal. Filter by processing method, region, and altitude.',
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="bg-forest-900 text-white py-14 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-himalaya-400 uppercase tracking-widest mb-3">
            2024 Harvest
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Green Coffee Lots
          </h1>
          <p className="text-cream-300 text-lg max-w-xl">
            All lots are unroasted arabica sourced directly from verified
            Nepalese farms. Minimum order 250g. Wholesale from 25 kg.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="py-12 text-center text-charcoal-500 text-sm">Loading lots…</div>}>
        <ShopContent />
      </Suspense>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-forest-900 text-white p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-2">
            Roaster or importer?
          </h2>
          <p className="text-cream-300 mb-6">
            Wholesale pricing starts at 25 kg. Sample packs available for all
            listed lots.
          </p>
          <a
            href="/wholesale"
            className="inline-flex items-center gap-2 bg-himalaya-500 hover:bg-himalaya-600 text-white font-medium px-6 py-3 rounded-md transition-colors"
          >
            Get Wholesale Pricing
          </a>
        </div>
      </div>
    </div>
  )
}
