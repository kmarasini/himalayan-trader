'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/product/ProductCard'
import { coffeeLots } from '@/lib/products'
import type { ProcessingMethod } from '@/types'

const processingFilters = [
  { value: '', label: 'All Processing' },
  { value: 'washed', label: 'Washed' },
  { value: 'natural', label: 'Natural' },
  { value: 'honey', label: 'Honey Process' },
]

export function ShopContent() {
  const searchParams = useSearchParams()
  const process = searchParams.get('process') ?? ''
  const region = searchParams.get('region') ?? ''
  const featured = searchParams.get('featured') ?? ''

  let lots = coffeeLots.filter((l) => l.available)
  if (process) lots = lots.filter((l) => l.processing === (process as ProcessingMethod))
  if (region) lots = lots.filter((l) => l.origin.region.toLowerCase().includes(region.toLowerCase()))
  if (featured === 'true') lots = lots.filter((l) => l.featured)

  const hasFilters = process || region || featured

  return (
    <>
      <div className="border-b border-cream-200 bg-white sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-sm text-charcoal-500 whitespace-nowrap mr-2">Filter:</span>
          {processingFilters.map(({ value, label }) => (
            <a
              key={value}
              href={value ? `/shop?process=${value}` : '/shop'}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                process === value
                  ? 'bg-forest-700 text-white border-forest-700'
                  : 'bg-white text-charcoal-600 border-cream-300 hover:border-forest-400'
              }`}
            >
              {label}
            </a>
          ))}
          {hasFilters && (
            <a
              href="/shop"
              className="whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium text-red-600 border-red-200 hover:bg-red-50 transition-colors"
            >
              Clear filters
            </a>
          )}
        </div>
      </div>

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
    </>
  )
}
