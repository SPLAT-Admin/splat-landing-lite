import type { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  const envelope = Buffer.concat(chunks).toString("utf8");

  const [headerLine] = envelope.split("\n");
  let projectId = "";
  try {
    const header = JSON.parse(headerLine);
    const dsn: string = header?.dsn || "";
    projectId = dsn.split("/").pop() || "";
  } catch {}
  if (!projectId) return res.status(400).send("Bad Sentry envelope");

  const sentryIngestBase = "https://o447951.ingest.sentry.io/api/"; // swap if your org uses a different host
  const sentryUrl = `${sentryIngestBase}${projectId}/envelope/`;

  const upstream = await fetch(sentryUrl, {
    method: "POST",
    body: envelope,
    headers: { "Content-Type": "application/x-sentry-envelope" },
  });

  res.status(upstream.status).end();
}
