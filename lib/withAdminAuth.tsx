import type { NextApiRequest, NextApiResponse } from "next";

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

type AuthenticatedHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

export function withAdminAuth(handler: ApiHandler): AuthenticatedHandler {
  return async (req, res) => {
    try {
      const auth = req.headers.authorization;
      if (!auth) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      return handler(req, res);
    } catch (err) {
      console.error("Auth failed", err);
      return res.status(500).json({ error: "Auth failed" });
    }
  };
}
