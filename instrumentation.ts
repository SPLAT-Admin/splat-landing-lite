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
  ctx?: { route?: string }
) {
  const url = new URL(request.url);

  // Adapt Web Request -> Sentry RequestInfo
  const reqInfo = {
    method: request.method,
    url: request.url,
    path: url.pathname,
    headers: Object.fromEntries(request.headers),
  };

  // Minimal ErrorContext Sentry expects
  const errorContext = {
    routerKind: "app",                 // using the App Router
    routePath: ctx?.route || url.pathname,
    routeType: "route",                // or "navigation" depending on the error
  } as any;

  Sentry.captureRequestError(err as any, reqInfo as any, errorContext);
}
