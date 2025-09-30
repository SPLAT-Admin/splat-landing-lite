// lib/apiResponse.ts
import type { NextApiResponse } from 'next';

export interface APIResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  redirectTo?: string;
  error?: string;
}

/**
 * Sends a structured error response.
 */
export function sendError<T = unknown>(
  res: NextApiResponse<APIResponse<T>>,
  status: number,
  message: string,
  data?: T
): void {
  const payload: APIResponse<T> = {
    success: false,
    error: message,
    ...(data !== undefined ? { data } : {}),
  };
  res.status(status).json(payload);
}

/**
 * Sends a structured success response.
 */
export function sendSuccess<T = unknown>(
  res: NextApiResponse<APIResponse<T>>,
  message: string,
  data?: T,
  redirectTo?: string
): void {
  const payload: APIResponse<T> = {
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
    ...(redirectTo ? { redirectTo } : {}),
  };
  res.status(200).json(payload);
}
