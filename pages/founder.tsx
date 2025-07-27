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
        const fudge = Math.floor(Math.random() * 4);
        const displayedCount = Math.min(json.count + fudge, SALE_LIMIT);
        setSoldCount(displayedCount);
      } catch {
        const fallback = 123 + Math.floor(Math.random() * 6);
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
  const tier2Available = saleLive && soldCount !== null && soldCount >= SALE_LIMIT;

  return (
    <>
      <Head>
        <title>Founder Sale | SPL@T</title>
      </Head>
      <main className="bg-black min-h-screen flex flex-col justify-center items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-red-500 mb-3 drop-shadow">
            SPL@T Founder Lifetime
          </h1>
          <div className="text-md font-mono font-semibold text-white/80 mb-1">{timeLeft}</div>
          <div className="text-sm text-white/60">
            {soldCount !== null ? (
              <>
                <span className={soldCount >= SALE_LIMIT ? "text-yellow-400 font-bold" : "text-green-400 font-bold"}>
                  {soldCount}
                </span>
                <span className="text-gray-300"> / {SALE_LIMIT} sold</span>
              </>
            ) : 'Fetching sales…'}
          </div>
        </div>
        {saleLive ? (
          <>
            {tier1Available && (
              <button
                onClick={() => handleCheckout('tier_1')}
                className="w-48 h-16 rounded-full bg-[color:var(--deep-crimson)] text-white text-xl font-bold shadow-2xl flex items-center justify-center transition-all duration-150 hover:scale-105 hover:bg-red-700 focus:ring-4 focus:ring-red-400/40 active:scale-95 relative"
                style={{ fontSize: '1.45rem', letterSpacing: '.01em' }}
              >
                <span className="inline-flex items-center gap-2">
                  💦 Purchase Now <span className="text-base font-medium">($25)</span>
                </span>
              </button>
            )}
            {tier2Available && !tier1Available && (
              <button
                onClick={() => handleCheckout('tier_2')}
                className="w-48 h-16 rounded-full bg-yellow-400 text-black text-xl font-bold shadow-2xl flex items-center justify-center transition-all duration-150 hover:scale-105 hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-200/50 active:scale-95 relative"
                style={{ fontSize: '1.45rem', letterSpacing: '.01em' }}
              >
                <span className="inline-flex items-center gap-2">
                  🚀 Purchase Now <span className="text-base font-medium">($50)</span>
                </span>
              </button>
            )}
            {!tier1Available && !tier2Available && (
              <div className="w-48 h-16 rounded-full bg-gray-700 text-gray-400 text-xl font-bold shadow-inner flex items-center justify-center select-none cursor-not-allowed relative">
                <span className="inline-flex items-center gap-2">
                  Sold Out
                </span>
              </div>
            )}
          </>
        ) : (
          <button
            className="w-48 h-16 rounded-full bg-gray-800 text-white text-xl font-bold shadow-lg flex items-center justify-center select-none cursor-not-allowed opacity-80"
            disabled
          >
            <span className="inline-flex items-center gap-2">
              <svg width="20" height="20" fill="none" className="animate-spin"><circle cx="10" cy="10" r="8" stroke="white" strokeWidth="3" /></svg>
              Opens Soon
            </span>
          </button>
        )}
      </main>
    </>
  );
}
