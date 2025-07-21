// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
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
        <title>SPL@T – No Shame. Just SPL@T.</title>
        <meta
          name="description"
          content="Join the movement. SPL@T is the bold new hookup and cruising app for everyone."
        />
      </Head>

      <section className="text-center py-24 px-6 bg-black text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">SPL@T</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6 italic">
          No Shame. Just SPL@T.
        </p>
      </section>

      <section className="bg-[color:var(--deep-crimson)] text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">🔥 Founder Sale – Limited Time</h2>
        <p className="mb-2 text-lg">
          First 250 only:{' '}
          <strong>SPL@T Premium Lifetime Membership</strong> for just{' '}
          <span className="text-yellow-300 text-xl font-bold">$25</span>.
        </p>
        <p className="mb-2 text-sm">No renewals. No monthly charges. Ever.</p>
        <p className="mb-6 text-sm">
          After 250 are gone, price jumps to $50 until the 7-hour window ends.
        </p>
        <p className="font-semibold mb-4 text-lg">
          Live <strong>July 25 @ 10 a.m. MST</strong>
        </p>
        <div className="text-2xl font-mono font-bold mb-6">⏳ {timeLeft}</div>
        <Link
          href="/founder"
          className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition"
        >
          Join the Founder Sale
        </Link>
      </section>

      <section className="bg-black text-white py-20 px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[color:var(--deep-crimson)]">
          We’re almost live.
        </h3>
        <ul className="list-disc list-inside text-left max-w-xl mx-auto mb-8 text-gray-300">
          <li className="mb-2">Android build is nearly done</li>
          <li>Beta testing launches soon</li>
        </ul>
        <Link
          href="/contactus"
          className="inline-block underline text-lg hover:text-red-500"
        >
          Help fund SPL@T’s launch →
        </Link>
      </section>

      <footer className="text-center text-sm text-gray-400 bg-black py-12">
        <p>© 2025 SPLAT, LLC • usesplat.com</p>
        <p className="mt-2 max-w-xl mx-auto px-4">
          Want to sponsor a SP@T location or SPL@T LIVE event? Ask us about our upcoming sponsorship deck.
        </p>
      </footer>
    </>
  );
}
