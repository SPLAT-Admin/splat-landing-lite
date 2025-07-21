// pages/founder.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FounderPage() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date('2025-07-25T10:00:00-07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft('Founder Sale is live!');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Founder Sale | SPL@T</title>
      </Head>

      <section className="bg-black text-white py-20 px-6 min-h-screen text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[color:var(--deep-crimson)]">
            🔥 Founder Sale – Limited Time
          </h1>
          <p className="mb-4 text-lg">
            First 250 only: <strong>SPL@T Premium Lifetime Membership</strong> for just <span className="text-yellow-300 font-bold">$25</span>.
          </p>
          <p className="mb-2 text-sm text-gray-300">No renewals. No monthly charges. Ever.</p>
          <p className="mb-2 text-sm text-gray-300">After 250 are gone, price jumps to <strong>$50</strong> until the 7-hour window ends.</p>
          <p className="mb-6 text-sm text-gray-500">
            Launches <strong>July 25, 2025 @ 10:00 AM MST</strong>
          </p>

          <div className="text-xl font-mono font-semibold mb-8">
            ⏳ {timeLeft}
          </div>

          <Link href="/checkout" passHref>
            <button
              className="bg-[color:var(--deep-crimson)] hover:bg-red-600 text-white px-6 py-3 rounded text-lg font-semibold cursor-not-allowed"
              disabled
            >
              Checkout opens July 25 @ 10 a.m.
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
