// pages/advertise.tsx
import Head from 'next/head';

export default function AdvertisePage() {
  return (
    <div className="bg-black min-h-screen flex flex-col font-sans">
      <Head>
        <title>Advertise in the SPL@TVerse | SPL@T</title>
        <meta name="description" content="Partner, sponsor, or advertise in the SPL@TVerse – SPL@T App, Live Lobby, SP@T Map, Handles, Codes, and more. Bold, shameless, and built for connection." />
      </Head>
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

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <section className="max-w-3xl w-full text-center space-y-8 mt-10 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[color:var(--deep-crimson,#e11d48)] via-red-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-xl">
            Advertise in the SPL@TVerse
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto">
            Want to reach the boldest, fastest-growing LGBTQ+ audience online? Advertise, partner, or sponsor across the entire SPL@TVerse—where connection happens and your brand can become part of the story.
          </p>
        </section>

        <section className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 flex flex-col items-center border border-red-900/10">
            <div className="text-3xl mb-3">📱</div>
            <h2 className="text-xl font-bold text-red-400 mb-2">SPL@T App</h2>
            <p className="text-white/80">Banner, featured, or native ads inside the SPL@T app. Engage users where the magic happens.</p>
          </div>
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 flex flex-col items-center border border-red-900/10">
            <div className="text-3xl mb-3">🗺️</div>
            <h2 className="text-xl font-bold text-red-400 mb-2">SP@T Map</h2>
            <p className="text-white/80">Sponsor real locations, pop-ups, or events on our live map. Geo-targeted reach, real-world impact.</p>
          </div>
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 flex flex-col items-center border border-red-900/10">
            <div className="text-3xl mb-3">🎤</div>
            <h2 className="text-xl font-bold text-red-400 mb-2">SPL@T Live Lobby</h2>
            <p className="text-white/80">Sponsor chat lobbies, host branded takeovers, or create live experiences with our community.</p>
          </div>
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 flex flex-col items-center border border-red-900/10">
            <div className="text-3xl mb-3">🏷️</div>
            <h2 className="text-xl font-bold text-red-400 mb-2">SPL@T Handles & Codes</h2>
            <p className="text-white/80">Get your brand, creator, or event a custom SPL@T handle or code—drive direct engagement and boost campaigns.</p>
          </div>
        </section>

        <section className="max-w-3xl w-full mx-auto mb-16">
          <h3 className="text-2xl font-extrabold text-yellow-400 mb-3">Partnerships & Collabs</h3>
          <p className="text-white/80 text-base mb-4">
            We don’t just sell ads—we co-create. Launch pop-up campaigns, co-host live SPL@T events, sponsor community contests, or bring us your wildest idea. If you want to reach and celebrate LGBTQ+ energy, you belong in the SPL@TVerse.
          </p>
        </section>

        <section className="max-w-2xl w-full mx-auto mb-10 flex flex-col items-center gap-6">
          <div className="text-lg text-white/80 font-medium mb-2">
            Ready to get started?
          </div>
          <a
            href="mailto:ads@usesplat.com"
            className="w-72 flex items-center justify-center gap-2 bg-[color:var(--deep-crimson,#e11d48)] hover:bg-red-700 active:scale-95 text-white text-xl font-bold rounded-full py-4 shadow-lg transition-all duration-150"
          >
            <span className="text-2xl">📧</span> Contact ads@usesplat.com
          </a>
          <div className="text-sm text-white/60">
            Pitch us your idea, book a spot, or just ask a question—we read every message.
          </div>
        </section>
      </main>

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
