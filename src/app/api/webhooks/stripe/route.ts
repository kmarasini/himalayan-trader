export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 },
    )
  }

  let event

  try {
    const stripe = getStripe()
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret)
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      console.log('[stripe-webhook] payment completed:', session.id, {
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
        shipping: session.shipping_details,
      })
      // TODO: persist order to database, send confirmation email via Resend
      break
    }

    case 'checkout.session.expired': {
      const session = event.data.object
      console.log('[stripe-webhook] session expired:', session.id)
      break
    }

    default:
      console.log('[stripe-webhook] unhandled event type:', event.type)
  }

  return NextResponse.json({ received: true })
}
