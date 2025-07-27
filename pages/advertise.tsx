// pages/advertise.tsx
import Head from 'next/head';

export default function AdvertisePage() {
  return (
    <div className="bg-black min-h-screen flex flex-col font-sans">
      <Head>
        <title>Advertise in the SPL@TVerse | SPL@T</title>
        <meta name="description" content="Partner, sponsor, or advertise in the SPL@TVerse – SPL@T App, Live Lobby, SP@T Map, Handles, Codes, and more. Bold, shameless, and built for connection." />
      </Head>
      {/* NAV */}
      <nav className="w-full py-4 px-8 flex justify-between items-center">
        <span className="text-3xl font-extrabold tracking-tight text-[color:var(--deep-crimson,#e11d48)] drop-shadow">
          SPL@T
        </span>
        <a
          href="/"
          className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2 rounded-full shadow transition-all duration-150"
        >
          Home
        </a>
      </nav>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <section className="max-w-3xl w-full text-center space-y-8 mt-10 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[color:var(--deep-crimson,#e11d48)] via-red-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-xl">
            Advertise in the SPL@TVerse
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto">
            Unlock the most high-velocity, deeply connected LGBTQ+ audience on the internet. 
            SPL@T isn’t just another app—it’s a playground, a map, a movement, and your brand can be part of it.
          </p>
        </section>

        {/* Features/Channels */}
        <section className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 flex flex-col items-center border border-red-900/10">
            <div className="text-3xl mb-3">📱</div>
            <h2 className="text-xl font-bold text-red-400 mb-2">SPL@T App</h2>
            <p className="text-white/80">Integrated display and native placements. Seamless, unobtrusive, ultra-engaged. Launch your brand in the app everyone’s talking about.</p>
          </div>
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 flex flex-col items-center border border-red-900/10">
            <div className="text-3xl mb-3">🗺️</div>
            <h2 className="text-xl font-bold text-red-400 mb-2">SP@T Map</h2>
            <p className="text-white/80">Pin your brand on our real-time cruising map. Sponsor a city, neighborhood, event, or even a pop-up meet. Geo-dynamic, IRL-to-URL impact.</p>
          </div>
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 flex flex-col items-center border border-red-900/10">
            <div className="text-3xl mb-3">🎤</div>
            <h2 className="text-xl font-bold text-red-400 mb-2">SPL@T Live Lobby</h2>
            <p className="text-white/80">Sponsor live events, drop-in chats, or host branded takeovers in our SPL@T Lobby—where users mingle and magic happens, 24/7.</p>
          </div>
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 flex flex-col items-center border border-red-900/10">
            <div className="text-3xl mb-3">🏷️</div>
            <h2 className="text-xl font-bold text-red-400 mb-2">SPL@T Handles & Codes</h2>
            <p className="text-white/80">Branded SPL@T Handles for creators, collectives, and events. Sponsor exclusive Codes—custom URLs and in-app boosts that drive community and conversion.</p>
          </div>
        </section>

        {/* Collab Opportunities */}
        <section className="max-w-3xl w-full mx-auto mb-16">
          <h3 className="text-2xl font-extrabold text-yellow-400 mb-3">Partnerships & Creative Collabs</h3>
          <p className="text-white/80 text-base mb-4">
            We’re hungry for bold collabs: from pride festivals to queer nightlife, pop-up campaigns, streaming events, brand takeovers, creator launches, and anything your twisted little marketing heart can dream up.
          </p>
          <ul className="list-disc list-inside text-left text-white/70 space-y-1 mb-4">
            <li>Co-host live SPL@T events & in-app meetups</li>
            <li>Branded handles & custom Codes for your campaign</li>
            <li>Geo-targeted placements—own a neighborhood, city, or venue</li>
            <li>Product launches, activations, pop-up surprises</li>
            <li>Full-platform takeovers, contest sponsorships, or creative integrations</li>
          </ul>
          <div className="text-base text-white/60 italic">
            We want your weirdest, boldest, most outrageous ideas.<br />
            If you can imagine it, we can SPL@T it.
          </div>
        </section>

        {/* WHY SPL@T */}
        <section className="max-w-3xl w-full mx-auto mb-14 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Why SPL@T?</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-red-900/60 rounded-full px-6 py-2 text-sm text-yellow-300 font-semibold shadow">
              ✨ Hyper-loyal queer audience
            </div>
            <div className="bg-red-900/60 rounded-full px-6 py-2 text-sm text-yellow-300 font-semibold shadow">
              🚀 High engagement, minimal noise
            </div>
            <div className="bg-red-900/60 rounded-full px-6 py-2 text-sm text-yellow-300 font-semibold shadow">
              💡 Innovative, safe, and inclusive
            </div>
            <div className="bg-red-900/60 rounded-full px-6 py-2 text-sm text-yellow-300 font-semibold shadow">
              🔥 Early-mover advantage (don’t wait!)
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl w-full mx-auto mb-10 flex flex-col items-center gap-6">
          <div className="text-lg text-white/80 font-medium mb-2">
            Ready to claim your spot in the SPL@TVerse?
          </div>
          <a
            href="mailto:ads@usesplat.com"
            className="w-72 flex items-center justify-center gap-2 bg-[color:var(--deep-crimson,#e11d48)] hover:bg-red-700 active:scale-95 text-white text-xl font-bold rounded-full py-4 shadow-lg transition-all duration-150"
          >
            <span className="text-2xl">📧</span> Email us: <span className="underline underline-offset-2 ml-1">ads@usesplat.com</span>
          </a>
          <div className="text-sm text-white/60">
            Pitch us anything. We love ambition—and yes, we read every email.
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-5 flex flex-col md:flex-row items-center justify-between bg-black/80 border-t border-white/10 px-6 gap-2">
        <div className="text-xs text-white/40 flex gap-3">
          <a href="/privacy" className="hover:text-white/80">Privacy</a>
          <a href="/terms" className="hover:text-white/80">Terms</a>
          <a href="https://instagram.com/splatapp" className="hover:text-white/80" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="text-xs text-white/40 mt-1 md:mt-0">
          &copy; {new Date().getFullYear()} SPL@T. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
