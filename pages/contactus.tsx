// pages/contactus.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', captchaToken: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || '';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      if ((window as any).turnstile && siteKey) {
        (window as any).turnstile.render('#contactus-turnstile', {
          sitekey: siteKey,
          theme: 'dark',
        });
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [siteKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const token = (window as any).turnstile?.getResponse();
    if (!token) {
      setStatus('error');
      setError('CAPTCHA not verified');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken: token })
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '', captchaToken: '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | SPL@T</title>
      </Head>
      <section className="bg-black text-white min-h-screen py-20 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-[color:var(--deep-crimson)]">Contact Us</h1>
          <p className="text-center mb-10 text-gray-300">
            Got questions, collab ideas, or just want to say hi? Drop us a line below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="w-full px-4 py-3 bg-gray-800 text-white rounded" />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="w-full px-4 py-3 bg-gray-800 text-white rounded" />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required className="w-full px-4 py-3 bg-gray-800 text-white rounded h-32" />
            {siteKey && <div id="contactus-turnstile" className="my-4"></div>}
            <button
              type="submit"
              className="bg-[color:var(--deep-crimson)] hover:bg-red-800 text-white px-6 py-3 rounded w-full font-bold transition"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="text-green-500 mt-2 text-center">Thanks! We'll be in touch soon.</p>}
            {status === 'error' && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
