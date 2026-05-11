export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  subject: z.string().min(1).max(300),
  message: z.string().min(1).max(3000),
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

    const parsed = ContactSchema.safeParse(data)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', issues: parsed.error.issues },
        { status: 400 },
      )
    }

    const { name, email, subject, message } = parsed.data

    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'k1marasini@gmail.com'

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
          reply_to: email,
          subject: `Contact: ${subject}`,
          html: `
            <h2>New Contact Message</h2>
            <table>
              <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
              <tr><td><strong>Subject:</strong></td><td>${subject}</td></tr>
              <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
            </table>
          `,
        }),
      })
    } else {
      console.log('[contact] no RESEND_API_KEY set, logging message:', { name, email, subject, message })
    }

    if (!contentType.includes('application/json')) {
      return NextResponse.redirect(
        new URL('/contact?sent=true', req.url),
        303,
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
