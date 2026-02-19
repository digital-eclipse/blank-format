import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export { stripe };
export async function createStripeCustomer(email: string, name?: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name: name || undefined,
      metadata: {
        created_at: new Date().toISOString(),
      }
    });
    return customer.id;
  } catch (error) {
    throw error;
  }
} 