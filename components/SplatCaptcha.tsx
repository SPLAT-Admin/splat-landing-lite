// components/SplatCaptcha.tsx
import { useCallback, useEffect, useId, useRef } from 'react';
import Script from 'next/script';

type TurnstileTheme = 'light' | 'dark' | 'auto';

export interface SplatCaptchaProps {
  /**
   * Optional Cloudflare Turnstile site key. If omitted, the component will
   * fall back to `NEXT_PUBLIC_CLOUDFLARE_SITE_KEY` so pages don't need to pass
   * it explicitly.
   */
  siteKey?: string;
  /**
   * Custom id to apply to the container. Useful when multiple widgets are on
   * a single page and a stable id is needed.
   */
  containerId?: string;
  action?: string;                 // Optional action name
  cData?: string;                  // Optional custom data
  theme?: TurnstileTheme;          // Theme, defaults to 'dark'
  className?: string;              // Wrapper class
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

declare global {
  interface Window {
    // Keep loose to avoid duplicate-declaration conflicts elsewhere
    turnstile?: any;
  }
}

export default function SplatCaptcha({
  siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY ?? '',
  containerId,
  action,
  cData,
  theme = 'dark',
  className,
  onVerify,
  onExpire,
  onError,
}: SplatCaptchaProps) {
  // Generate a stable id for the widget. Allow callers to override if a
  // predictable id is required.
  const autoId = useId().replace(/:/g, '');
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!window.turnstile || !widgetRef.current || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      theme,
      action,
      cData,
      callback: onVerify,
      'expired-callback': () => onExpire?.(),
      'error-callback': () => onError?.(),
    });
  }, [siteKey, theme, action, cData, onVerify, onExpire, onError]);

  // Re-render if props change meaningfully
  useEffect(() => {
    if (window.turnstile) render();
  }, [render]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <>
      {/* Load Turnstile once per page */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={render}
      />
      <div
        id={containerId ?? `splat-turnstile-${autoId}`}
        ref={widgetRef}
        className={className}
        // keep an explicit min-height so layout doesn't jump
        style={{ minHeight: 70 }}
      />
    </>
  );
}
