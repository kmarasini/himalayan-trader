export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const email = formData.get('email')?.toString()

    if (!email || !email.includes('@')) {
      return NextResponse.redirect(new URL('/?newsletter=error', req.url), 303)
    }

    // Integrate your email platform here (Mailchimp, ConvertKit, etc.)
    console.log('[newsletter] new subscriber:', email)

    return NextResponse.redirect(new URL('/?newsletter=success', req.url), 303)
  } catch {
    return NextResponse.redirect(new URL('/?newsletter=error', req.url), 303)
  }
}
