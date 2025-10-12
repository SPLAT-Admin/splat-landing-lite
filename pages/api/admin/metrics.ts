import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const [{ count: signups }, { count: ambassadors }, { count: customers }, { count: merch }] = await Promise.all([
      supabase.from("email_signups").select("*", { count: "exact", head: true }),
      supabase.from("ambassador").select("*", { count: "exact", head: true }),
      supabase.from("customers").select("*", { count: "exact", head: true }),
      supabase.from("merch_sales").select("*", { count: "exact", head: true }),
    ]);

    res.status(200).json({
      total_signups: signups || 0,
      ambassadors: ambassadors || 0,
      customers: customers || 0,
      merch_sales: merch || 0,
    });
  } catch (err) {
    console.error("metrics error", err);
    res.status(500).json({ error: "Metrics failed" });
  }
}
