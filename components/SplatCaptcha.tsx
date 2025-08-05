import { useEffect } from 'react';

type SplatCaptchaProps = {
  containerId: string;
  onVerify: (token: string) => void;
};

export default function SplatCaptcha({ containerId, onVerify }: SplatCaptchaProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.turnstile) {
        try {
          window.turnstile.render(`#${containerId}`, {
            sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || '',
            theme: 'dark',
            callback: (token: string) => onVerify(token),
          });
        } catch (err) {
          console.error(`⚠️ CAPTCHA failed to render for ${containerId}`, err);
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [containerId, onVerify]);

  return <div id={containerId}></div>;
}
