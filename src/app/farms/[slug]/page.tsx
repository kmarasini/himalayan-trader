export const runtime = 'edge'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ArrowLeft, Trees, CheckCircle, Calendar } from 'lucide-react'
import { farms, getFarmBySlug } from '@/lib/farms'
import { coffeeLots } from '@/lib/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return farms.map((farm) => ({ slug: farm.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const farm = getFarmBySlug(slug)
  if (!farm) return { title: 'Farm not found' }
  return {
    title: `${farm.name} — ${farm.region}, Nepal`,
    description: farm.shortBio,
  }
}

export default async function FarmDetailPage({ params }: Props) {
  const { slug } = await params
  const farm = getFarmBySlug(slug)
  if (!farm) notFound()

  const farmLots = coffeeLots.filter(
    (l) => l.farm.id === farm.id && l.available,
  )

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-charcoal-500">
          <Link href="/farms" className="flex items-center gap-1 hover:text-forest-700 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Farms
          </Link>
          <span>/</span>
          <span className="text-charcoal-800 font-medium">{farm.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden bg-forest-900">
        <Image
          src={farm.images[0]}
          alt={farm.name}
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-end pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-himalaya-400" />
              <span className="text-himalaya-300 text-sm">
                {farm.region}, Nepal · {farm.altitude.min}–{farm.altitude.max}m
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-2">
              {farm.name}
            </h1>
            <p className="text-cream-300 text-lg">{farm.farmerName}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Farmer intro */}
            <div className="flex items-start gap-5 mb-10 bg-white rounded-2xl p-6 border border-cream-200 shadow-sm">
              <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-cream-200 flex-shrink-0">
                <Image
                  src={farm.farmerImage}
                  alt={farm.farmerName}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-0.5">
                  {farm.farmerName}
                </h2>
                <p className="text-himalaya-700 font-medium text-sm mb-2">
                  {farm.farmerTitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {farm.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="mb-10">
              <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-5">
                Farm Story
              </h3>
              <div className="space-y-4">
                {farm.story.split('\n\n').map((para, i) => (
                  <p key={i} className="text-charcoal-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Second image */}
            {farm.images[1] && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 shadow-md">
                <Image
                  src={farm.images[1]}
                  alt={`${farm.name} — processing`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            )}

            {/* Available lots from this farm */}
            {farmLots.length > 0 && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-6">
                  Available Lots from {farm.name}
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {farmLots.map((lot) => (
                    <ProductCard key={lot.id} lot={lot} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Farm stats */}
            <div className="bg-white rounded-2xl border border-cream-200 p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-4">
                Farm Details
              </h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: 'Region', value: farm.region },
                  { icon: MapPin, label: 'District', value: farm.district },
                  { icon: Trees, label: 'Altitude', value: `${farm.altitude.min}–${farm.altitude.max}m` },
                  { icon: Trees, label: 'Farm Size', value: `${farm.farmSize} hectares` },
                  { icon: Trees, label: 'Coffee Trees', value: farm.treesCount.toLocaleString() },
                  { icon: Calendar, label: 'Established', value: farm.yearEstablished.toString() },
                  { icon: Calendar, label: 'Generations', value: `${farm.familyGenerations} generation${farm.familyGenerations > 1 ? 's' : ''}` },
                  { icon: Calendar, label: 'Lots / Year', value: `${farm.lotsPerYear} lots` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="h-4 w-4 text-himalaya-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-charcoal-500">{label}</p>
                      <p className="text-sm font-medium text-charcoal-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl border border-cream-200 p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-4">
                Certifications
              </h3>
              <div className="space-y-2">
                {farm.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2 text-sm text-charcoal-700">
                    <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-forest-900 rounded-2xl p-6 text-white">
              <h3 className="font-serif text-lg font-bold mb-2">
                Interested in wholesale?
              </h3>
              <p className="text-cream-300 text-sm mb-4">
                We can source dedicated lots from {farm.name} with exclusivity
                for select wholesale partners.
              </p>
              <Button variant="secondary" asChild className="w-full">
                <Link href="/wholesale">Wholesale Enquiry</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
