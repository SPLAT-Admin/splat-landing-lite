// pages/_error.tsx
import Error from "next/error";
import type { NextPageContext } from "next";
import * as Sentry from "@sentry/nextjs";

interface CustomErrorProps {
  statusCode?: number;
}

const CustomErrorComponent = ({ statusCode = 500 }: CustomErrorProps) => {
  return <Error statusCode={statusCode} />;
};

CustomErrorComponent.getInitialProps = async (ctx: NextPageContext) => {
  const { res, err, asPath } = ctx;

  const statusCode =
    res?.statusCode ?? (err as any)?.statusCode ?? 404;

  // Only ping Sentry in production to avoid noisy dev logs
  const shouldReport = process.env.NODE_ENV === "production";

  try {
    if (shouldReport) {
      if (err) {
        // Real exception – capture the stack, tag it
        Sentry.captureException(err, {
          tags: { scope: "_error", where: "getInitialProps" },
          extra: { asPath, statusCode },
        });
        await Sentry.flush(2000);
      } else if (statusCode >= 500) {
        // No thrown error, but server-side failure – still report
        Sentry.captureMessage(
          `Rendered _error.tsx with status ${statusCode} at ${asPath}`,
          "error"
        );
        await Sentry.flush(2000);
      }
    }
  } catch {
    // Never let reporting break the error page
  }

  return { statusCode };
};

export default CustomErrorComponent;
