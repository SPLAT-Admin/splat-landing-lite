// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Perf sampling — server-side
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,

  // Keep noise down (v8+)
  debug: false,
  logLevel: "error",

  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
  release: process.env.VERCEL_GIT_COMMIT_SHA || "local-dev",

  // Safety: don’t crash the app if reporting hiccups
  integrations: (ints) => ints,
  beforeSend(event) {
    // Drop noisy network errors in dev if you want:
    // if (process.env.NODE_ENV !== "production" && event.level === "error") return null;
    return event;
  },
});
