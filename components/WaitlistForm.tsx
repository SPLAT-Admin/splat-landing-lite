import Head from 'next/head';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroFlashSale from '@/components/HeroFlashSale';
import { Dialog } from '@headlessui/react';

const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'), {
  ssr: false,
  loading: () => <p className="text-white">Loading form...</p>,
});

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-white bg-black px-6 py-24 min-h-screen">
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

          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
            <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
              <Dialog.Title className="text-2xl font-bold text-black mb-4">Join the SPL@T Waitlist</Dialog.Title>
              <WaitlistForm />
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-sm text-gray-600 underline"
              >
                Close</button>
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
      </main>
    </>
  );
}
