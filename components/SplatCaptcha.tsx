// components/SplatCaptcha.tsx
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Script from 'next/script';

type TurnstileTheme = 'light' | 'dark' | 'auto';

export interface SplatCaptchaProps {
  /**
   * Cloudflare Turnstile site key.  If not provided, falls back to the
   * `NEXT_PUBLIC_CLOUDFLARE_SITE_KEY` environment variable so most call sites
   * don't need to pass it explicitly.
   */
  siteKey?: string;
  action?: string;
  cData?: string;
  theme?: TurnstileTheme;
  className?: string;
  /** Optional id applied to the containing div. */
  containerId?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

declare global {
  interface Window {
    // Keep loose to avoid duplicate-declaration conflicts elsewhere
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    turnstile?: any;
  }
}

export default function SplatCaptcha({
  siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || '',
  action,
  cData,
  theme = 'dark',
  className,
  containerId,
  onVerify,
  onExpire,
  onError,
}: SplatCaptchaProps) {
  const autoId = useId();
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);

  const render = useCallback(() => {
    if (!window.turnstile || !widgetRef.current || widgetId) return;

    const id = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      theme,
      action,
      cData,
      callback: (token: string) => onVerify(token),
      'expired-callback': () => onExpire?.(),
      'error-callback': () => onError?.(),
    });
    setWidgetId(id);
  }, [siteKey, theme, action, cData, onVerify, onExpire, onError, widgetId]);

  // Re-render if props change meaningfully
  useEffect(() => {
    if (window.turnstile) render();
  }, [render]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.turnstile && widgetId) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // ignore
        }
      }
    };
  }, [widgetId]);

  return (
    <>
      {/* Load Turnstile once per page */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={render}
      />
      <div
        id={containerId || `splat-turnstile-${autoId}`}
        ref={widgetRef}
        className={className}
        // keep an explicit min-height so layout doesn't jump
        style={{ minHeight: 70 }}
      />
    </>
  );
}
