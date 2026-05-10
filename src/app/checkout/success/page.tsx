'use client'

export const runtime = 'edge'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCartStore()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest-100 mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-forest-600" />
        </div>

        <h1 className="font-serif text-4xl font-bold text-charcoal-900 mb-3">
          Order confirmed!
        </h1>
        <p className="text-charcoal-600 mb-8 leading-relaxed">
          Thank you for your order. You'll receive a confirmation email shortly
          with your order details and tracking information once your green
          coffee ships.
        </p>

        <div className="bg-white rounded-2xl border border-cream-200 p-6 mb-8 text-left shadow-sm">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-himalaya-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-charcoal-800 mb-1">
                What happens next?
              </p>
              <ul className="text-sm text-charcoal-600 space-y-1.5">
                <li>✓ Order confirmation email sent</li>
                <li>✓ Lot reservation confirmed with the farm</li>
                <li>→ Vacuum-sealed and prepared for shipment</li>
                <li>→ Tracking number emailed when dispatched</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/shop">
              Shop more lots
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/farms">Explore the farms</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
