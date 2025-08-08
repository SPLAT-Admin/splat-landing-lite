// instrumentation-client.ts
import * as Sentry from "@sentry/nextjs";

export function register() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Performance & Replay — tune to your traffic
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate:
      process.env.NODE_ENV === "production" ? 0.05 : 0.1,

    // Keep logs tidy (Sentry JS SDK v8+)
    debug: false,
    logLevel: "error",

    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
    release:
      process.env.NEXT_PUBLIC_SENTRY_RELEASE ||
      process.env.VERCEL_GIT_COMMIT_SHA ||
      "local-dev",
  });
}
