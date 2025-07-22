// pages/ambassador-apply.tsx
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

export default function AmbassadorApply() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    preferred_name: '',
    dob: '',
    email: '',
    city: '',
    state: '',
    social_media_handles: '',
    number_of_followers: '',
    qualifications_why: '',
    captchaToken: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!formData.captchaToken) {
      setError('CAPTCHA verification required');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/ambassador-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      router.push('/thank-you');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Apply to Be a SPL@T Ambassador</title>
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </Head>

      <section className="bg-black text-white min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-[color:var(--deep-crimson)]">SPL@T Ambassador Application</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input name="first_name" placeholder="First Name" onChange={handleChange} required className="w-1/2 p-2 rounded bg-gray-800" />
              <input name="last_name" placeholder="Last Name" onChange={handleChange} required className="w-1/2 p-2 rounded bg-gray-800" />
            </div>
            <input name="preferred_name" placeholder="Preferred Name (optional)" onChange={handleChange} className="w-full p-2 rounded bg-gray-800" />
            <input name="dob" placeholder="Date of Birth (MM/DD/YYYY)" onChange={handleChange} required className="w-full p-2 rounded bg-gray-800" />
            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-2 rounded bg-gray-800" />
            <input name="city" placeholder="City" onChange={handleChange} required className="w-full p-2 rounded bg-gray-800" />
            <select name="state" onChange={handleChange} required className="w-full p-2 rounded bg-gray-800">
              <option value="">Select State</option>
              {[
                'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
                'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
                'VA', 'WA', 'WV', 'WI', 'WY']
                .map(state => <option key={state} value={state}>{state}</option>)
              }
            </select>
            <input name="social_media_handles" placeholder="Social Media Handles" onChange={handleChange} required className="w-full p-2 rounded bg-gray-800" />
            <input name="number_of_followers" placeholder="# of Followers (total)" type="number" onChange={handleChange} required className="w-full p-2 rounded bg-gray-800" />
            <textarea name="qualifications_why" placeholder="Why do you want to be a SPL@T Ambassador?" onChange={handleChange} required className="w-full p-2 rounded bg-gray-800" />
            <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!} data-callback="(token) => setFormData({ ...formData, captchaToken: token })"></div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full bg-[color:var(--deep-crimson)] hover:bg-red-700 p-3 rounded font-bold">
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
