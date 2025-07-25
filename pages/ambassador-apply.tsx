// pages/ambassador-apply.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
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
    referral: '',
    captchaToken: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (window as any).handleCaptcha = (token: string) => {
      setFormData((prev) => ({ ...prev, captchaToken: token }));
    };
  }, []);

  useEffect(() => {
    const turnstileInterval = setInterval(() => {
      const turnstile = (window as any).turnstile;
      const widgetContainer = document.querySelector('.cf-turnstile');

      if (turnstile && widgetContainer && !widgetContainer.hasAttribute('data-rendered')) {
        console.log('🔄 Forcing Turnstile render...');
        turnstile.render(widgetContainer, {
          sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!,
          callback: (token: string) => {
            setFormData((prev) => ({ ...prev, captchaToken: token }));
          },
        });
        widgetContainer.setAttribute('data-rendered', 'true');
        clearInterval(turnstileInterval);
      }
    }, 500);

    return () => clearInterval(turnstileInterval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/ambassador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.error || 'Submission failed');
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <>
      <Head>
        <title>Apply to be a SPL@T Ambassador</title>
      </Head>

      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        async
      />

      <div className="min-h-screen bg-[color:var(--deep-crimson)] text-white px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">Be a SPL@T Ambassador</h1>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 bg-black p-6 rounded-lg shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="first_name" required placeholder="First Name" onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white placeholder-white" />
                <input type="text" name="last_name" required placeholder="Last Name" onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white placeholder-white" />
              </div>
              <input type="text" name="preferred_name" placeholder="Preferred Name" onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white placeholder-white" />
              <input type="date" name="dob" required onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white" />
              <input type="email" name="email" required placeholder="Email" onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white placeholder-white" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="city" required placeholder="City" onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white placeholder-white" />
                <select name="state" required onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white">
                  <option value="">Select State</option>
                  {["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <input type="text" name="social_media_handles" required placeholder="Social Media Handles" onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white placeholder-white" />
              <input type="number" name="number_of_followers" required placeholder="Number of Followers" onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white placeholder-white" />
              <textarea name="qualifications_why" required placeholder="Why do you want to be an Ambassador?" onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white placeholder-white" rows={4} />
              <input type="text" name="referral" placeholder="Referral (if any)" onChange={handleChange} className="p-3 rounded bg-[color:var(--deep-crimson)] text-white placeholder-white" />

              <div
                className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
                data-callback="handleCaptcha"
              ></div>

              <button
                type="submit"
                className="mt-4 bg-white text-[color:var(--deep-crimson)] font-bold py-2 px-4 rounded hover:bg-gray-200"
              >
                Submit Application
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          ) : (
            <div className="bg-black p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-4">Thank you for applying!</h2>
              <p>We’ll review your application and get back to you soon. 💦</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
