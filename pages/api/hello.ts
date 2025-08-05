import type { NextApiRequest, NextApiResponse } from 'next';
import { version } from '../../../package.json'; // ✅ pull from real source

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({
    status: 'ok',
    app: 'SPL@T API',
    version // ✅ no need to hardcode
  });
}
