import * as Sentry from "@sentry/nextjs";

const environment = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment,
  tracesSampleRate: environment === "production" ? 0.2 : 1.0,
  debug: environment !== "production" && environment !== "preview",
});

Sentry.setTag("region", process.env.VERCEL_REGION || "local");
