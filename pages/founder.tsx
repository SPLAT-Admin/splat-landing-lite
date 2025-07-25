// pages/founder.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function FounderPage() {
  const [timeLeft, setTimeLeft] = useState('');
  const [saleLive, setSaleLive] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-07-25T10:00:00-07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft('Founder Sale is live!');
        setSaleLive(true);
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

  const handlePurchase = async (tier: 'tier_1' | 'tier_2') => {
    const email = prompt('Enter your email for confirmation:');
    if (!email) return;

    const fakeCheckoutId = 'chk_' + Math.random().toString(36).substr(2, 9);
    const amount = tier === 'tier_1' ? 25 : 50;

    const { error } = await supabase.from('founder_purchases').insert([
      {
        email,
        stripe_checkout_id: fakeCheckoutId,
        purchase_amount: amount,
        tier,
        status: 'completed'
      }
    ]);

    if (error) {
      alert('Error recording purchase: ' + error.message);
    } else {
      alert("🎉 Purchase logged! You'll receive a confirmation soon.");
    }
  };

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

          {saleLive ? (
            <>
              <button
                onClick={() => handlePurchase('tier_1')}
                className="bg-[color:var(--deep-crimson)] hover:bg-red-600 text-white px-6 py-3 rounded text-lg font-semibold mb-4"
              >
                Get Tier 1 – $25
              </button>
              <br />
              <button
                onClick={() => handlePurchase('tier_2')}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded text-lg font-semibold"
              >
                Get Tier 2 – $50
              </button>
            </>
          ) : (
            <button
              className="bg-[color:var(--deep-crimson)] hover:bg-red-600 text-white px-6 py-3 rounded text-lg font-semibold cursor-not-allowed"
              disabled
            >
              Checkout opens July 25 @ 10 a.m.
            </button>
          )}
        </div>
      </section>
    </>
  );
}
