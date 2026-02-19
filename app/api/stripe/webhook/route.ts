import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed.', message)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`PaymentIntent ${paymentIntent.id} succeeded.`)
      break
    }
    case 'payment_method.attached': {
      const paymentMethod = event.data.object as Stripe.PaymentMethod
      console.log(`PaymentMethod ${paymentMethod.id} attached.`)
      break
    }
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      console.log(`Checkout session ${session.id} completed.`)
      break
    }
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
