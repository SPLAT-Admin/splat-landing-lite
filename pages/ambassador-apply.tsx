import Head from 'next/head';
import { useState } from 'react';
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
      <section className="bg-background text-foreground min-h-screen py-20 px-4 flex justify-center items-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-5xl font-bold text-center mb-8 text-crimson drop-shadow-lg">Be a SPL@T Ambassador</h1>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-black p-8 rounded-xl shadow-lg space-y-6">
              {[
                { id: 'first_name', label: 'First Name', type: 'text', required: true },
                { id: 'last_name', label: 'Last Name', type: 'text', required: true },
                { id: 'preferred_name', label: 'Preferred Name', type: 'text' },
                { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
                { id: 'email', label: 'Email', type: 'email', required: true },
                { id: 'city', label: 'City', type: 'text', required: true },
                { id: 'social_media_handles', label: 'Social Media Handles', type: 'text', required: true },
                { id: 'number_of_followers', label: 'Number of Followers', type: 'number', required: true },
                { id: 'referral', label: 'Referral (if any)', type: 'text' },
              ].map(({ id, label, type, required }) => (
                <div key={id} className="flex flex-col">
                  <label htmlFor={id} className="mb-1 text-base font-semibold">{label}</label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required={required}
                    onChange={handleChange}
                    className="p-3 rounded bg-black border border-gray-700 text-white placeholder-gray-400 text-base"
                  />
                </div>
              ))}

              {/* State Dropdown */}
              <div className="flex flex-col">
                <label htmlFor="state" className="mb-1 text-base font-semibold">State</label>
                <select
                  id="state"
                  name="state"
                  required
                  onChange={handleChange}
                  className="p-3 rounded bg-black border border-gray-700 text-white text-base"
                >
                  <option value="">Select State</option>
                  {["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Why Ambassador? */}
              <div className="flex flex-col">
                <label htmlFor="qualifications_why" className="mb-1 text-base font-semibold">
                  Why do you want to be an Ambassador?
                </label>
                <textarea
                  id="qualifications_why"
                  name="qualifications_why"
                  required
                  rows={4}
                  onChange={handleChange}
                  className="p-3 rounded bg-black border border-gray-700 text-white placeholder-gray-400 text-base"
                />
              </div>

              {/* CAPTCHA */}
              <SplatCaptcha
                containerId="cf-turnstile-ambassador"
                onVerify={(token) => setFormData((prev: AmbassadorForm) => ({ ...prev, captchaToken: token }))}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 bg-crimson hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition"
              >
                Submit Application
              </button>

              {/* Error Message */}
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
