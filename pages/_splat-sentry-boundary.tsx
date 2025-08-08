import { ErrorBoundary } from "@sentry/nextjs";
import React from "react";

function Fallback({ error, resetError }: any) {
  return (
    <div style={{ padding: 16, color: "white", background: "#111", borderRadius: 16 }}>
      <h2 style={{ margin: 0, fontWeight: 700 }}>Something splatted.</h2>
      <p style={{ opacity: 0.8 }}>We’ve logged it—try again.</p>
      <pre style={{ fontSize: 12, whiteSpace: "pre-wrap" }}>{String(error)}</pre>
      <button onClick={resetError} style={{ marginTop: 8, padding: "6px 12px", background: "#dc2626", borderRadius: 12 }}>
        Retry
      </button>
    </div>
  );
}

export default function withSplatBoundary(App: any) {
  return function WrappedApp(props: any) {
    return (
      <ErrorBoundary fallback={Fallback} showDialog={false}>
        <App {...props} />
      </ErrorBoundary>
    );
  };
}
