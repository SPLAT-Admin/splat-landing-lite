import type { NextApiRequest, NextApiResponse } from "next";
import {
  getEmailSignupStats,
  getAmbassadorCount,
  getMerchSalesCount,
  getActivePromos,
} from "@/lib/adminMetrics";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const [emailStats, ambassadors, merch, promos] = await Promise.all([
      getEmailSignupStats(),
      getAmbassadorCount(),
      getMerchSalesCount(),
      getActivePromos(),
    ]);

    res.status(200).json({
      emailsTotal: emailStats.total,
      emailsToday: emailStats.today,
      ambassadors,
      merch,
      promosCount: promos.length,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
