// components/SplatCaptcha.tsx
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Script from 'next/script';

type TurnstileTheme = 'light' | 'dark' | 'auto';

export interface SplatCaptchaProps {
  siteKey: string;                 // Required Cloudflare Turnstile site key
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    turnstile?: any;
  }
}

export default function SplatCaptcha({
  siteKey,
  action,
  cData,
  theme = 'dark',
  className,
  onVerify,
  onExpire,
  onError,
}: SplatCaptchaProps) {
  const id = useId();
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
        id={`splat-turnstile-${id}`}
        ref={widgetRef}
        className={className}
        // keep an explicit min-height so layout doesn't jump
        style={{ minHeight: 70 }}
      />
    </>
  );
}
