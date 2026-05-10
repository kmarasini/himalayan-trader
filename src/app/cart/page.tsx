'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPriceFromDollars } from '@/lib/utils'
import type { CartItemSize } from '@/types'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center gap-6 px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-100">
          <ShoppingBag className="h-10 w-10 text-charcoal-400" />
        </div>
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-charcoal-500">
            Discover our extraordinary green coffee lots from Nepal.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/shop">Shop Green Beans</Link>
        </Button>
      </div>
    )
  }

  const shipping = subtotal() >= 150 ? 0 : 12.99
  const total = subtotal() + shipping

  return (
    <div className="min-h-screen bg-cream-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-charcoal-900 mb-10">
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.lotId}-${item.size}`}
                className="flex gap-4 bg-white rounded-2xl border border-cream-200 p-4 shadow-sm"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-cream-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/shop/${item.lotSlug}`}
                        className="font-semibold text-charcoal-900 hover:text-forest-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-charcoal-500">{item.size}</p>
                      <p className="lot-number text-charcoal-400 mt-0.5">
                        #{item.lotNumber}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(item.lotId, item.size as CartItemSize)
                      }
                      className="text-charcoal-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-cream-300 rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.lotId,
                            item.size as CartItemSize,
                            item.quantity - 1,
                          )
                        }
                        className="px-3 py-1.5 text-sm hover:bg-cream-100 rounded-l-md transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-medium min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.lotId,
                            item.size as CartItemSize,
                            item.quantity + 1,
                          )
                        }
                        className="px-3 py-1.5 text-sm hover:bg-cream-100 rounded-r-md transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-bold text-charcoal-900">
                      {formatPriceFromDollars(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-cream-200 p-6 shadow-sm sticky top-24">
              <h2 className="font-serif text-xl font-bold text-charcoal-900 mb-5">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Subtotal</span>
                  <span className="font-medium">{formatPriceFromDollars(subtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-forest-600">Free</span>
                    ) : (
                      formatPriceFromDollars(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-charcoal-400">
                    Free shipping on orders over $150
                  </p>
                )}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span className="font-serif">{formatPriceFromDollars(total)}</span>
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="sm" className="w-full mt-3">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <div className="mt-4 pt-4 border-t border-cream-100">
                <p className="text-xs text-charcoal-400 text-center">
                  🔒 Secure checkout via Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
