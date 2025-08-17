// components/SplatCaptcha.tsx
import { useCallback, useEffect, useMemo, useRef } from "react";
import Script from "next/script";

type TurnstileTheme = "light" | "dark" | "auto";

export interface SplatCaptchaProps {
  siteKey?: string;
  containerId?: string;
  action?: string;
  cData?: string;
  theme?: TurnstileTheme;
  className?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

declare global {
  interface Window {
    turnstile?: any;
  }
}

export default function SplatCaptcha({
  siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY ?? "",
  containerId,
  action,
  cData,
  theme = "dark",
  className = "my-6 flex justify-center",
  onVerify,
  onExpire,
  onError,
}: SplatCaptchaProps) {
  // Stable auto ID fallback (avoids hydration mismatch from useId())
  const autoId = useMemo(() => `splat-turnstile-${Math.random().toString(36).substring(2)}`, []);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!window.turnstile || !widgetRef.current || widgetIdRef.current) return;

    try {
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: siteKey,
        theme,
        action,
        cData,
        callback: onVerify,
        "expired-callback": () => onExpire?.(),
        "error-callback": () => onError?.(),
      });
    } catch (error) {
      console.error("Turnstile render error:", error);
    }
  }, [siteKey, theme, action, cData, onVerify, onExpire, onError]);

  // Retry render after delay in case it failed initially
  useEffect(() => {
    const retry = setTimeout(() => {
      if (!widgetIdRef.current && window.turnstile) {
        render();
      }
    }, 1000);

    return () => clearTimeout(retry);
  }, [render]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // silent fail
        }
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={render}
      />
      <div
        id={containerId ?? autoId}
        ref={widgetRef}
        className={className}
        style={{ minHeight: 70 }}
      />
    </>
  );
}
