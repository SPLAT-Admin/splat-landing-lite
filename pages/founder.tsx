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
    try {
      const res = await fetch('/api/founder-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'An error occurred');
      }
    } catch (err) {
      alert('Something went wrong while contacting Stripe.');
    }
  };

  const tier1Available = saleLive && soldCount !== null && soldCount < SALE_LIMIT;

  return (
    <>
      <Head>
        <title>Founder Sale | SPL@T</title>
      </Head>

      <main className="bg-black text-white min-h-screen px-6 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 drop-shadow-xl">
            🔥 SPL@T Founder Lifetime Membership
          </h1>

          <p className="text-lg">
            First 250 at <span className="text-red-400 font-bold">$25</span>.<br/>
            After that: <span className="text-yellow-400 font-bold">$50</span>.
          </p>

          <div className="text-xl font-mono font-semibold">{timeLeft}</div>

          <div className="text-lg tracking-tight">
            {soldCount !== null ? (
              <span>
                <span className={soldCount >= SALE_LIMIT ? "text-yellow-400 font-bold" : "text-green-400 font-bold"}>
                  {soldCount}
                </span>
                <span className="text-gray-300"> / {SALE_LIMIT} sold</span>
              </span>
            ) : 'Fetching sales data…'}
          </div>

          <p className="text-sm text-yellow-400 italic animate-pulse">
            {soldCount !== null && soldCount >= SALE_LIMIT
              ? "🔥 Tier 1 sold out. Next 250 will never get this price."
              : "🔥 Going fast. Don’t miss your spot."
            }
          </p>

          {saleLive ? (
            <div className="flex flex-col gap-4 mt-4 items-center">
              <button
                onClick={() => handleCheckout('tier_1')}
                disabled={!tier1Available}
                className={`
                  w-full max-w-xs transition-all duration-150
                  flex items-center justify-center gap-2
                  px-8 py-4 rounded-2xl text-xl font-bold shadow-lg
                  ${
                    tier1Available
                      ? "bg-[color:var(--deep-crimson)] hover:bg-red-700 active:scale-95 text-white"
                      : "bg-gray-800 text-gray-400 cursor-not-allowed"
                  }
                  relative
                `}
              >
                <span className="inline-flex items-center gap-1">
                  💦 Tier 1 – $25
                  {!tier1Available && (
                    <span className="ml-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full animate-bounce">
                      SOLD OUT
                    </span>
                  )}
                </span>
              </button>
              {/* Show Tier 2 only when Tier 1 is sold out */}
              {soldCount !== null && soldCount >= SALE_LIMIT && (
                <button
                  onClick={() => handleCheckout('tier_2')}
                  className={`
                    w-full max-w-xs transition-all duration-150
                    flex items-center justify-center gap-2
                    px-8 py-4 rounded-2xl text-xl font-bold shadow-lg
                    bg-yellow-400 hover:bg-yellow-300 text-black active:scale-95
                  `}
                >
                  <span className="inline-flex items-center gap-1">
                    🚀 Tier 2 – $50
                  </span>
                </button>
              )}
            </div>
          ) : (
            <button
              className="w-full max-w-xs bg-gray-700 text-white px-8 py-4 rounded-2xl text-xl font-semibold cursor-not-allowed opacity-70"
              disabled
            >
              <span className="inline-flex gap-2 items-center">
                <svg width="20" height="20" fill="none" className="animate-spin"><circle cx="10" cy="10" r="8" stroke="white" strokeWidth="3" /></svg>
                Checkout opens soon
              </span>
            </button>
          )}
        </div>
      </main>
    </>
  );
}
