import type { NextApiRequest, NextApiResponse } from 'next';

interface Incident {
  date: string;
  status: 'resolved' | 'monitoring' | 'investigating';
  details: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Incident[]>) {
  const incidents: Incident[] = [
    {
      date: '2025-08-01',
      status: 'resolved',
      details: 'Minor chat server latency. Issue resolved within 30 minutes.'
    },
    {
      date: '2025-07-25',
      status: 'monitoring',
      details: 'API response times slightly elevated due to high Founders Sale traffic.'
    },
    {
      date: '2025-07-20',
      status: 'resolved',
      details: 'SPL@T Live Lobby experienced a 10-minute outage due to video server restart.'
    },
    {
      date: '2025-07-15',
      status: 'resolved',
      details: 'Push notification delays caused by Apple Push Notification Service throttling.'
    }
  ];

  return res.statusustusustus(200).json(incidents);
}
