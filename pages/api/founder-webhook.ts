import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { supabase } from '../../lib/supabaseClient';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const sig = req.headers['stripe-signature'];
    if (!sig) return res.status(400).send('Missing Stripe signature');

    const rawBody = await buffer(req);
    const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      const amount = session.amount_total ? session.amount_total / 100 : null;
      const tier = amount === 25 ? 'tier_1' : amount === 50 ? 'tier_2' : null;

      if (!email || !amount || !tier) {
        console.warn('⚠️ Invalid founder purchase payload:', { email, amount, tier });
        return res.status(400).send('Missing required purchase data');
      }

      const { error } = await supabase.from('founder_purchases').insert({
        email,
        stripe_checkout_id: session.id,
        purchase_amount: amount,
        tier,
        status: 'completed',
      });

      if (error) {
        console.error('❌ Supabase insert failed:', error.message);
        return res.status(500).send('Supabase insert failed');
      }

      console.log(`✅ Founder purchase saved: ${email} | $${amount} | ${tier}`);
    }

    res.status(200).end();
  } catch (err: any) {
    console.error('❌ Webhook handler error:', err.message || err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
