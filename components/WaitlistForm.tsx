// components/WaitlistForm.tsx
import { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

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
        if (window?.plausible) {
          window.plausible('Waitlist Signup', { props: { location: 'waitlist-page' } });
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
      <label htmlFor="email" className="block text-lg font-medium">Email Address</label>
      <input
        type="email"
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full px-4 py-2 rounded text-black"
      />

      {/* Turnstile CAPTCHA */}
      <div
        className="cf-turnstile mt-4"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-theme="light"
      ></div>
      <input type="hidden" id="turnstile-token" name="token" />

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600 transition"
        disabled={loading}
      >
        {loading ? 'Submitting…' : 'Join Waitlist'}
      </button>

      {message && <p className="mt-2 text-center text-sm text-gray-300">{message}</p>}

      {/* Turnstile Script */}
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
    </form>
  );
}
