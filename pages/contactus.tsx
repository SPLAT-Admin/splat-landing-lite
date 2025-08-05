import Head from 'next/head';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    if (!form.captchaToken) {
      setStatus('error');
      setError('Please complete CAPTCHA');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
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

      <section className="bg-gradient-to-b from-[#851725] via-black to-black text-white min-h-screen py-20 px-4 flex justify-center items-center">
        <div className="max-w-lg w-full bg-gray-900 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-[#851725] mb-4">Contact Us</h1>
          <p className="text-center text-gray-300 mb-8">
            Got questions, collab ideas, or just want to say hi? Drop us a line below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="w-full px-4 py-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-[#851725]" />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="w-full px-4 py-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-[#851725]" />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required className="w-full px-4 py-3 bg-black border border-gray-700 rounded text-white h-32 focus:outline-none focus:border-[#851725]" />

            <SplatCaptcha containerId="cf-turnstile-contact" onVerify={(token) => setForm((prev: ContactForm) => ({ ...prev, captchaToken: token }))} />

            <button type="submit" className="bg-[#851725] hover:bg-red-800 text-white px-6 py-3 rounded-full w-full font-bold transition shadow-md hover:shadow-lg" disabled={status === 'loading'}>
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
