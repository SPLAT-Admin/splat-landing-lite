import type { NextApiRequest, NextApiResponse } from 'next';

// ✅ Safer require path using process.cwd()
const { version } = require(`${process.cwd()}/package.json`);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({
    status: 'ok',
    app: 'SPL@T API',
    version
  });
}
