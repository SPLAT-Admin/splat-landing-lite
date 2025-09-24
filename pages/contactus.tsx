import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SplatCaptcha from '../components/SplatCaptcha';
import { ContactForm } from '../types';

export default function ContactUsPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
    captchaToken: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    if (!form.captchaToken) {
      setStatus('error');
      setError('Please complete the CAPTCHA');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const message = json?.error || 'Submission failed';
        setForm((prev) => ({ ...prev, captchaToken: '' }));
        throw new Error(message);
      }

      const redirect = json?.redirectTo || json?.data?.redirectTo;
      setStatus('success');
      setForm({ name: '', email: '', message: '', captchaToken: '' });

      if (redirect) {
        await router.push(redirect);
        return;
      }
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Submission failed');
      setForm((prev) => ({ ...prev, captchaToken: '' }));
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | SPL@T</title>
      </Head>

      <section className="bg-black text-white min-h-screen py-20 px-4 flex justify-center items-center">
        <div className="max-w-lg w-full bg-black border border-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-crimson drop-shadow-lg">Contact Us</h1>
          <p className="text-center text-gray-300 mb-8 text-[14pt]">
            Got questions, collab ideas, or just want to say hi? Drop us a line below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-[14pt]">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-semibold">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded bg-black border border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-semibold">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded bg-black border border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="mb-1 font-semibold">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="px-4 py-3 rounded bg-black border border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <SplatCaptcha
              containerId="cf-turnstile-contact"
              onVerify={(token) => setForm((prev: ContactForm) => ({ ...prev, captchaToken: token }))}
              onExpire={() => setForm((prev) => ({ ...prev, captchaToken: '' }))}
              onError={() => setForm((prev) => ({ ...prev, captchaToken: '' }))}
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-crimson hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full transition shadow-md hover:shadow-lg"
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
