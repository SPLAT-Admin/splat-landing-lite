import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { sendError } from './apiResponse';

interface HandlerOptions {
  allowedMethods?: string[];
}

export function splatApiHandler(handler: NextApiHandler, options: HandlerOptions = {}) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { allowedMethods = ['POST'] } = options;

    // Method check
    if (!allowedMethods.includes(req.method || '')) {
      return sendError(res, 405, `Method ${req.method} Not Allowed`);
    }

    try {
      return await handler(req, res);
    } catch (error: any) {
      console.error(`❌ API Error in ${req.url}:`, error);
      return sendError(res, 500, 'Internal Server Error');
    }
  };
}
