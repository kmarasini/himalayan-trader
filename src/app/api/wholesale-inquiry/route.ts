export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const InquirySchema = z.object({
  companyName: z.string().min(1).max(200),
  contactName: z.string().min(1).max(200),
  email: z.string().email(),
  monthlyVolume: z.string().min(1).max(100),
  message: z.string().max(2000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') ?? ''
    let data: Record<string, string>

    if (contentType.includes('application/json')) {
      data = await req.json()
    } else {
      const formData = await req.formData()
      data = Object.fromEntries(
        [...formData.entries()].map(([k, v]) => [k, v.toString()]),
      )
    }

    const parsed = InquirySchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid inquiry data', issues: parsed.error.issues },
        { status: 400 },
      )
    }

    const inquiry = parsed.data

    // Send email notification (Resend / any email provider)
    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL ?? 'hello@himalayantrader.com'

    if (resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'HimalayanTrader <noreply@himalayantrader.com>',
          to: contactEmail,
          subject: `Wholesale inquiry from ${inquiry.companyName}`,
          html: `
            <h2>New Wholesale Inquiry</h2>
            <table>
              <tr><td><strong>Company:</strong></td><td>${inquiry.companyName}</td></tr>
              <tr><td><strong>Contact:</strong></td><td>${inquiry.contactName}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${inquiry.email}</td></tr>
              <tr><td><strong>Monthly Volume:</strong></td><td>${inquiry.monthlyVolume}</td></tr>
              <tr><td><strong>Message:</strong></td><td>${inquiry.message ?? '—'}</td></tr>
            </table>
          `,
        }),
      })
    } else {
      console.log('[wholesale-inquiry] no RESEND_API_KEY set, logging inquiry:', inquiry)
    }

    // If request came from a form (not JSON), redirect back
    if (!contentType.includes('application/json')) {
      return NextResponse.redirect(
        new URL('/wholesale?inquiry=sent', req.url),
        303,
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[wholesale-inquiry]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
