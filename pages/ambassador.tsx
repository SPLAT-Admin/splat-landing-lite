// pages/ambassador.tsx
import Head from "next/head";
import Link from "next/link";

export default function AmbassadorPage() {
  return (
    <>
      <Head>
        <title>Ambassador HQ — SPL@TVerse Insider</title>
        <meta name="description" content="Everything SPL@T: App features, culture, perks, programs—your insider pass." />
      </Head>

      <section className="bg-background text-foreground py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4">
              SPL@T Ambassador HQ
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Your go-to guide for everything SPL@T – from app architecture to perks, terminology, and mission.
            </p>
          </div>

          {/* SPL@TVerse Modules */}
          <section>
            <h2 className="text-3xl font-bold mb-3">SPL@TVerse Features</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-200">
              <li><strong>SP@T Map Live‑View:</strong> Real-time geolocation of community members.</li>
              <li><strong>SPL@T Live Lobby:</strong> Public chat spaces, virtual meet & greet before engagement.</li>
              <li><strong>SPL@T Codes & Handles:</strong> Private access codes and user aliases for anonymity.</li>
              <li><strong>HotSpots & Events:</strong> Tap into trending locations and upcoming community collabs.</li>
              <li><strong>Premium Tools:</strong> Teleport unlock, Stealth Mode, priority placement, private rooms.</li>
            </ul>
          </section>

          {/* Ambassador Perks */}
          <section>
            <h2 className="text-3xl font-bold mb-3">Ambassador Perks</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-200">
              <li>Priority beta access & feature testing.</li>
              <li>Promo code generation and exclusive merch bundles.</li>
              <li>Invites to SPL@T LIVE events and social collab opportunities.</li>
              <li>Recognition roll: social shout-outs, in-app badges.</li>
              <li>Ambassador-only community feedback circles.</li>
            </ul>
          </section>

          {/* Program Expectations and Standards */}
          <section>
            <h2 className="text-3xl font-bold mb-3">Program & Culture</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-200">
              <li>Age 21+ only.</li>
              <li>Inclusive, drama-free promotion of SPL@T values.</li>
              <li>Prioritize queer safety, visibility, and consent-first culture.</li>
              <li>Create authentic, fun energy in all collaborations.</li>
            </ul>
          </section>

          {/* Ready to Apply Call to Action */}
          <div className="text-center">
            <Link href="/ambassador-apply" className="inline-block bg-crimson-primary hover:bg-crimson-hover text-white font-bold px-8 py-4 rounded-full text-lg shadow-md focus-visible:ring-2 focus-visible:ring-deep-crimson/60 transition">
              Apply to Be an Ambassador
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
