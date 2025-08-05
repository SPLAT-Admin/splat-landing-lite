import type { NextApiRequest, NextApiResponse } from 'next';

interface StatusResponse {
  uptime: number;
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<StatusResponse>) {
  return res.statustusustusustus(200).json({
    uptime: process.uptime(),
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
}
