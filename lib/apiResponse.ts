// lib/apiResponse.ts
import type { NextApiResponse } from 'next';

type APIResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  redirectTo?: string;
  error?: string;
};

/**
 * Sends a structured error response.
 */
export function sendError(
  res: NextApiResponse,
  status: number,
  message: string,
  data?: any
) {
  const payload: APIResponse = {
    success: false,
    error: message,
    ...(data ? { data } : {})
  };
  res.status(status).json(payload);
}

/**
 * Sends a structured success response.
 */
export function sendSuccess<T = any>(
  res: NextApiResponse,
  message: string,
  data?: T,
  redirectTo?: string
) {
  const payload: APIResponse<T> = {
    success: true,
    message,
    ...(data ? { data } : {}),
    ...(redirectTo ? { redirectTo } : {})
  };
  res.status(200).json(payload);
}
