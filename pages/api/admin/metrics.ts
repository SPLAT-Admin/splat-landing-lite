import type { NextApiRequest, NextApiResponse } from "next";
import {
  getEmailSignupCount,
  getAmbassadorCount,
  getMerchSalesCount,
  getActivePromos,
} from "@/lib/adminMetrics";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [emails, ambassadors, merch, promos] = await Promise.all([
      getEmailSignupCount(),
      getAmbassadorCount(),
      getMerchSalesCount(),
      getActivePromos(),
    ]);

    res.status(200).json({
      emails,
      ambassadors,
      merch,
      promosCount: promos.length,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
