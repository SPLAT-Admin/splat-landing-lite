import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const event = req.body;
    const paymentId = event.id;
    const status = event.status;

    const { error } = await supabase.schema('marketing').from("orders")
      .update({ payment_status: status })
      .eq("greenmoney_id", paymentId);

    if (error) throw error;

    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: err.message });
  }
}
