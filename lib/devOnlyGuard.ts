import type { NextApiResponse } from "next";

export function devOnlyGuard(res: NextApiResponse): boolean {
  if (process.env.NODE_ENV === "production") {
    res.status(403).json({ success: false, error: "This endpoint is disabled in production" });
    return true;
  }
  return false;
}
