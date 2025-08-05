import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate random uptime values for past 90 days (between 92% and 100%)
  const uptimeData = Array.from({ length: 90 }, () => {
    const base = 92;
    const variance = Math.random() * 8;
    const uptime = Math.round(base + variance);
    
    let color;
    if (uptime >= 99) {
      color = 'bg-green-500'; // Excellent uptime
    } else if (uptime >= 97) {
      color = 'bg-green-400'; // Good uptime
    } else if (uptime >= 95) {
      color = 'bg-yellow-400'; // Minor issues
    } else {
      color = 'bg-red-500'; // Significant issues
    }

    return { uptime, color };
  });

  res.status(200).json(uptimeData);
}
