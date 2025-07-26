'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Dialog } from '@headlessui/react';
import HeroFlashSale from '@/components/HeroFlashSale';

const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'), { ssr: false });

export default function Home() {
  const [timeLeft, setTimeLeft] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
        <HeroFlashSale />

        <section className="text-center max-w-4xl mx-auto bg-[color:var(--deep-crimson)] p-10 rounded-xl shadow-lg">
          <h1 className="text-5xl font-bold mb-4 text-white">SPL@T</h1>
          <p className="text-xl mb-6 text-gray-100">Where bold connection meets powerful discovery. Join now for early access to our mobile-first social networking experience.</p>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-block bg-white text-black px-6 py-3 rounded font-bold hover:bg-yellow-300 transition mb-6"
          >
            Join the Waitlist
          </button>

          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <Dialog.Panel className="bg-white text-black rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
              <Dialog.Title className="text-xl font-bold mb-4 text-center">Join the SPL@T Waitlist</Dialog.Title>
              <WaitlistForm />
              <button onClick={() => setIsOpen(false)} className="mt-4 w-full text-center text-sm text-gray-600 underline">
                Close
              </button>
            </Dialog.Panel>
          </Dialog>

          <div className="text-left max-w-3xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-4 text-white">What's Included</h2>
            <ul className="list-disc list-inside text-lg text-white space-y-2">
              <li>Personalized discovery filters</li>
              <li>Private messaging and profile customization</li>
              <li>Map-based user exploration</li>
              <li>Enhanced privacy and blocking tools</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4 mt-10 text-white">Pricing</h2>
            <p className="text-lg text-white">SPL@T Premium is just <strong>$4.99/month</strong>. You’ll be billed securely at checkout and can cancel anytime through your account settings.</p>
          </div>
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
    }
  ]
}
