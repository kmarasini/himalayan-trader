export const runtime = 'edge'

import React from 'react'
import { ArrowRight, Mail, Mountain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with HimalayanTrader. We respond within one business day.',
}

interface Props {
  searchParams: Promise<{ sent?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const { sent } = await searchParams

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-forest-900 text-white py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-himalaya-400 uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-cream-300 text-lg max-w-2xl">
            Questions about our coffee, sourcing, or how to order? We'd love to
            hear from you and respond within one business day.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-6">
              How can we help?
            </h2>
            <p className="text-charcoal-600 mb-8 leading-relaxed">
              Whether you're a roaster curious about our lots, a retailer
              interested in wholesale pricing, or simply someone who loves
              specialty coffee — we're happy to connect.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-himalaya-100 text-himalaya-700">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-800">Email</p>
                  <p className="text-charcoal-500 text-sm">
                    Reach us directly at{' '}
                    <a
                      href="mailto:k1marasini@gmail.com"
                      className="text-himalaya-600 hover:underline"
                    >
                      k1marasini@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-himalaya-100 text-himalaya-700">
                  <Mountain className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-800">Origin</p>
                  <p className="text-charcoal-500 text-sm">
                    Sourced from small-lot farms across Nepal's coffee-growing
                    highlands at 1,400–2,200 m altitude.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {sent === 'true' ? (
              <div className="bg-white rounded-2xl border border-cream-200 p-8 shadow-sm text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                  <ArrowRight className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
                  Message sent!
                </h2>
                <p className="text-charcoal-500">
                  Thanks for reaching out. We'll get back to you within one
                  business day.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-cream-200 p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
                  Send a message
                </h2>
                <p className="text-charcoal-500 text-sm mb-6">
                  We respond within one business day.
                </p>
                <form action="/api/contact" method="POST" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your name</Label>
                      <Input id="name" name="name" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="e.g. Wholesale inquiry, Sample request…"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us how we can help…"
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
