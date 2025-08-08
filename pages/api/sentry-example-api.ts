import type { NextApiRequest, NextApiResponse } from "next";

// A faulty API route to test Sentry's error monitoring
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  throw new SentryExampleAPIError(
    "This error is raised on the backend called by the example page."
  );
  // Unreachable, but types are happy either way:
  // res.status(200).json({ name: "John Doe" });
}
