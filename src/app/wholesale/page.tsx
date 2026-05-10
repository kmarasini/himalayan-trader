import React from 'react'
import Link from 'next/link'
import { CheckCircle, Package, FileText, Globe, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { coffeeLots } from '@/lib/products'
import { formatPriceFromDollars } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wholesale Green Coffee — Roasters & Importers',
  description:
    'Wholesale pricing for specialty green coffee from Nepal. Minimum 25 kg. Sample packs available. Full traceability documentation included.',
}

const tiers = [
  { label: 'Sample Pack', min: '1–5 kg', priceNote: 'Retail pricing', perks: ['Up to 3 lots', 'Full traceability docs', 'Q-grade report'] },
  { label: 'Starter', min: '25–100 kg', priceNote: '15% off retail', perks: ['Any available lots', 'COO certificate', 'Moisture report', 'GrainPro sacks'] },
  { label: 'Partner', min: '100–500 kg', priceNote: '22% off retail', perks: ['Reserved lot allocation', 'Exclusivity options', 'Pre-shipment samples', 'Dedicated account manager'] },
  { label: 'Enterprise', min: '500 kg+', priceNote: 'Custom pricing', perks: ['Farm exclusivity', 'Custom lot development', 'Annual sourcing contract', 'Co-branding support'] },
]

const documents = [
  'Phytosanitary certificate (Nepal DFTQC)',
  'Certificate of origin',
  'Coffee export permit (Nepal Rastra Bank)',
  'Lot traceability record (farm to mill)',
  'Q-grade cupping report',
  'Moisture content analysis',
  'GrainPro inner bag manifest',
]

export default function WholesalePage() {
  const wholesaleLots = coffeeLots
    .filter((l) => l.available)
    .sort((a, b) => b.gradeScore - a.gradeScore)

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-forest-900 text-white py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-himalaya-400 uppercase tracking-widest mb-3">
            For Roasters & Importers
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Wholesale Green Coffee
          </h1>
          <p className="text-cream-300 text-lg max-w-2xl mb-8">
            Direct-trade Nepal green coffee with full lot traceability. Minimum
            25 kg per lot. Sample packs available for all listed lots. Export
            documentation included in every shipment.
          </p>
          <div className="flex flex-wrap gap-5 text-sm text-cream-300">
            {[
              { icon: Package, text: 'Min. 25 kg per lot' },
              { icon: FileText, text: 'Full export docs' },
              { icon: Globe, text: 'Ships to 40+ countries' },
              { icon: CheckCircle, text: 'Q-grade verified' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-himalaya-400" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Pricing tiers */}
        <section className="mb-16" id="pricing">
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-8">
            Volume Tiers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier, i) => (
              <div
                key={tier.label}
                className={`rounded-2xl border p-6 ${
                  i === 2
                    ? 'border-forest-700 bg-forest-900 text-white shadow-xl ring-2 ring-forest-500'
                    : 'border-cream-200 bg-white'
                }`}
              >
                {i === 2 && (
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-himalaya-400 mb-2">
                    Most Popular
                  </span>
                )}
                <h3 className={`font-serif text-xl font-bold mb-1 ${i === 2 ? 'text-white' : 'text-charcoal-900'}`}>
                  {tier.label}
                </h3>
                <p className={`text-sm mb-1 ${i === 2 ? 'text-cream-300' : 'text-charcoal-500'}`}>
                  {tier.min}
                </p>
                <p className={`font-bold text-lg mb-4 ${i === 2 ? 'text-himalaya-400' : 'text-forest-700'}`}>
                  {tier.priceNote}
                </p>
                <ul className="space-y-2">
                  {tier.perks.map((perk) => (
                    <li key={perk} className={`flex items-start gap-2 text-sm ${i === 2 ? 'text-cream-200' : 'text-charcoal-600'}`}>
                      <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${i === 2 ? 'text-himalaya-400' : 'text-forest-600'}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Available lots table */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-serif text-3xl font-bold text-charcoal-900">
              Available Lots
            </h2>
            <Button variant="outline" asChild size="sm">
              <Link href="/shop">Full product page →</Link>
            </Button>
          </div>
          <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cream-100 border-b border-cream-200">
                  <tr>
                    {['Lot', 'Region', 'Process', 'Q-Score', 'Available', 'Wholesale / kg', ''].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500 px-5 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100">
                  {wholesaleLots.map((lot) => (
                    <tr key={lot.id} className="hover:bg-cream-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-charcoal-800">{lot.name}</p>
                        <p className="lot-number text-charcoal-400">#{lot.lotNumber}</p>
                      </td>
                      <td className="px-5 py-4 text-charcoal-600">{lot.origin.region}</td>
                      <td className="px-5 py-4">
                        <span className="capitalize bg-cream-100 text-charcoal-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          {lot.processing}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono font-bold text-forest-700">
                        {lot.gradeScore}
                      </td>
                      <td className="px-5 py-4 text-charcoal-600">{lot.lotSize} kg</td>
                      <td className="px-5 py-4 font-semibold text-charcoal-900">
                        {formatPriceFromDollars(lot.pricing.wholesale.pricePerKg)}
                        <span className="text-xs font-normal text-charcoal-400 ml-1">
                          (min {lot.pricing.wholesale.minimumKg} kg)
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/shop/${lot.slug}`}>Details</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Documentation */}
        <section className="mb-16" id="docs">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-4">
                Export Documentation
              </h2>
              <p className="text-charcoal-600 mb-6">
                Every shipment includes a complete documentation package. We
                handle all export formalities from Nepal; you receive a clean,
                import-ready consignment.
              </p>
              <ul className="space-y-3">
                {documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-charcoal-700">
                    <CheckCircle className="h-5 w-5 text-forest-600 flex-shrink-0 mt-0.5" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Inquiry form */}
            <div id="samples">
              <div className="bg-white rounded-2xl border border-cream-200 p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
                  Wholesale Inquiry
                </h2>
                <p className="text-charcoal-500 text-sm mb-6">
                  We respond within one business day. Sample packs ship within
                  5 days.
                </p>
                <form action="/api/wholesale-inquiry" method="POST" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="companyName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="contact">Your name</Label>
                      <Input id="contact" name="contactName" required className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="wemail">Email</Label>
                    <Input id="wemail" name="email" type="email" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="volume">Monthly volume (kg)</Label>
                    <Input
                      id="volume"
                      name="monthlyVolume"
                      placeholder="e.g. 50–200 kg"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message / lots of interest</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your roastery and which lots interest you…"
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Inquiry
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
