// instrumentation.ts
import * as Sentry from "@sentry/nextjs";

// Runs on server/edge startup. Defer to your existing Sentry configs.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  } else if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Catch request errors from nested React Server Components (Next 15)
export function onRequestError(err: unknown) {
  Sentry.captureRequestError(err);
}
