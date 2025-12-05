import type { NextApiRequest, NextApiResponse } from "next";
import { initiateAchPayment } from "@/lib/greenMoneyClient";
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
    const { amount, accountNumber, routingNumber, name, email, description } = req.body;

    const gmResponse = await initiateAchPayment({
      amount,
      accountNumber,
      routingNumber,
      name,
      email,
      description,
    });

    const { data, error } = await supabase.schema('marketing').from("orders")
      .insert([
        {
          name,
          email,
          amount,
          payment_provider: "greenmoney",
          payment_status: gmResponse.status || "pending",
          greenmoney_id: gmResponse.id || null,
        },
      ])
      .select();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      transaction: gmResponse,
      order: data?.[0],
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Payment failed" });
  }
}
