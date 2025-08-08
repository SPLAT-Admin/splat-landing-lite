// components/SplatCaptcha.tsx
import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          action?: string;
          cData?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string; // widgetId
      remove?: (widgetId: string) => void;
    };
  }
}

type Props = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  siteKey?: string; // falls back to NEXT_PUBLIC_TURNSTILE_SITE_KEY
  theme?: "light" | "dark" | "auto";
  action?: string;
  cData?: string;
  className?: string;
};

export default function SplatCaptcha({
  onVerify,
  onExpire,
  onError,
  siteKey,
  theme = "dark",
  action,
  cData,
  className,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const key = siteKey ?? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!key) {
    // Fail closed: render nothing if misconfigured (prevents broken UX)
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        "SplatCaptcha: missing NEXT_PUBLIC_TURNSTILE_SITE_KEY (or `siteKey` prop)."
      );
    }
  }

  useEffect(() => {
    let removed = false;

    function renderIfReady() {
      if (!hostRef.current || !window.turnstile || widgetIdRef.current || !key) return;
      widgetIdRef.current = window.turnstile.render(hostRef.current, {
        sitekey: key,
        theme,
        action,
        cData,
        callback: (token) => onVerify(token),
        "expired-callback": () => onExpire?.(),
        "error-callback": () => onError?.(),
      });
    }

    // If script already loaded, render immediately
    renderIfReady();

    return () => {
      removed = true;
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, theme, action, cData, onVerify, onExpire, onError]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Render once script is ready (if not already rendered)
          if (hostRef.current && !widgetIdRef.current) {
            // @ts-ignore-next-line
            if (window.turnstile) {
              widgetIdRef.current = window.turnstile.render(hostRef.current, {
                sitekey: key!,
                theme,
                action,
                cData,
                callback: (token: string) => onVerify(token),
                "expired-callback": () => onExpire?.(),
                "error-callback": () => onError?.(),
              });
            }
          }
        }}
      />
      <div ref={hostRef} className={className} />
    </>
  );
}
