export const runtime = 'edge'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Mountain, Leaf, Heart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About HimalayanTrader — Nepal Direct Trade Coffee',
  description:
    'Our mission, sourcing principles, and traceability promise. Learn why we built HimalayanTrader and how we work with Nepalese coffee farmers.',
}

const values = [
  {
    icon: Mountain,
    title: 'Origin first',
    description:
      'Every decision we make — from which farms to partner with to how we price lots — starts with what is best for the origin and the farmers who grow there.',
  },
  {
    icon: Leaf,
    title: 'Radical transparency',
    description:
      'Every lot on our platform comes with full GPS coordinates, harvest dates, farmer names, and Q-grade documentation. No exceptions, no black boxes.',
  },
  {
    icon: Heart,
    title: 'Fair economics',
    description:
      'We pay a minimum floor price 35% above the C-market regardless of commodity prices, and we share our full cost model with every partner farmer.',
  },
]

const timeline = [
  { year: '2021', event: 'First sourcing trip to Solukhumbu and Gulmi districts' },
  { year: '2022', event: 'Formalised direct-trade agreements with 12 partner farms' },
  { year: '2023', event: 'First container exported to Europe and North America' },
  { year: '2024', event: 'Expanded to 47 partner farmers across 5 regions' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="relative bg-forest-900 text-white py-20 px-4 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80"
          alt="Himalayas"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-himalaya-400 uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-5xl font-bold mb-6">
            Bridging the peaks of{' '}
            <span className="text-himalaya-400">Nepal</span>{' '}
            to the roasters of the West.
          </h1>
          <p className="text-cream-200 text-xl leading-relaxed">
            HimalayanTrader was founded on a single realization: the world's
            most extraordinary coffee is grown at altitudes that touch the
            sky—and it's Nepal's best-kept secret. We aren't just importers;
            we are the bridge between the high-altitude smallholder farmers of
            the Himalayas and the discerning palates of those who seek the
            exceptional.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-sm font-semibold text-himalaya-600 uppercase tracking-widest mb-3">
              The Mission
            </p>
            <h2 className="font-serif text-4xl font-bold text-charcoal-900 mb-6">
              Nepal coffee deserves to be on every specialty menu
            </h2>
            <div className="space-y-4 text-charcoal-700 leading-relaxed">
              <p>
                Nepal has been growing coffee since the 1960s, but structural
                barriers — opaque export chains, lack of direct buyer
                relationships, and limited marketing — have kept it invisible
                to the global specialty market.
              </p>
              <p>
                We built HimalayanTrader to remove those barriers. Every lot on
                our platform is purchased directly from the farmer, processed
                under our quality protocols, and exported with complete
                documentation that any roaster or customer can verify.
              </p>
              <p>
                Our model is simple: farmers get fair prices and long-term
                relationships, buyers get extraordinary coffee with full
                traceability, and Nepal gets the recognition its high-altitude
                arabica deserves.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl max-w-md lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=800&q=80"
              alt="Nepalese coffee farm"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Values */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-10 text-center">
            Our values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl border border-cream-200 p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 mb-5">
                  <Icon className="h-6 w-6 text-forest-700" />
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-3">
                  {title}
                </h3>
                <p className="text-charcoal-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Traceability promise */}
        <section id="traceability" className="mb-20 bg-white rounded-3xl border border-cream-200 p-10 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold text-himalaya-600 uppercase tracking-widest mb-3">
                Traceability
              </p>
              <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-4">
                Every bag. Every farmer. Every fact.
              </h2>
              <p className="text-charcoal-600 leading-relaxed mb-6">
                We define traceability differently from most importers. It's
                not just a farm name on a bag — it's a complete, verifiable
                record that links your bag of green coffee to a specific farmer,
                a specific harvest, and a specific GPS location.
              </p>
              <div className="space-y-3">
                {[
                  'Farmer name and family background',
                  'Farm GPS coordinates (accurate to 10m)',
                  'Harvest date and cherry picking log',
                  'Processing method and drying duration',
                  'Milling location and moisture content',
                  'Licensed Q-grader cupping report',
                  'Export permit and COO number',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-charcoal-700">
                    <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"
                alt="Green coffee beans traceability"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="sourcing" className="mb-20">
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-10 text-center">
            Our journey
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-cream-300" />
            <div className="space-y-8">
              {timeline.map(({ year, event }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-forest-900 text-white font-mono text-sm font-bold z-10 shadow">
                    {year}
                  </div>
                  <div className="pt-4">
                    <p className="text-charcoal-700 leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-himalaya-600 rounded-3xl p-12 text-white">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Ready to taste Nepal?
          </h2>
          <p className="text-himalaya-100 mb-8 max-w-lg mx-auto">
            Browse our current lot selection, connect with the farmers, and
            bring a truly exceptional origin to your roastery.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="cream" asChild>
              <Link href="/shop">
                Shop Green Beans
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" asChild className="border-white/30 bg-white/10 hover:bg-white/20 text-white">
              <Link href="/farms">Meet the farmers</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
