# Blank Format

A minimal starter template combining [Next.js](https://nextjs.org), [Supabase](https://supabase.com), Supabase Auth, [Stripe](https://stripe.com), and [shadcn/ui](https://ui.shadcn.com). Use this as a blank format for new projects that need auth, database, payments, and a component library.

**Included:**

- **Next.js** – App Router, server components, API routes
- **Supabase** – Database, storage, and server/client helpers
- **Supabase Auth** – Session handling and auth utilities
- **Stripe** – Checkout and webhook API routes
- **shadcn/ui** – Pre-styled, accessible UI components (see `components.json`)

## Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `SUPABASE_URL` | Same as above (for server) |
| `SUPABASE_ANON_KEY` | Same as anon key (for server) |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (server-only, optional) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (for `/api/stripe/webhook`) |

For local Stripe webhook testing use [Stripe CLI](https://stripe.com/docs/stripe-cli): `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# blank-format
