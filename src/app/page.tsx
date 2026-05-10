import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Mountain,
  Leaf,
  Award,
  Users,
  Globe,
  CheckCircle,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product/ProductCard'
import { FarmCard } from '@/components/farm/FarmCard'
import { getFeaturedLots } from '@/lib/products'
import { farms } from '@/lib/farms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HimalayanTrader — Specialty Green Coffee from Nepal',
  description:
    'Direct-trade unroasted green coffee beans from small-lot Nepalese farms. Full lot traceability, 84–89 Q-grade scores. B2C and wholesale.',
}

const trustStats = [
  { icon: Mountain, value: '1,400–2,200m', label: 'Altitude range' },
  { icon: Users, value: '47+', label: 'Partner farmers' },
  { icon: Award, value: '84–89', label: 'Q-Grade scores' },
  { icon: Globe, value: '12', label: 'Export countries' },
]

const whyNepalPoints = [
  {
    icon: Mountain,
    title: 'Extreme Altitude',
    description:
      'Nepal's Himalayan gradients push coffee above 2,000m — cold nights force slow cherry development and extraordinary sugar concentration.',
  },
  {
    icon: Leaf,
    title: 'Organic by Necessity',
    description:
      'Many farms sit inside protected national park buffer zones. Chemical inputs are legally prohibited, making organic the only way to farm.',
  },
  {
    icon: Award,
    title: 'Lot-Level Traceability',
    description:
      'Every bag links to a farm, a farmer, a harvest date, and a GPS coordinate. We verify every lot before export.',
  },
  {
    icon: TrendingUp,
    title: 'Emerging Origin Premium',
    description:
      'Nepal coffee is where Ethiopia was twenty years ago — before the market caught up. Buy in now and differentiate your menu.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Farm Selection',
    description:
      'We visit every partner farm in person. Each farmer signs a direct-trade agreement with price transparency.',
  },
  {
    number: '02',
    title: 'Lot Verification',
    description:
      'Each lot is cupped by a licensed Q-grader. Lots scoring below 84 are not accepted.',
  },
  {
    number: '03',
    title: 'Traceable Export',
    description:
      'GPS coordinates, harvest dates, and farm records travel with every lot from Kathmandu to your roastery.',
  },
  {
    number: '04',
    title: 'Ship to Your Door',
    description:
      'Vacuum-sealed grain-pro bags inside GrainPro sacks. Full moisture content documentation included.',
  },
]

