// pages/contactus.tsx
'use client';

import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';

// Define the Turnstile global interface
interface TurnstileWindow extends Window {
  turnstile?: {
    render: (
      container: string,
      options: {
        sitekey: string;
        callback: (token: string) => void;
      }
    ) => void;
  };
}

declare const window: TurnstileWindow;

export default function ContactUs() {
  const formRef = useRef<HTMLFormElement>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const loadTurnstile = () => {
      if (window.turnstile) {
        window.turnstile.render('#cf-turnstile', {
          sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!,
          callback: (token: string) => setToken(token),
        });
      }
    };
    if (typeof window !== 'undefined') {
      loadTurnstile();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      captchaToken: token,
    };

    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus('success');
      e.currentTarget.reset();
      setToken(null);
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Contact SPL@T</title>
        <meta name="description" content="Contact the SPL@T team with your questions, pitches, or sexy ideas." />
      </Head>

      <main className="py-20 px-4 bg-acid-white text-black min-h-screen">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="mb-6 text-lg">Questions, collabs, or love notes? Slide into our inbox.</p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Your Name" className="w-full p-3 border rounded" required />
            <input type="email" name="email" placeholder="Your Email" className="w-full p-3 border rounded" required />
            <textarea name="message" placeholder="Your Message" rows={5} className="w-full p-3 border rounded" required />
            <div id="cf-turnstile" className="cf-turnstile" data-theme="light"></div>

            <button type="submit" className="bg-deep-crimson text-white px-6 py-3 rounded hover:bg-black">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && <p className="text-green-600 pt-2">Message sent! We’ll be in touch soon.</p>}
            {status === 'error' && <p className="text-red-600 pt-2">Something went wrong. Try again.</p>}
          </form>
        </div>
      </main>
    </>
  );
}
