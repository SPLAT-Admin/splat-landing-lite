// pages/contactus.tsx
import Head from 'next/head';
import { useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '', captchaToken: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

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
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-[color:var(--deep-crimson)]">Contact Us</h1>
          <p className="mb-8 text-gray-300">Got questions, collab ideas, or just want to say hi? Drop us a line below.</p>
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-gray-800 text-white rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-gray-800 text-white rounded"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full px-4 py-3 bg-gray-800 text-white rounded h-32"
              required
            />
            <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}></div>
            <button
              type="submit"
              className="bg-[color:var(--deep-crimson)] hover:bg-red-800 text-white px-6 py-3 rounded w-full font-bold transition"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="text-green-500 mt-2">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
