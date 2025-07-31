import type { NextApiResponse } from 'next';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

export function sendSuccess(res: NextApiResponse, message: string, data?: any) {
  return res.status(200).json({ success: true, message, data });
}

export function sendError(res: NextApiResponse, statusCode: number, error: string) {
  return res.status(statusCode).json({ success: false, error });
}
