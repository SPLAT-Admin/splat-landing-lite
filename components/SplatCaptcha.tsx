// components/SplatCaptcha.tsx
import { useCallback, useEffect, useMemo, useRef } from "react";

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

const ENV_SITE_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;
const DEFAULT_SITE_KEY = ENV_SITE_KEY && ENV_SITE_KEY.trim().length > 0 ? ENV_SITE_KEY : "fake-dev-key";

export default function SplatCaptcha({
  siteKey,
  containerId,
  action,
  cData,
  theme = "dark",
  className = "my-6 flex justify-center",
  onVerify,
  onExpire,
  onError,
}: SplatCaptchaProps) {
  const resolvedSiteKey = useMemo(() => {
    if (siteKey && siteKey.trim().length > 0) {
      return siteKey.trim();
    }
    return DEFAULT_SITE_KEY;
  }, [siteKey]);

  // Stable auto ID fallback (avoids hydration mismatch from useId())
  const autoId = useMemo(() => `splat-turnstile-${Math.random().toString(36).substring(2)}`, []);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!window.turnstile || !widgetRef.current || widgetIdRef.current) return;

    try {
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: resolvedSiteKey,
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
  }, [resolvedSiteKey, theme, action, cData, onVerify, onExpire, onError]);

  // Attempt render until widget is ready
  useEffect(() => {
    if (window.turnstile) {
      render();
    }

    const interval = setInterval(() => {
      if (window.turnstile && !widgetIdRef.current) {
        render();
      }
      if (widgetIdRef.current) {
        clearInterval(interval);
      }
    }, 750);

    return () => clearInterval(interval);
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
    <div
      id={containerId ?? autoId}
      ref={widgetRef}
      className={className}
      style={{ minHeight: 70 }}
    />
  );
}
