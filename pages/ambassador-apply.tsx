import { useState } from 'react';
import Head from 'next/head';
import SplatCaptcha from '../components/SplatCaptcha';
import { AmbassadorForm } from '../types';

export default function AmbassadorApply() {
  const [formData, setFormData] = useState<AmbassadorForm>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.captchaToken) {
      setError('Please complete the CAPTCHA.');
      return;
    }

    try {
      const response = await fetch('/api/ambassador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => null);
        setError(errJson?.error || `Submission failed (${response.status})`);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError(`Something went wrong: ${err}`);
    }
  };

  return (
    <>
      <Head>
        <title>Apply to be a SPL@T Ambassador</title>
      </Head>

      <section className="bg-gradient-to-b from-[color:var(--deep-crimson)] via-black to-black text-white min-h-screen py-20 px-4 flex justify-center items-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[color:var(--deep-crimson)] drop-shadow-lg">
            Be a SPL@T Ambassador
          </h1>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="grid gap-4 bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="first_name" required placeholder="First Name"
                  onChange={handleChange} className="p-3 rounded bg-black text-white placeholder-gray-400" />
                <input type="text" name="last_name" required placeholder="Last Name"
                  onChange={handleChange} className="p-3 rounded bg-black text-white placeholder-gray-400" />
              </div>

              <input type="text" name="preferred_name" placeholder="Preferred Name"
                onChange={handleChange} className="p-3 rounded bg-black text-white placeholder-gray-400" />
              <input type="date" name="dob" required
                onChange={handleChange} className="p-3 rounded bg-black text-white" />
              <input type="email" name="email" required placeholder="Email"
                onChange={handleChange} className="p-3 rounded bg-black text-white placeholder-gray-400" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="city" required placeholder="City"
                  onChange={handleChange} className="p-3 rounded bg-black text-white placeholder-gray-400" />
                <select name="state" required onChange={handleChange}
                  className="p-3 rounded bg-black text-white">
                  <option value="">Select State</option>
                  {["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]
                    .map(state => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>

              <input type="text" name="social_media_handles" required placeholder="Social Media Handles"
                onChange={handleChange} className="p-3 rounded bg-black text-white placeholder-gray-400" />
              <input type="number" name="number_of_followers" required placeholder="Number of Followers"
                onChange={handleChange} className="p-3 rounded bg-black text-white placeholder-gray-400" />
              <textarea name="qualifications_why" required placeholder="Why do you want to be an Ambassador?"
                onChange={handleChange} className="p-3 rounded bg-black text-white placeholder-gray-400" rows={4} />
              <input type="text" name="referral" placeholder="Referral (if any)"
                onChange={handleChange} className="p-3 rounded bg-black text-white placeholder-gray-400" />

              <SplatCaptcha 
                containerId="cf-turnstile-ambassador"
                onVerify={(token) => setFormData(prev => ({ ...prev, captchaToken: token }))}
              />

              <button type="submit"
                className="mt-4 bg-[color:var(--deep-crimson)] hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition">
                Submit Application
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          ) : (
            <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-4">Thank you for applying!</h2>
              <p>We’ll review your application and get back to you soon. 💦</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
