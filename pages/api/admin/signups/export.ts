// pages/api/admin/signups/export.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.query.token as string | undefined;
  if (!token || token !== process.env.ADMIN_DASH_TOKEN) {
    return res.status(401).send("Unauthorized");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const since = req.query.since ? new Date(String(req.query.since)) : null;
  const until = req.query.until ? new Date(String(req.query.until)) : null;

  let query = supabase
    .from("email_signups")
    .select("created_at,email,first_name,last_name,marketing_consent,signup_source,referral_code", {
      head: false,
      count: "exact"
    })
    .order("created_at", { ascending: false });

  if (since) query = query.gte("created_at", since.toISOString());
  if (until) query = query.lte("created_at", until.toISOString());

  const { data, error } = await query.limit(50000);
  if (error) return res.status(500).send("Query error: " + error.message);

  const headers = [
    "created_at",
    "email",
    "first_name",
    "last_name",
    "marketing_consent",
    "signup_source",
    "referral_code"
  ];

  const csvRows = (data || []).map((row) => headers.map((field) => {
    const value = row[field as keyof typeof row];
    return `"${String(value ?? "").replace(/"/g, '""')}"`;
  }).join(","));

  const csv = [`\uFEFF${headers.join(",")}`, ...csvRows].join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="email-signups-${Date.now()}.csv"`);
  return res.status(200).send(csv);
}
