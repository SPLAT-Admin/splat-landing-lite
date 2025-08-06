import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const SALE_LIMIT = 177;
  const [loading, setLoading] = useState(false);
  const [soldCount, setSoldCount] = useState<number>(162); // start close to limit

  useEffect(() => {
    const fetchSold = async () => {
      try {
        const res = await fetch("/api/founder-checkout");
        const data = await res.json();
        if (data?.sold) {
          setSoldCount(data.sold);
        }
      } catch {
        setSoldCount(162); // fallback
      }
    };
    fetchSold();
    const interval = setInterval(fetchSold, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${window.location.origin}/api/founder-checkout`, {
        method: "POST",
      });

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
    } catch (err) {
      console.error("Checkout error:", err);
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

      {/* Hero Section */}
      <section className="text-center px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-[#851725] mb-6">
          Welcome to SPL@T<br />
          <span className="text-white">Your Backstage Pass to the SPL@TVerse</span>
        </h1>

        <div className="bg-[#851725] text-white p-6 rounded-2xl shadow-lg text-center max-w-2xl mx-auto animate-pulse">
          <h2 className="text-2xl font-bold mb-3">🔥 Early Founders Life-Time Membership Sale</h2>
          <p className="text-lg mb-4">
            Only $25 — while supplies last.{" "}
            <span className="font-bold text-yellow-300">
              Just {membershipsLeft > 0 ? membershipsLeft : 0} memberships left out of {SALE_LIMIT}.
            </span>
          </p>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`${
              loading ? "bg-gray-700" : "bg-black hover:bg-gray-900"
            } text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all`}
          >
            {loading ? "Redirecting..." : "Grab Yours Now"}
          </button>
        </div>
      </section>
    </>
  );
}
