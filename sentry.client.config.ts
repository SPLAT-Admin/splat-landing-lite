import * as Sentry from "@sentry/nextjs";

const environment =
  process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || "development";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment,
  tracesSampleRate: environment === "production" ? 0.2 : 1.0,

  // Session Replay sampling
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: environment === "production" ? 0.1 : 1.0,

  // Use the v8-style function, NOT `new Replay()` and NOT `@sentry/nextjs/replay`
  integrations: [Sentry.replayIntegration()],

  // Tunnel to avoid ad blockers
  tunnel: "/api/sentry-tunnel",

  // Less noise in preview/prod
  debug: environment !== "production" && environment !== "preview",
});

// Optional tag
Sentry.setTag(
  "commit",
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "local"
);
