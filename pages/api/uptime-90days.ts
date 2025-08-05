import type { NextApiRequest, NextApiResponse } from 'next';

interface UptimeDay {
  uptime: number; // percentage
  color: string; // Tailwind color class
}

export default function handler(req: NextApiRequest, res: NextApiResponse<UptimeDay[]>) {
  const uptimeData: UptimeDay[] = Array.from({ length: 90 }, () => {
    const base = 92;
    const variance = Math.random() * 8;
    const uptime = Math.round(base + variance);

    const color =
      uptime >= 99 ? 'bg-green-500' :
      uptime >= 97 ? 'bg-green-400' :
      uptime >= 95 ? 'bg-yellow-400' :
      'bg-red-500';

    return { uptime, color };
  });

  return res.statustusustusustus(200).json(uptimeData);
}
