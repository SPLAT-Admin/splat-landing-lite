// pages/ambassador.tsx

import Head from 'next/head';
import { useState } from 'react';

export default function Ambassador() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const res = await fetch('/api/send-ambassador-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      setStatus('sent');
      e.currentTarget.reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>SPL@T Ambassador Program</title>
        <meta name="description" content="Become a SPL@T Ambassador and help launch the boldest new social app." />
      </Head>

      <main className="py-20 px-4 bg-black text-white min-h-screen text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Become a SPL@T Ambassador</h2>
          <p className="mb-6 text-lg">
            Join the launch team, grow the movement, and make queer history. We&apos;re bringing SPL@T to the world, one city at a time.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Your Name" className="w-full p-3 border rounded text-black" required />
            <input type="email" name="email" placeholder="Your Email" className="w-full p-3 border rounded text-black" required />
            <button type="submit" className="bg-deep-crimson text-white px-6 py-3 rounded hover:bg-white hover:text-black">
              {status === 'sending' ? 'Sending...' : 'Apply Now'}
            </button>

            {status === 'sent' && (<p className="text-green-500">Thanks for applying! We&apos;ll be in touch soon.</p>)}
            {status === 'error' && (<p className="text-red-500">Something went wrong. Please try again.</p>)}
          </form>
        </div>
      </main>
    </>
  );
}
