'use client'

export const runtime = 'edge'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Lock } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { formatPriceFromDollars } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, subtotal } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shipping = subtotal() >= 150 ? 0 : 12.99
  const total = subtotal() + shipping

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: `${item.name} (${item.size})`,
            price: Math.round(item.price * 100),
            quantity: item.quantity,
            image: item.image,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Checkout failed')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center gap-4">
        <p className="text-charcoal-600">Your cart is empty.</p>
        <Button asChild>
          <Link href="/shop">Shop Green Beans</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/cart"
          className="flex items-center gap-1.5 text-sm text-charcoal-500 hover:text-forest-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to cart
        </Link>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Checkout form */}
          <div className="lg:col-span-3">
            <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-8">
              Checkout
            </h1>

            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Contact */}
              <section>
                <h2 className="font-serif text-xl font-semibold text-charcoal-800 mb-4">
                  Contact
                </h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-1"
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Shipping */}
              <section>
                <h2 className="font-serif text-xl font-semibold text-charcoal-800 mb-4">
                  Shipping address
                </h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      placeholder="123 Main Street"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="address2"
                      name="address2"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="state">State / Province</Label>
                      <Input id="state" name="state" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP / Postal</Label>
                      <Input id="zip" name="zip" required className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      required
                      defaultValue="United States"
                      className="mt-1"
                    />
                  </div>
                </div>
              </section>

              {error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                <Lock className="h-4 w-4" />
                {loading
                  ? 'Redirecting to Stripe…'
                  : `Pay ${formatPriceFromDollars(total)} securely`}
              </Button>

              <p className="text-xs text-charcoal-400 text-center">
                You'll be redirected to Stripe for secure payment. We never
                store card details.
              </p>
            </form>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-cream-200 p-6 shadow-sm sticky top-24">
              <h2 className="font-serif text-lg font-bold text-charcoal-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4 mb-5">
                {items.map((item) => (
                  <div
                    key={`${item.lotId}-${item.size}`}
                    className="flex gap-3 items-center"
                  >
                    <div className="relative h-12 w-12 rounded-md overflow-hidden border border-cream-200 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-charcoal-700 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-charcoal-500">{item.size}</p>
                    </div>
                    <span className="text-sm font-semibold text-charcoal-800 flex-shrink-0">
                      {formatPriceFromDollars(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Subtotal</span>
                  <span>{formatPriceFromDollars(subtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-forest-600">Free</span>
                    ) : (
                      formatPriceFromDollars(shipping)
                    )}
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="font-serif">{formatPriceFromDollars(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
