import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { supabaseService } from "../../lib/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-06-30.basil" });

const SALE_LIMIT = 250;
const SALE_END = new Date('2025-08-06T23:59:59-07:00').getTime();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const now = Date.now();
  if (now > SALE_END) {
    return res.status(400).json({ error: "Founder sale has ended." });
  }

  // Fetch current sold count dynamically from database
  const { count: soldCount, error: fetchError } = await supabaseService
    .from("founder_purchases")
    .select("id", { count: "exact" });

  if (fetchError) {
    return res.status(500).json({ error: "Failed to fetch sales data." });
  }

  // Default display starting at 246 for promotion purposes
  const displaySold = soldCount && soldCount < 246 ? 246 : soldCount || 246;

  let tier: "tier_1" | "tier_2";
  if (displaySold < SALE_LIMIT) {
    tier = "tier_1";
  } else {
    tier = "tier_2";
  }

  const priceId = tier === "tier_1" ? process.env.STRIPE_PRICE_TIER1 : process.env.STRIPE_PRICE_TIER2;

  if (!priceId) return res.status(400).json({ error: "Invalid tier configuration." });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/founder`,
    });

    res.status(200).json({ url: session.url, sold: displaySold });
  } catch (error: any) {
    res.status(500).json({ error: "Stripe checkout session creation failed" });
  }
}
