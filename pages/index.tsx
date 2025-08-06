import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const SALE_LIMIT = 177;
  const [loading, setLoading] = useState(false);
  const [soldCount, setSoldCount] = useState<number>(162);

  useEffect(() => {
    const fetchSold = async () => {
      try {
        const res = await fetch("/api/founder-checkout");
        const data = await res.json();
        if (data?.sold) {
          setSoldCount(data.sold);
        }
      } catch {
        setSoldCount(162);
      }
    };
    fetchSold();
    const interval = setInterval(fetchSold, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/founder-checkout", { method: "POST" });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Checkout failed.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert("Stripe checkout URL missing.");
        setLoading(false);
      }
    } catch {
      alert("Error connecting to checkout.");
      setLoading(false);
    }
  };

  const membershipsLeft = SALE_LIMIT - soldCount;

  return (
    <>
      <Head>
        <title>SPL@T | Your Backstage Pass to the SPL@TVerse</title>
      </Head>

      <section className="bg-jet text-acid text-center px-6 py-12">
        <h1 className="text-[40px] md:text-[48px] font-bold text-crimson mb-6">
          Welcome to SPL@T
        </h1>
        <h2 className="text-[28px] md:text-[32px] mb-6">
          Your Backstage Pass to the SPL@TVerse
        </h2>

        <div className="bg-crimson text-acid p-6 rounded-2xl shadow-lg text-center max-w-2xl mx-auto animate-pulse">
          <h3 className="text-[24px] font-bold mb-3">
            🔥 Early Founders Life-Time Membership Sale
          </h3>
          <p className="text-[18px] mb-4">
            Only $25 — while supplies last. <span className="font-bold">Just {membershipsLeft > 0 ? membershipsLeft : 0} memberships left out of {SALE_LIMIT}.</span>
          </p>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`${loading ? "bg-gray-700" : "bg-black hover:bg-gray-900"} text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all text-[16px]`}
          >
            {loading ? "Redirecting..." : "Grab Yours Now"}
          </button>
        </div>
      </section>

      <section className="bg-jet text-acid text-center max-w-4xl mx-auto px-6 mt-12">
        <h2 className="text-[32px] font-bold text-crimson mb-4">
          What is the SPL@TVerse?
        </h2>
        <p className="mb-6 text-[18px]">
          SPL@T is the bold, unapologetic app redefining gay cruising.
          Built for connection, excitement, and zero shame.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-acid text-left text-[16px]">
          <li>🗺 <strong>SPL@T Map Live View</strong> – See who's active in real time, anywhere.</li>
          <li>💬 <strong>SPL@T Live Lobby & Chat</strong> – Instant drop-in conversations, group or 1-on-1.</li>
          <li>🔢 <strong>SPL@T Codes</strong> – Private invites like SPL@T-000920.</li>
          <li>🎤 <strong>SPL@T Host & Co-Host</strong> – Run your own private or public sessions.</li>
          <li>🔥 <strong>SPL@T Hotspots</strong> – Meetups, events, and secret cruising zones.</li>
          <li>🛡 <strong>Safety + Privacy Tools</strong> – AI moderation, reporting, and user controls.</li>
          <li>⚡ <strong>Low Cost, High Access</strong> – Lifetime membership available now at $25.</li>
        </ul>
      </section>

      <section className="bg-jet text-acid max-w-4xl mx-auto mt-12 px-6">
        <h2 className="text-[32px] font-bold text-crimson mb-6 text-center">
          📅 SPL@T Development Timeline
        </h2>

        <div className="space-y-6 text-[16px]">
          <div>
            <h3 className="text-[20px] font-bold mb-2">Q1 2025</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Landing Page Launched – July 2025</li>
              <li>Ambassador Program – July 2025</li>
              <li>Early Founders Sale – Now through Aug 5th</li>
              <li>Merch Shop Grand Opening – Aug 2025</li>
              <li>App Development – Ongoing</li>
              <li>Beta Testing Signup – Sept 2025</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[20px] font-bold mb-2">Q2 2025</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Android Build Complete – Oct 2025</li>
              <li>Beta Testing – Android Begins – Oct 2025</li>
              <li>iOS Build Finalized – Oct 2025</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-jet text-acid text-center py-6 mt-12">
        <p className="text-[12px]">
          <a href="/terms" className="hover:text-crimson mx-2">Terms of Service</a> | 
          <a href="/privacy" className="hover:text-crimson mx-2">Privacy Policy</a> | 
          <a href="/community" className="hover:text-crimson mx-2">Community Standards</a>
        </p>
      </footer>
    </>
  );
}
