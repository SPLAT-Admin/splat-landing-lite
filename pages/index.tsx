'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [referralSource, setReferralSource] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('utm_source');
    if (ref) setReferralSource(ref);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.turnstile && document.getElementById('cf-turnstile')) {
      window.turnstile.render('#cf-turnstile', {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          const input = document.getElementById('turnstile-token') as HTMLInputElement;
          if (input) input.value = token;
        },
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = (document.getElementById('turnstile-token') as HTMLInputElement)?.value;
    if (!token) {
      setMessage('CAPTCHA verification required.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          token,
          referral_source: referralSource,
          marketing_channel: 'waitlist-page',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        if (typeof window !== 'undefined' && 'plausible' in window) {
          (window as any).plausible?.('Waitlist Signup', { props: { location: 'waitlist-page' } });
        }
        router.push('/thanks');
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="email" className="block text-lg font-medium text-black">Email Address</label>
      <input
        type="email"
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full px-4 py-2 rounded text-black border border-gray-300"
      />

      <div id="cf-turnstile" className="mt-4"></div>
      <input type="hidden" id="turnstile-token" name="token" />

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600 transition"
        disabled={loading}
      >
        {loading ? 'Submitting…' : 'Join Waitlist'}
      </button>

      {message && <p className="mt-2 text-center text-sm text-gray-700">{message}</p>}

      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
    </form>
  );
}

// Allow global declaration of window.turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (id: string, options: { sitekey: string; callback: (token: string) => void }) => void;
    };
  }
}
