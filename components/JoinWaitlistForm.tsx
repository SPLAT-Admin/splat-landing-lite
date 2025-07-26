'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;

export default function JoinWaitlistForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.turnstile) {
      window.turnstile.render('#turnstile-container', {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          (document.getElementById('turnstile-token') as HTMLInputElement).value = token;
        }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = (document.getElementById('turnstile-token') as HTMLInputElement)?.value;
    if (!token) {
      setMessage('Please verify with the CAPTCHA');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/join-waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Thanks! Check your email soon.');
    } else {
      setMessage(data.error || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg p-6 shadow-lg text-black max-w-md mx-auto">
      <label htmlFor="email" className="block font-bold text-lg">Email</label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />

      <div id="turnstile-container"></div>
      <input type="hidden" id="turnstile-token" name="token" />

      <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700">
        {loading ? 'Sending…' : 'Join Waitlist'}
      </button>

      {message && <p className="mt-2 text-red-600 text-center">{message}</p>}

      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
    </form>
  );
}
