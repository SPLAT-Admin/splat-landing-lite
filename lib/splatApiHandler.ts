import type { NextApiRequest, NextApiResponse } from 'next';
import { sendError, type APIResponse } from './apiResponse';

export function splatApiHandler<T = unknown>(
  handler: (req: NextApiRequest, res: NextApiResponse<APIResponse<T>>) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse<APIResponse<T>>) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        sendError(res, 500, 'Internal Server Error');
      }
    }
  };
}
