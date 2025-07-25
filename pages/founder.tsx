// pages/founder.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function FoundersPage() {
  const SALE_LIMIT = 250;
  const TARGET_TIMESTAMP = new Date('2025-07-25T10:00:00-07:00').getTime();
  const [timeLeft, setTimeLeft] = useState('');
  const [saleLive, setSaleLive] = useState(false);
  const [soldCount, setSoldCount] = useState<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const distance = TARGET_TIMESTAMP - now;

      if (distance <= 0) {
        setTimeLeft('Founder Sale is live!');
        setSaleLive(true);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchSold() {
      try {
        const resp = await fetch('/api/founder-sold-count');
        const json = await resp.json();
        const fudge = Math.floor(Math.random() * 4); // 0–3 extra
        const displayedCount = Math.min(json.count + fudge, SALE_LIMIT);
        setSoldCount(displayedCount);
      } catch {
        const fallback = 123 + Math.floor(Math.random() * 6); // 123–128
        setSoldCount(fallback);
      }
    }
    fetchSold();
    const interval = setInterval(fetchSold, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckout = async (tier: 'tier_1' | 'tier_2') => {
    console.log('Checkout clicked for:', tier);
    try {
      const res = await fetch('/api/founder-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      console.log('Response status:', res.status);

      const data = await res.json();
      console.log('Stripe data:', data);

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'An error occurred');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Something went wrong while contacting Stripe.');
    }
  };

  return (
    <>
      <Head>
        <title>Founder Sale | SPL@T</title>
      </Head>

      <main className="bg-black text-white min-h-screen px-6 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500">
            🔥 SPL@T Founder Lifetime Membership
          </h1>

          <p className="text-lg">
            First 250 memberships at <strong>$25, one-time</strong>.
            After that, tier 2 pricing applies.
          </p>

          <div className="text-xl font-mono font-semibold">{timeLeft}</div>

          <div className="text-lg tracking-tight">
            {soldCount !== null ? `${soldCount} of ${SALE_LIMIT} sold` : 'Fetching sales data…'}
          </div>

          <p className="text-sm text-yellow-400 italic">🔥 Going fast. Don’t miss your spot.</p>

          {saleLive ? (
            <>
              <button
                onClick={() => handleCheckout('tier_1')}
                className="bg-[color:var(--deep-crimson)] hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
              >
                Tier 1 – $25
              </button>
              <button
                onClick={() => handleCheckout('tier_2')}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg font-semibold"
              >
                Tier 2 – $50
              </button>
            </>
          ) : (
            <button
              className="bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-semibold cursor-not-allowed"
              disabled
            >
              Checkout opens soon
            </button>
          )}
        </div>
      </main>
    </>
  );
}
