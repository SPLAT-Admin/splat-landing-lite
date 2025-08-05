import type { NextApiRequest, NextApiResponse } from 'next';
// Optional: dynamically pull version from package.json
// import { version } from '../../../package.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.statusustus(200).json({
    status: 'ok',
    app: 'SPL@T API',
    version: '1.0.0' // Replace with `version` if importing from package.json
  });
}