export default function HomePage() {
  const featuredLots = getFeaturedLots()
  const featuredFarms = farms.slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-forest-900">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
          alt="Himalayan mountains"
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <Badge className="mb-6 text-xs uppercase tracking-widest">
              Direct Trade · Nepal · 2024 Harvest
            </Badge>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Green Coffee
              <br />
              <span className="text-himalaya-400">From the Roof</span>
              <br />
              of the World
            </h1>
            <p className="text-lg sm:text-xl text-cream-200 leading-relaxed mb-10 max-w-xl">
              Unroasted specialty coffee sourced directly from small-lot farmers
              in Nepal's Himalayas. Full lot traceability. 84–89 Q-grade scores.
              Shipped green, ready to roast.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="xl" asChild>
                <Link href="/shop">
                  Shop Green Beans
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="border-white/40 text-white hover:bg-white/10">
                <Link href="/wholesale">Wholesale Inquiry</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-400">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-8 w-px bg-cream-400/50" />
        </div>
      </section>

      {/* ── Trust stats bar ───────────────────────────────────── */}
      <section className="bg-himalaya-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-himalaya-500">
            {trustStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center py-6 px-4 text-center">
                <Icon className="h-5 w-5 text-himalaya-200 mb-2" />
                <span className="font-serif text-2xl font-bold text-white">{value}</span>
                <span className="text-xs text-himalaya-200 mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured lots ─────────────────────────────────────── */}
      <section className="py-20 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-himalaya-600 uppercase tracking-widest mb-2">
                2024 Harvest
              </p>
              <h2 className="font-serif text-4xl font-bold text-charcoal-900">
                Featured Lots
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/shop">
                All lots
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredLots.map((lot) => (
              <ProductCard key={lot.id} lot={lot} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/shop">See all available lots</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Why Nepal coffee ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-himalaya-600 uppercase tracking-widest mb-3">
                Why Nepal?
              </p>
              <h2 className="font-serif text-4xl font-bold text-charcoal-900 mb-6">
                The world's most
                <br />
                underrated origin
              </h2>
              <p className="text-charcoal-600 leading-relaxed mb-8">
                Nepal's coffee is grown in some of the world's most dramatic
                terrain — altitudes that would be exceptional in Ethiopia, at
                latitudes that produce bright, complex cup profiles. Yet it
                remains largely unknown. That's an opportunity for roasters who
                act now.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyNepalPoints.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-forest-50 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal-800 mb-1">{title}</h3>
                      <p className="text-sm text-charcoal-500 leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
                  alt="Coffee cherries being harvested in Nepal"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-cream-200 max-w-[200px]">
                <p className="lot-number text-himalaya-600 mb-1">HTN-2024-006</p>
                <p className="font-serif text-sm font-semibold text-charcoal-800">
                  Jumla Heritage
                </p>
                <p className="text-xs text-charcoal-500">Q-Score: 89.25</p>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="h-1.5 flex-1 rounded-full bg-himalaya-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process steps ─────────────────────────────────────── */}
      <section className="py-20 bg-forest-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-himalaya-400 uppercase tracking-widest mb-3">
              Our Process
            </p>
            <h2 className="font-serif text-4xl font-bold text-white">
              From mountain to roastery
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map(({ number, title, description }) => (
              <div key={number} className="relative">
                <div className="text-6xl font-bold text-forest-700 font-mono mb-4 select-none">
                  {number}
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-cream-300 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Farmer spotlight ──────────────────────────────────── */}
      <section className="py-20 bg-cream-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl max-w-md">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                alt="Pemba Dorje Sherpa, farmer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-himalaya-600 uppercase tracking-widest mb-3">
                Farmer Spotlight
              </p>
              <h2 className="font-serif text-4xl font-bold text-charcoal-900 mb-2">
                Pemba Dorje Sherpa
              </h2>
              <p className="text-charcoal-500 mb-6">
                Sherpa Highlands Estate, Solukhumbu — 1,920m
              </p>
              <blockquote className="border-l-4 border-himalaya-500 pl-6 mb-6">
                <p className="font-serif text-xl italic text-charcoal-700 leading-relaxed">
                  "My grandfather planted the first trees on these terraces in
                  1961. When a roaster buys our lot, they're not buying
                  commodity coffee — they're buying sixty years of learning."
                </p>
              </blockquote>
              <div className="flex flex-col gap-2 mb-8">
                {[
                  'Third generation coffee farmer',
                  'Licensed Q-Grader (Arabica)',
                  'Organic certified since 2009',
                  '240 kg lot available · 2024 harvest',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm text-charcoal-600">
                    <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
              <Button asChild>
                <Link href="/farms/sherpa-highlands-estate">
                  Read full farm story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Farm directory preview ────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-himalaya-600 uppercase tracking-widest mb-2">
                Origin Transparency
              </p>
              <h2 className="font-serif text-4xl font-bold text-charcoal-900">
                Meet the Farms
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/farms">
                All farms
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFarms.map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Wholesale CTA banner ──────────────────────────────── */}
      <section className="py-16 bg-himalaya-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-3xl font-bold text-white mb-3">
                Roasters & Importers
              </h2>
              <p className="text-himalaya-100 text-lg max-w-xl">
                Wholesale pricing from 25 kg. Sample packs available. Full
                traceability documentation, export certificates, and moisture
                reports included with every shipment.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 flex-shrink-0">
              <Button size="lg" variant="cream" asChild>
                <Link href="/wholesale">
                  Wholesale Enquiry
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" asChild className="border-white/30 text-white bg-white/10 hover:bg-white/20">
                <Link href="/shop">Browse Lots</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────── */}
      <section className="py-16 bg-cream-100 border-t border-cream-200">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-3">
            New lots, harvest updates
          </h2>
          <p className="text-charcoal-600 mb-8">
            Get notified when a new lot lands. We send one email per new
            arrival — no noise.
          </p>
          <form
            action="/api/newsletter"
            method="POST"
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@roastery.com"
              className="flex-1 h-12 rounded-md border border-cream-300 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700"
            />
            <Button type="submit" size="lg">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-charcoal-400 mt-3">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </>
  )
}
