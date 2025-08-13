// pages/_splat-sentry-boundary.tsx
import * as Sentry from "@sentry/nextjs";
import React, { type ReactNode } from "react";
import type { AppProps } from "next/app";

type BoundaryProps = { children: ReactNode };

export function SplatSentryBoundary({ children }: BoundaryProps): React.ReactElement {
  return (
    <Sentry.ErrorBoundary
      fallback={(props) => {
        const { error, componentStack, eventId, resetError } = props;
        const message = error instanceof Error ? error.message : "Unknown error";
        return (
          <div className="p-6 text-red-500">
            <h1 className="text-lg font-semibold">Something went wrong.</h1>
            <p className="mt-2 text-sm opacity-80">{message}</p>
            {componentStack ? (
              <pre className="mt-3 max-h-40 overflow-auto text-xs opacity-60">
                {componentStack}
              </pre>
            ) : null}
            {eventId ? (
              <p className="mt-2 text-xs opacity-60">Event ID: {eventId}</p>
            ) : null}
            <button
              type="button"
              className="mt-4 rounded-xl bg-black px-4 py-2 text-white"
              onClick={resetError}
            >
              Try again
            </button>
          </div>
        );
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

/** HOC: allows `export default withSplatBoundary(MyApp)` in pages/_app.tsx */
export default function withSplatBoundary(
  AppComponent: React.ComponentType<AppProps>
) {
  return function WrappedApp(props: AppProps): React.ReactElement {
    return (
      <SplatSentryBoundary>
        <AppComponent {...props} />
      </SplatSentryBoundary>
    );
  };
}
