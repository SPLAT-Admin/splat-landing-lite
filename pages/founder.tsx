import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function FoundersPage() {
  const SALE_LIMIT = 250;
  const SALE_END_TIMESTAMP = new Date('2025-08-06T23:59:59-07:00').getTime();
  const [timeLeft, setTimeLeft] = useState('');
  const [saleLive, setSaleLive] = useState(false);
  const [soldCount, setSoldCount] = useState<number>(246);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const distance = SALE_END_TIMESTAMP - now;
      if (distance <= 0) {
        setTimeLeft('Founder Sale has ended');
        setSaleLive(false);
      } else {
        setSaleLive(true);
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
    const fetchSold = async () => {
      try {
        const res = await fetch('/api/founder-checkout');
        const data = await res.json();
        if (data?.sold) {
          setSoldCount(data.sold);
        }
      } catch {
        setSoldCount(246);
      }
    };
    fetchSold();
    const interval = setInterval(fetchSold, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckout = async () => {
    try {
      const tier = soldCount < SALE_LIMIT ? 'tier_1' : 'tier_2';
      const res = await fetch('/api/founder-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setSoldCount(prev => prev + 1);
        if (soldCount + 1 >= SALE_LIMIT) {
          alert('Tier 1 sold out! Price will now increase to $50 for remaining sales until 8/6.');
        }
        window.location.href = data.url;
      } else {
        alert(data.error || 'An error occurred');
      }
    } catch {
      alert('Something went wrong while contacting Stripe.');
    }
  };

  const tier1Available = saleLive && soldCount < SALE_LIMIT;
  const tier2Available = saleLive && soldCount >= SALE_LIMIT;

  return (
    <>
      <Head>
        <title>Founder Sale | SPL@T</title>
      </Head>

      <section className="bg-black min-h-screen flex flex-col justify-center items-center py-16 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#851725] mb-3 drop-shadow-lg">
          SPL@T Founder Lifetime Membership
        </h1>
        <div className="text-md font-mono font-semibold text-gray-300 mb-1">{timeLeft}</div>
        <div className="text-sm text-gray-400 mb-8">
          <span className={soldCount >= SALE_LIMIT ? 'text-yellow-400 font-bold' : 'text-green-400 font-bold'}>
            {soldCount}
          </span>
          <span className="text-gray-300"> / {SALE_LIMIT} sold</span>
        </div>

        {saleLive ? (
          <>
            {tier1Available && (
              <button
                onClick={handleCheckout}
                className="w-64 h-16 rounded-full bg-[#851725] text-white text-xl font-bold shadow-2xl flex items-center justify-center transition-all hover:scale-105 hover:bg-red-700 focus:ring-4 focus:ring-red-400/40 active:scale-95 mb-4"
              >
                💦 Purchase Now ($25)
              </button>
            )}
            {tier2Available && (
              <button
                onClick={handleCheckout}
                className="w-64 h-16 rounded-full bg-yellow-400 text-black text-xl font-bold shadow-2xl flex items-center justify-center transition-all hover:scale-105 hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-200/50 active:scale-95 mb-4"
              >
                🚀 Purchase Now ($50)
              </button>
            )}
          </>
        ) : (
          <button
            className="w-64 h-16 rounded-full bg-gray-800 text-white text-xl font-bold shadow-lg flex items-center justify-center select-none cursor-not-allowed opacity-80"
            disabled
          >
            <svg width="20" height="20" fill="none" className="animate-spin mr-2"><circle cx="10" cy="10" r="8" stroke="white" strokeWidth="3" /></svg>
            Sale Closed
          </button>
        )}
      </section>
    </>
  );
}
