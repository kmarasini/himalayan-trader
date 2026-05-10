export const runtime = 'edge'

import React from 'react'
import { farms } from '@/lib/farms'
import { FarmCard } from '@/components/farm/FarmCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Partner Farms',
  description:
    'Meet the farmers behind every lot. Full farm profiles, GPS coordinates, and sourcing stories for all HimalayanTrader partner farms in Nepal.',
}

export default function FarmsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-forest-900 text-white py-14 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-himalaya-400 uppercase tracking-widest mb-3">
            Origin Transparency
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Partner Farms
          </h1>
          <p className="text-cream-300 text-lg max-w-xl">
            Every lot on HimalayanTrader traces back to one of these farms.
            Full GPS coordinates, farmer profiles, and long-form origin stories
            are available for every partner.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-himalaya-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-himalaya-500">
            {[
              { value: `${farms.length}`, label: 'Partner farms' },
              {
                value: `${farms.reduce((s, f) => s + f.treesCount, 0).toLocaleString()}`,
                label: 'Coffee trees',
              },
              {
                value: `${Math.round(farms.reduce((s, f) => s + f.farmSize, 0))} ha`,
                label: 'Total farm area',
              },
            ].map(({ value, label }) => (
              <div key={label} className="py-5 px-4 text-center">
                <p className="font-serif text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-himalaya-200 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farm grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      </div>
    </div>
  )
}
