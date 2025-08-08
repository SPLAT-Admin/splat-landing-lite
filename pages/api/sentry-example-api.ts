// pages/api/sentry-example-api.ts
import type { NextApiRequest, NextApiResponse } from "next";

// A faulty API route to test Sentry's error monitoring
export default function handler(_req: NextApiRequest, _res: NextApiResponse) {
  throw new Error(
    "This error is raised on the backend called by the example page."
  );
}
