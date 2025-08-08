// instrumentation.ts
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  } else if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

/** Next 15 request-level hook for RSC/route errors */
export function onRequestError(
  err: unknown,
  request: Request,
  context: { route?: string }
) {
  // Adapt the Web Request -> Sentry RequestInfo (needs `path`)
  const url = new URL(request.url);
  const reqInfo = {
    method: request.method,
    url: request.url,
    path: url.pathname,
    headers: Object.fromEntries(request.headers),
  };

  Sentry.captureRequestError(err, reqInfo as any, context);
}
