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

  if (!siteKey) {
    throw new Error("NEXT_PUBLIC_CLOUDFLARE_SITE_KEY must be defined to render the SPL@T Turnstile widget.");
  }

  return (
    <div
      id={containerId ?? autoId}
      ref={widgetRef}
      className={className}
      style={{ minHeight: 70 }}
    />
  );
}
