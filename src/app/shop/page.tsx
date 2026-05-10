import React from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import { coffeeLots } from '@/lib/products'
import type { Metadata } from 'next'
import type { ProcessingMethod } from '@/types'

export const metadata: Metadata = {
  title: 'Shop Green Coffee Beans',
  description:
    'Browse all available lots of unroasted specialty green coffee from Nepal. Filter by processing method, region, and altitude.',
}

const processingFilters = [
  { value: '', label: 'All Processing' },
  { value: 'washed', label: 'Washed' },
  { value: 'natural', label: 'Natural' },
  { value: 'honey', label: 'Honey Process' },
]

interface ShopPageProps {
  searchParams: Promise<{ process?: string; region?: string; featured?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { process, region, featured } = await searchParams

  let lots = coffeeLots.filter((l) => l.available)

  if (process) {
    lots = lots.filter((l) => l.processing === (process as ProcessingMethod))
  }
  if (region) {
    lots = lots.filter((l) =>
      l.origin.region.toLowerCase().includes(region.toLowerCase()),
    )
  }
  if (featured === 'true') {
    lots = lots.filter((l) => l.featured)
  }

  const activeProcess = process ?? ''

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Page header */}
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

      {/* Filters */}
      <div className="border-b border-cream-200 bg-white sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-sm text-charcoal-500 whitespace-nowrap mr-2">Filter:</span>
          {processingFilters.map(({ value, label }) => (
            <a
              key={value}
              href={value ? `/shop?process=${value}` : '/shop'}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeProcess === value
                  ? 'bg-forest-700 text-white border-forest-700'
                  : 'bg-white text-charcoal-600 border-cream-300 hover:border-forest-400'
              }`}
            >
              {label}
            </a>
          ))}
          {(process || region || featured) && (
            <a
              href="/shop"
              className="whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium text-red-600 border-red-200 hover:bg-red-50 transition-colors"
            >
              Clear filters
            </a>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {lots.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-charcoal-700 mb-3">
              No lots match that filter
            </p>
            <a href="/shop" className="text-forest-700 hover:underline text-sm">
              Clear filters →
            </a>
          </div>
        ) : (
          <>
            <p className="text-sm text-charcoal-500 mb-6">
              {lots.length} lot{lots.length !== 1 ? 's' : ''} available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lots.map((lot) => (
                <ProductCard key={lot.id} lot={lot} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Wholesale nudge */}
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
