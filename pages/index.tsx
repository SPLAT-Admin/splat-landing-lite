import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header />
      <section>

      {/* Hero Welcome Banner */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-deep-crimson to-black">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold animate-pulse">
          WELCOME TO SPL@T!
        </h1>
        <p className="text-2xl md:text-3xl mt-4">
          Your Back-Door Pass to the SPL@TVerse
        </p>
      </section>

      {/* Founder Sale Closed Notice */}
      <section className="bg-gray-900 text-white text-center py-12 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Founder Sale is Now Closed</h2>
        <p className="text-lg md:text-xl">
          Thank you to everyone who secured their lifetime membership. SPL@T is moving full-speed toward launch. Stay tuned for more ways to get involved!
        </p>
      </section>

      {/* About SPL@T */}
      <section className="max-w-5xl mx-auto py-16 px-6 space-y-12 text-lg md:text-xl">
        <div>
          <h2 className="text-3xl font-bold text-deep-crimson mb-4">Who We Are</h2>
          <p>
            SPL@T is a queer-built, unapologetic hookup and cruising platform designed for connection without shame. Built by and for the community, we’re throwing out outdated systems and building something sexy, fast, and free.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-deep-crimson mb-4">What We’re Offering</h2>
          <p>
            We’re creating a real-time digital cruising ground — featuring the SPL@T Map, Live Lobby, SPL@T Codes, Handles, and more. Whether you want to meet now or just vibe online, SPL@T gives you options, visibility, and control.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-deep-crimson mb-4">Planned Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-disc pl-6">
            <li><strong>SP@T Live Map:</strong> See users live, cruising in real-time, by location.</li>
            <li><strong>Live Lobby:</strong> Hang out, chat, and preview nearby action.</li>
            <li><strong>SPL@T Codes:</strong> One-time hook-up codes you can share.</li>
            <li><strong>SPL@T Handles:</strong> Public usernames to connect fast.</li>
            <li><strong>Stealth Mode:</strong> Browse privately when you need it.</li>
            <li><strong>Teleport Unlock:</strong> Drop into any city before you land there.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-deep-crimson mb-4">Why Go Premium?</h2>
          <p>
            Premium unlocks everything. Advanced filters, stealth mode, location teleport, and more. Missed the founder sale? Stay tuned for early access options before public launch.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-deep-crimson mb-4">Development Timeline</h2>
          <p>
            • Aug 2025 – Landing site + Stripe launch<br />
            • Sept 2025 – SP@T Map + Live Lobby Beta<br />
            • Oct 2025 – Messaging, Profiles, Filters<br />
            • Nov 2025 – Public Launch
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
