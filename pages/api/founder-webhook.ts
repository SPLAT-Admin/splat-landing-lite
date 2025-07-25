// pages/api/founder-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const sig = req.headers['stripe-signature']!;
  const rawBody = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email;
    const amount = session.amount_total ? session.amount_total / 100 : null;
    const tier = amount === 25 ? 'tier_1' : amount === 50 ? 'tier_2' : 'unknown';

    if (email && amount) {
      await supabase.from('founder_purchases').insert([
        {
          email,
          stripe_checkout_id: session.id,
          purchase_amount: amount,
          tier,
          status: 'completed',
        },
      ]);
    }
  }

  res.status(200).end();
}
