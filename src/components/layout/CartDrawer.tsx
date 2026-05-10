'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPriceFromDollars } from '@/lib/utils'
import type { CartItemSize } from '@/types'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCartStore()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col w-full max-w-sm p-0">
        <SheetHeader className="px-6 py-5 border-b border-cream-200">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-forest-700" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-auto text-sm font-normal text-charcoal-500">
                {items.reduce((s, i) => s + i.quantity, 0)} item
                {items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-100">
              <ShoppingBag className="h-8 w-8 text-charcoal-400" />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-charcoal-700">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-charcoal-500">
                Add some extraordinary green coffee to get started.
              </p>
            </div>
            <Button asChild onClick={closeCart}>
              <Link href="/shop">Shop Green Beans</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.map((item) => (
                <div
                  key={`${item.lotId}-${item.size}`}
                  className="flex gap-3 px-6 py-4 border-b border-cream-100 last:border-0"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-cream-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <p className="text-sm font-semibold text-charcoal-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-charcoal-500">{item.size}</p>
                    <div className="flex items-center justify-between mt-1">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.lotId,
                              item.size as CartItemSize,
                              item.quantity - 1,
                            )
                          }
                          className="flex h-6 w-6 items-center justify-center rounded border border-cream-300 hover:bg-cream-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-sm font-medium">
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
                          className="flex h-6 w-6 items-center justify-center rounded border border-cream-300 hover:bg-cream-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-charcoal-800">
                          {formatPriceFromDollars(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            removeItem(item.lotId, item.size as CartItemSize)
                          }
                          className="text-charcoal-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-cream-200 px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-charcoal-700">Subtotal</span>
                <span className="font-serif text-xl font-bold text-charcoal-900">
                  {formatPriceFromDollars(subtotal())}
                </span>
              </div>
              <p className="text-xs text-charcoal-500">
                Shipping calculated at checkout.
              </p>
              <Separator />
              <Button asChild className="w-full" size="lg" onClick={closeCart}>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="sm"
                onClick={closeCart}
                asChild
              >
                <Link href="/cart">View Full Cart</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
