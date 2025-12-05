import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const key = req.headers["x-admin-key"];
  if (process.env.ADMIN_API_KEY && key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("🔥 SPL@T rollback triggered… running rollback-latest-stable.sh");

    const rollbackResult = await new Promise<string>((resolve, reject) => {
      exec("bash ./scripts/rollback-latest-stable.sh", (error, stdout, stderr) => {
        if (error) {
          console.error("❌ Rollback script error:", stderr || error.message);
          reject(stderr || error.message);
        } else {
          console.log("✅ Rollback script executed successfully.");
          resolve(stdout);
        }
      });
    });

    let redeployResponse: string | null = null;
    if (process.env.VERCEL_DEPLOY_HOOK_URL) {
      const response = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
      redeployResponse = response.ok
        ? "✅ Vercel redeploy triggered successfully."
        : `⚠️ Redeploy failed: ${await response.text()}`;
    }

    res.status(200).json({
      message: "Rollback executed successfully.",
      output: rollbackResult.trim(),
      redeploy: redeployResponse || "No redeploy hook configured.",
    });
  } catch (err: any) {
    console.error("💀 Rollback failure:", err);
    res.status(500).json({ error: "Rollback failed", details: err });
  }
}
