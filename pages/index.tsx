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
        <title>SPL@T – Community Discovery App</title>
        <meta name="description" content="Join the movement. SPL@T is a bold new social networking experience for local connection and community discovery." />
      </Head>

      <main className="text-white bg-black px-6 py-24">
        {/* FLASH SALE HERO BLOCK */}
        <section className="relative bg-black text-white overflow-hidden py-20">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-red-600 via-yellow-300 to-red-600 opacity-20 mix-blend-screen"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-6xl md:text-7xl font-extrabold animate-pulse text-[color:var(--deep-crimson)]">
              HUGE FOUNDER SALE<br />GOING ON NOW 💥💦
            </h1>
            <p className="text-xl text-gray-300">
              Limited to the first 250—enjoy a one-time lifetime membership for just $25.
            </p>
            <a
              href="/founder"
              className="inline-block bg-yellow-300 hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-xl animate-bounce"
            >
              JOIN NOW
            </a>
            <div className="text-sm text-gray-400">⏳ {timeLeft}</div>
          </div>
        </section>

        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-red-500">SPL@T</h1>
          <p className="text-xl mb-6">Where bold connection meets powerful discovery. Join now for early access to our mobile-first social networking experience.</p>
          <Link href="#" className="inline-block bg-red-500 text-white px-6 py-3 rounded font-bold hover:bg-red-600 transition">Join the Waitlist</Link>
        </section>

        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">What's Included</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Personalized discovery filters</li>
            <li>Private messaging and profile customization</li>
            <li>Map-based user exploration</li>
            <li>Enhanced privacy and blocking tools</li>
          </ul>
        </section>

        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Pricing</h2>
          <p className="text-lg">SPL@T Premium is just <strong>$4.99/month</strong>. You’ll be billed securely at checkout and can cancel anytime through your account settings.</p>
        </section>

        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Support</h2>
          <p className="text-lg">Email us at <a href="mailto:support@usesplat.com" className="underline text-red-400">support@usesplat.com</a> with any questions. We’re here to help.</p>
        </section>

        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Legal</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li><a href="#" className="underline">Privacy Policy</a></li>
            <li><a href="#" className="underline">Terms of Use</a></li>
            <li><a href="#" className="underline">Refund Policy</a></li>
          </ul>
        </section>

        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Security</h2>
          <p className="text-lg">Payments are processed via Stripe and fully encrypted. We never store card data. All transactions are PCI-compliant and secure.</p>
        </section>

        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <p className="text-lg mb-4"><strong>What is SPL@T?</strong><br/>A community discovery app that helps you connect and explore based on interests and location.</p>
          <p className="text-lg mb-4"><strong>When am I charged?</strong><br/>Billing occurs during checkout, with monthly recurring charges.</p>
          <p className="text-lg mb-4"><strong>How do I cancel?</strong><br/>Log in and manage your subscription via settings at any time.</p>
        </section>

        <section className="text-center mt-16">
          <p className="text-lg italic text-gray-300">No Shame. Just SPL@T.</p>
        </section>

        <footer className="text-center text-sm text-gray-400 mt-24">
          <p>© 2025 SPLAT, LLC • usesplat.com</p>
        </footer>
      </main>
    </>
  );
}
