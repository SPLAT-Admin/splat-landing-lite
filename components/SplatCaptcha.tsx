import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    turnstile?: any;
  }
}

interface SplatCaptchaProps {
  siteKey?: string;
  containerId: string;
  onVerify: (token: string) => void;
}

export default function SplatCaptcha({ 
  siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || '', 
  containerId, 
  onVerify 
}: SplatCaptchaProps) {

  useEffect(() => {
    if (!siteKey) {
      console.warn("⚠️ NEXT_PUBLIC_CLOUDFLARE_SITE_KEY is missing.");
      return;
    }
    if (window.turnstile) {
      window.turnstile.render(`#${containerId}`, {
        sitekey: siteKey,
        callback: onVerify,
        theme: 'dark',
        refreshExpired: 'auto'
      });
    }
  }, [siteKey, containerId, onVerify]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.turnstile) {
            window.turnstile.render(`#${containerId}`, {
              sitekey: siteKey,
              callback: onVerify,
              theme: 'dark',
              refreshExpired: 'auto'
            });
          }
        }}
      />
      <div id={containerId} className="flex justify-center my-4"></div>
    </>
  );
}
