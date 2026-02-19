import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY is not set' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { priceId, quantity = 1, successUrl, cancelUrl } = body

    if (!priceId) {
      return NextResponse.json(
        { error: 'priceId is required' },
        { status: 400 }
      )
    }

    const origin = request.headers.get('origin') || request.nextUrl.origin
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity }],
      success_url: successUrl || `${origin}/?success=1`,
      cancel_url: cancelUrl || `${origin}/?canceled=1`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}
