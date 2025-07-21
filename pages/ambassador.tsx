// pages/ambassador.tsx
import Head from 'next/head';
import { useState } from 'react';

export default function AmbassadorPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    preferred_name: '',
    city: '',
    state: '',
    email: '',
    social_media_handles: '',
    number_of_followers: '',
    qualifications_why: '',
    referral: '',
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

    const token = (window as any).turnstile?.getResponse();
    if (!token) {
      setStatus('error');
      setError('CAPTCHA not verified');
      return;
    }

    try {
      const res = await fetch('/api/send-ambassador-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken: token })
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm({
        first_name: '', last_name: '', preferred_name: '', city: '', state: '', email: '',
        social_media_handles: '', number_of_followers: '', qualifications_why: '', referral: '', captchaToken: ''
      });
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Become a SPL@T Ambassador</title>
        <script
          defer
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        ></script>
        <script
          defer
          data-domain="usesplat.com"
          src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible = window.plausible || function() {
              (window.plausible.q = window.plausible.q || []).push(arguments)
            }`,
          }}
        />
      </Head>
      <section className="bg-black text-white min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-[color:var(--deep-crimson)]">SPL@T Ambassador Program</h1>
          <p className="text-center mb-8 text-gray-300">
            Are you bold, sexy, connected, and down to share the SPL@T movement? Whether you're an influencer, club kid, community icon, or just super social — we want you.
          </p>
          <p className="text-center mb-10 text-sm text-gray-400">
            Ambassadors get early access, free perks, and a chance to help shape the gay hookupverse.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" required className="px-4 py-3 bg-gray-800 text-white rounded" />
              <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" required className="px-4 py-3 bg-gray-800 text-white rounded" />
              <input name="preferred_name" value={form.preferred_name} onChange={handleChange} placeholder="Preferred Name (optional)" className="px-4 py-3 bg-gray-800 text-white rounded" />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="px-4 py-3 bg-gray-800 text-white rounded" />
              <input name="city" value={form.city} onChange={handleChange} placeholder="City" required className="px-4 py-3 bg-gray-800 text-white rounded" />
              <input name="state" value={form.state} onChange={handleChange} placeholder="State" required className="px-4 py-3 bg-gray-800 text-white rounded" />
            </div>
            <input name="social_media_handles" value={form.social_media_handles} onChange={handleChange} placeholder="Social Media Handles (e.g. @usesplat)" required className="w-full px-4 py-3 bg-gray-800 text-white rounded" />
            <input name="number_of_followers" value={form.number_of_followers} onChange={handleChange} placeholder="Number of Followers (est.)" type="number" required className="w-full px-4 py-3 bg-gray-800 text-white rounded" />
            <textarea name="qualifications_why" value={form.qualifications_why} onChange={handleChange} placeholder="Tell us why you're a fit" required className="w-full px-4 py-3 bg-gray-800 text-white rounded h-28" />
            <input name="referral" value={form.referral} onChange={handleChange} placeholder="Referred by (optional)" className="w-full px-4 py-3 bg-gray-800 text-white rounded" />
            <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}></div>
            <button
              type="submit"
              className="bg-[color:var(--deep-crimson)] hover:bg-red-800 text-white px-6 py-3 rounded w-full font-bold transition"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'Apply Now'}
            </button>
            {status === 'success' && <p className="text-green-500 mt-2 text-center">Application sent successfully!</p>}
            {status === 'error' && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
