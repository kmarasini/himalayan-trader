'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, ArrowRight, ShoppingBag } from 'lucide-react'
import type { CoffeeLot } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { toast } from '@/components/ui/toaster'
import { formatPriceFromDollars, processingLabel, processingColor, cn } from '@/lib/utils'

interface ProductCardProps {
  lot: CoffeeLot
  className?: string
}

export function ProductCard({ lot, className }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  const [adding, setAdding] = useState(false)

  async function handleQuickAdd() {
    setAdding(true)
    addItem({
      lotId: lot.id,
      lotSlug: lot.slug,
      lotNumber: lot.lotNumber,
      name: lot.name,
      size: '250g',
      price: lot.pricing.retail['250g'],
      quantity: 1,
      image: lot.images[0],
    })
    toast({
      variant: 'success',
      title: 'Added to cart',
      description: `${lot.name} (250g)`,
    })
    openCart()
    await new Promise((r) => setTimeout(r, 600))
    setAdding(false)
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300',
        className,
      )}
    >
      {/* Image */}
      <Link href={`/shop/${lot.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-cream-100">
        <Image
          src={lot.images[0]}
          alt={lot.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Score badge */}
        <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow font-mono text-xs font-bold text-forest-700 backdrop-blur-sm">
          {lot.gradeScore}
        </div>
        {/* Featured ribbon */}
        {lot.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="text-xs">
              Featured
            </Badge>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Processing + Region */}
        <div className="flex items-center gap-2 mb-3">
          <span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full', processingColor(lot.processing))}>
            {processingLabel(lot.processing)}
          </span>
          <span className="flex items-center gap-1 text-xs text-charcoal-500">
            <MapPin className="h-3 w-3" />
            {lot.origin.region} · {lot.origin.altitude}m
          </span>
        </div>

        {/* Name */}
        <Link href={`/shop/${lot.slug}`}>
          <h3 className="font-serif text-xl font-semibold text-charcoal-900 group-hover:text-forest-700 transition-colors mb-1">
            {lot.name}
          </h3>
        </Link>
        <p className="text-sm text-charcoal-500 line-clamp-2 mb-3">
          {lot.shortDescription}
        </p>

        {/* Flavor notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lot.cuppingProfile.flavor.slice(0, 3).map((note) => (
            <span key={note} className="text-xs bg-cream-100 text-charcoal-600 px-2 py-0.5 rounded-full border border-cream-200">
              {note}
            </span>
          ))}
        </div>

        {/* Lot number */}
        <p className="lot-number text-charcoal-400 mb-4">
          Lot #{lot.lotNumber}
        </p>

        {/* Price + actions */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-charcoal-500">from</span>
            <span className="ml-1 text-lg font-bold text-charcoal-900">
              {formatPriceFromDollars(lot.pricing.retail['250g'])}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleQuickAdd}
              disabled={adding}
              aria-label="Quick add to cart"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" asChild>
              <Link href={`/shop/${lot.slug}`}>
                View Lot
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
