import type { NextApiRequest, NextApiResponse } from "next";
import { getSignupTimeline } from "@/lib/adminMetrics";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const timeline = await getSignupTimeline();
    res.status(200).json(timeline);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
