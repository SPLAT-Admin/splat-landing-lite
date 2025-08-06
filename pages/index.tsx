import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Build absolute URL for API call (works on Vercel)
      const apiUrl = `${window.location.origin}/api/founder-checkout`;

      const res = await fetch(apiUrl, {
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
        window.location.assign(data.url); // Force redirect to Stripe
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
            Only $25 — while supplies last. Only 250 Life-Time Memberships Available. First Come, First Serve.
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

      {/* SPL@TVerse Overview */}
      <section className="text-center max-w-4xl mx-auto px-6 mt-12">
        <h2 className="text-3xl font-bold text-[#851725] mb-4">What is the SPL@TVerse?</h2>
        <p className="mb-6 text-lg text-white">
          SPL@T is the bold, unapologetic app redefining gay cruising. Built for connection, excitement, and zero shame.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-left">
          <li>🗺 <strong>SPL@T Map Live View</strong> – See who's active in real time</li>
          <li>💬 <strong>SPL@T Live Lobby & Chat</strong> – Dive into conversation instantly</li>
          <li>🔢 <strong>SPL@T Codes</strong> – Private invites like SPL@T-000920</li>
          <li>🎤 <strong>SPL@T Host & Co-Host</strong> – Control the action</li>
          <li>🔥 <strong>SPL@T Hotspots</strong> – Events, meetups, and more</li>
        </ul>
      </section>

      {/* Timeline Section */}
      <section className="max-w-4xl mx-auto mt-12 px-6 text-white">
        <h2 className="text-3xl font-bold text-[#851725] mb-6 text-center">📅 SPL@T Development Timeline</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Q1 2025</h3>
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
            <h3 className="text-xl font-bold mb-2">Q2 2025</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Android Build Complete – Oct 2025</li>
              <li>Beta Testing – Android Begins – Oct 2025</li>
              <li>iOS Build Finalized – Oct 2025</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
