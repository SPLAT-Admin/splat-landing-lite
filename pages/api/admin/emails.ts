import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase
    .from("email_signups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data || []);
}
