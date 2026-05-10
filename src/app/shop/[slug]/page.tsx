'use client'

export const runtime = 'edge'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin,
  Mountain,
  Leaf,
  Calendar,
  Package,
  ArrowLeft,
  CheckCircle,
  ShoppingBag,
} from 'lucide-react'
import { getLotBySlug, coffeeLots } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ProductCard } from '@/components/product/ProductCard'
import { useCartStore } from '@/store/cart'
import { toast } from '@/components/ui/toaster'
import {
  formatPriceFromDollars,
  processingLabel,
  processingColor,
  scoreLabel,
  altitudeLabel,
  cn,
} from '@/lib/utils'
import type { CartItemSize } from '@/types'

const sizeOptions: CartItemSize[] = ['250g', '500g', '1kg']

interface Props {
  params: Promise<{ slug: string }>
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = React.use(params)
  const lot = getLotBySlug(slug)
  if (!lot) notFound()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<CartItemSize>('250g')
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)

  const { addItem, openCart } = useCartStore()

  async function handleAddToCart() {
    if (!lot) return
    setAdding(true)
    addItem({
      lotId: lot.id,
      lotSlug: lot.slug,
      lotNumber: lot.lotNumber,
      name: lot.name,
      size: selectedSize,
      price: lot.pricing.retail[selectedSize],
      quantity: qty,
      image: lot.images[0],
    })
    toast({
      variant: 'success',
      title: 'Added to cart',
      description: `${lot.name} · ${selectedSize} × ${qty}`,
    })
    openCart()
    await new Promise((r) => setTimeout(r, 600))
    setAdding(false)
  }

  const relatedLots = coffeeLots
    .filter(
      (l) =>
        l.id !== lot.id &&
        (l.origin.region === lot.origin.region || l.processing === lot.processing) &&
        l.available,
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-charcoal-500">
          <Link href="/shop" className="flex items-center gap-1 hover:text-forest-700 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Shop
          </Link>
          <span>/</span>
          <span className="text-charcoal-800 font-medium">{lot.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* ── Image gallery ─── */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-cream-100 shadow-md">
              <Image
                src={lot.images[selectedImage]}
                alt={lot.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {lot.images.length > 1 && (
              <div className="flex gap-3">
                {lot.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      'relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all',
                      selectedImage === i
                        ? 'border-forest-700 shadow-md'
                        : 'border-cream-200 opacity-70 hover:opacity-100',
                    )}
                  >
                    <Image
                      src={src}
                      alt={`${lot.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ─── */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={cn('text-xs font-semibold px-3 py-1 rounded-full', processingColor(lot.processing))}>
                {processingLabel(lot.processing)}
              </span>
              {lot.certifications.map((cert) => (
                <Badge key={cert} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>

            <h1 className="font-serif text-4xl font-bold text-charcoal-900 mb-2">
              {lot.name}
            </h1>
            <p className="text-lg text-charcoal-500 mb-6">{lot.tagline}</p>

            {/* Origin strip */}
            <div className="flex flex-wrap gap-4 text-sm text-charcoal-600 mb-6 p-4 bg-cream-100 rounded-xl">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-himalaya-600" />
                {lot.origin.region}, Nepal
              </span>
              <span className="flex items-center gap-1.5">
                <Mountain className="h-4 w-4 text-himalaya-600" />
                {lot.origin.altitude}m · {altitudeLabel(lot.origin.altitude)}
              </span>
              <span className="flex items-center gap-1.5">
                <Leaf className="h-4 w-4 text-himalaya-600" />
                {lot.varietal.join(', ')}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-himalaya-600" />
                {lot.harvestSeason} {lot.harvestYear}
              </span>
            </div>

            {/* Q Score */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col items-center justify-center h-16 w-16 rounded-full bg-forest-700 text-white">
                <span className="font-mono text-xl font-bold leading-none">
                  {lot.gradeScore}
                </span>
                <span className="text-[10px] text-cream-200">Q-SCORE</span>
              </div>
              <div>
                <p className="font-semibold text-charcoal-800">{scoreLabel(lot.gradeScore)}</p>
                <p className="text-sm text-charcoal-500">
                  Certified by licensed Q-Grader · Lot #{lot.lotNumber}
                </p>
              </div>
            </div>

            {/* Cup profile summary */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500 mb-3">
                Cup Profile
              </p>
              <div className="flex flex-wrap gap-2">
                {lot.cuppingProfile.flavor.map((note) => (
                  <span
                    key={note}
                    className="bg-himalaya-50 border border-himalaya-200 text-himalaya-800 text-sm px-3 py-1 rounded-full"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <p className="text-sm text-charcoal-600 mt-3 italic">
                {lot.cuppingProfile.aftertaste}
              </p>
            </div>

            <Separator className="mb-6" />

            {/* Pricing & size */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-500 mb-3">
                Select Size
              </p>
              <div className="flex gap-3">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'flex-1 rounded-xl border-2 py-3 text-center transition-all',
                      selectedSize === size
                        ? 'border-forest-700 bg-forest-50'
                        : 'border-cream-300 hover:border-forest-400',
                    )}
                  >
                    <p className="text-sm font-semibold text-charcoal-800">{size}</p>
                    <p className="text-xs font-bold text-forest-700 mt-0.5">
                      {formatPriceFromDollars(lot.pricing.retail[size])}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-cream-300 rounded-md">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2.5 text-lg hover:bg-cream-100 transition-colors rounded-l-md"
                >
                  −
                </button>
                <span className="px-4 py-2.5 text-sm font-medium min-w-[3rem] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2.5 text-lg hover:bg-cream-100 transition-colors rounded-r-md"
                >
                  +
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={adding}
              >
                <ShoppingBag className="h-5 w-5" />
                {adding ? 'Adding…' : `Add to Cart · ${formatPriceFromDollars(lot.pricing.retail[selectedSize] * qty)}`}
              </Button>
            </div>

            {/* Lot availability */}
            <div className="flex items-center gap-2 p-3 bg-cream-100 rounded-lg text-sm text-charcoal-600">
              <Package className="h-4 w-4 text-himalaya-600" />
              <span>
                <strong>{lot.lotSize} kg</strong> available in this lot ·
                Export ready: {lot.exportReadyDate}
              </span>
            </div>

            {/* Wholesale link */}
            <p className="text-sm text-charcoal-500 mt-4">
              Need more than 25 kg?{' '}
              <Link href="/wholesale" className="text-forest-700 hover:underline font-medium">
                Request wholesale pricing →
              </Link>
            </p>
          </div>
        </div>

        {/* ── Detailed tabs ─── */}
        <div className="mb-16">
          <Tabs defaultValue="story">
            <TabsList className="mb-8">
              <TabsTrigger value="story">Lot Story</TabsTrigger>
              <TabsTrigger value="cupping">Cupping Data</TabsTrigger>
              <TabsTrigger value="traceability">Traceability</TabsTrigger>
              <TabsTrigger value="farm">Farm Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="story">
              <div className="max-w-3xl prose prose-charcoal">
                {lot.story.split('\n\n').map((para, i) => (
                  <p key={i} className="text-charcoal-700 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cupping">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
                {[
                  { label: 'Aroma', value: lot.cuppingProfile.aroma.join(', ') },
                  { label: 'Flavor', value: lot.cuppingProfile.flavor.join(', ') },
                  { label: 'Aftertaste', value: lot.cuppingProfile.aftertaste },
                  { label: 'Acidity', value: lot.cuppingProfile.acidity },
                  { label: 'Body', value: lot.cuppingProfile.body },
                  { label: 'Sweetness', value: lot.cuppingProfile.sweetness },
                  { label: 'Overall Score', value: `${lot.cuppingProfile.overall} / 100` },
                  { label: 'Best For', value: lot.bestFor.join(', ') },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-xl p-4 border border-cream-200">
                    <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400 mb-1">
                      {label}
                    </p>
                    <p className="text-charcoal-800 font-medium capitalize">{value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="traceability">
              <div className="max-w-2xl space-y-4">
                {[
                  { label: 'Lot Number', value: lot.lotNumber },
                  { label: 'Farm', value: lot.farm.name },
                  { label: 'Farmer', value: lot.farm.farmerName },
                  { label: 'Region / District', value: `${lot.origin.region} / ${lot.origin.district}` },
                  { label: 'Altitude', value: `${lot.origin.altitude}m` },
                  {
                    label: 'GPS Coordinates',
                    value: lot.origin.coordinates
                      ? `${lot.origin.coordinates.lat}°N, ${lot.origin.coordinates.lng}°E`
                      : 'On file',
                  },
                  { label: 'Harvest', value: `${lot.harvestSeason} ${lot.harvestYear}` },
                  { label: 'Processing', value: processingLabel(lot.processing) },
                  { label: 'Drying Method', value: lot.dryingMethod },
                  { label: 'Milling Location', value: lot.millingLocation },
                  { label: 'Certifications', value: lot.certifications.join(', ') },
                  { label: 'Export Ready', value: lot.exportReadyDate },
                  { label: 'Lot Size', value: `${lot.lotSize} kg` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-3 border-b border-cream-200 last:border-0">
                    <span className="text-sm text-charcoal-500">{label}</span>
                    <span className="text-sm font-medium text-charcoal-800 text-right max-w-xs">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="farm">
              <div className="grid sm:grid-cols-2 gap-8 max-w-3xl">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
                    {lot.farm.name}
                  </h3>
                  <p className="text-charcoal-600 mb-4">{lot.farm.shortBio}</p>
                  <div className="space-y-2">
                    {[
                      ['Farmer', lot.farm.farmerName],
                      ['Region', lot.farm.region],
                      ['Altitude', `${lot.farm.altitude.min}–${lot.farm.altitude.max}m`],
                      ['Farm Size', `${lot.farm.farmSize} hectares`],
                      ['Est.', lot.farm.yearEstablished.toString()],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-2 text-sm">
                        <span className="text-charcoal-500 w-24 flex-shrink-0">{k}</span>
                        <span className="text-charcoal-800 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {lot.farm.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-2 text-sm text-charcoal-700">
                      <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0" />
                      {cert}
                    </div>
                  ))}
                  <Button variant="outline" asChild className="mt-4">
                    <Link href={`/farms/${lot.farm.slug}`}>Read full farm story →</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Related lots ─── */}
        {relatedLots.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedLots.map((l) => (
                <ProductCard key={l.id} lot={l} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
