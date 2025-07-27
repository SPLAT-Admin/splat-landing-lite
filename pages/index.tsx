// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-between font-sans">
      <Head>
        <title>SPL@T – LGBTQ+ Community & Connection</title>
        <meta name="description" content="SPL@T is a new kind of platform for LGBTQ+ people to connect, find community, and participate in a safe, inclusive digital environment. Discover the SPL@TVerse, our suite of features designed for genuine connection and self-expression." />
        <meta property="og:title" content="SPL@T – LGBTQ+ Community & Connection" />
        <meta property="og:description" content="Join SPL@T and be part of a next-generation LGBTQ+ community—safe, innovative, and inclusive. Discover SPL@T App, SP@T Map, and more." />
        <meta property="og:image" content="/splat-og-hero.jpg" />
      </Head>

      {/* NAVIGATION */}
      <nav className="w-full py-4 px-8 flex justify-between items-center">
        <span className="text-3xl font-extrabold tracking-tight text-[color:var(--deep-crimson,#e11d48)] drop-shadow">
          SPL@T
        </span>
        <div className="flex gap-6 items-center">
          <Link href="/founder" className="bg-[color:var(--deep-crimson,#e11d48)] hover:bg-red-700 text-white font-bold px-5 py-2 rounded-full shadow-md transition-all duration-150">
            Founder Sale
          </Link>
          <Link href="/advertise" className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2 rounded-full shadow transition-all duration-150">
            Advertise
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-xl">
            Welcome to SPL@T
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium mx-auto max-w-xl">
            SPL@T is an LGBTQ+ community platform designed for authentic connection, inclusivity, and self-expression.<br />
            We put safety and respect at the center of everything, giving you a vibrant space to meet, chat, and participate.<br /><br />
            <span className="block mt-2">
              For support or questions, email us at <a href="mailto:support@usesplat.com" className="underline text-yellow-300">support@usesplat.com</a>.
            </span>
          </p>
          {/* SAFE HERO IMAGE PLACEHOLDER */}
          <div className="w-full flex justify-center py-2">
            <img
              src="/splat-hero-safe.png"
              alt="SPL@T app preview"
              className="w-80 h-44 object-contain rounded-2xl shadow-xl border-2 border-red-500/40 bg-black"
              style={{ background: "linear-gradient(120deg,#0f0e13 60%,#e11d48 100%)" }}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-6">
            <Link
              href="/founder"
              className="w-64 mx-auto flex items-center justify-center gap-2 bg-[color:var(--deep-crimson,#e11d48)] hover:bg-red-700 active:scale-95 text-white text-xl font-bold rounded-full py-4 shadow-lg transition-all duration-150"
            >
              Founder Sale: Lifetime Access
            </Link>
            <a
              href="mailto:team@usesplat.com"
              className="w-64 mx-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-lg font-semibold rounded-full py-4 shadow transition-all duration-150"
            >
              Contact Us
            </a>
          </div>
          <div className="mt-8 text-center text-sm text-white/70">
            SPL@T launches 2025. The first 250 members receive special lifetime access.
          </div>
        </div>

        {/* SPL@TVerse Section */}
        <section className="max-w-3xl w-full mt-14 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Discover the SPL@TVerse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl mb-2">📱</span>
              <div className="font-bold text-lg text-[color:var(--deep-crimson,#e11d48)] mb-1">SPL@T App</div>
              <div className="text-white/80 text-sm">Connect with others, join conversations, and discover your community in a private, inclusive digital space.</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl mb-2">🗺️</span>
              <div className="font-bold text-lg text-[color:var(--deep-crimson,#e11d48)] mb-1">SP@T Map</div>
              <div className="text-white/80 text-sm">A live map to explore LGBTQ+ spaces, events, and activities—find your people online and in real life, safely and respectfully.</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl mb-2">🎤</span>
              <div className="font-bold text-lg text-[color:var(--deep-crimson,#e11d48)] mb-1">SPL@T Live Lobby</div>
              <div className="text-white/80 text-sm">Participate in live, moderated conversations and community forums—always supportive, always welcoming.</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl mb-2">🏷️</span>
              <div className="font-bold text-lg text-[color:var(--deep-crimson,#e11d48)] mb-1">SPL@T Handles & Codes</div>
              <div className="text-white/80 text-sm">Personalize your experience with unique handles and codes—safe, creative ways to connect and share.</div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-8 flex flex-col items-center justify-center bg-black/90 border-t border-white/10 px-6 mt-12">
        <div className="flex gap-5 flex-wrap items-center justify-center mb-3">
          <a href="/privacy" className="text-xs text-white/70 hover:text-white underline">Privacy Policy</a>
          <span className="text-white/30">|</span>
          <a href="/terms" className="text-xs text-white/70 hover:text-white underline">Terms of Service</a>
          <span className="text-white/30">|</span>
          <a href="/community" className="text-xs text-white/70 hover:text-white underline">Community Standards</a>
          <span className="text-white/30">|</span>
          <a href="https://instagram.com/splatapp" target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white underline">Instagram</a>
          <span className="text-white/30">|</span>
          <a href="mailto:support@usesplat.com" className="text-xs text-white/70 hover:text-white underline">Support</a>
        </div>
        <div className="flex flex-col items-center gap-1 mt-1">
          <div className="text-xs text-white/50">
            SPL@T Technologies LLC
          </div>
          <div className="text-xs text-white/50">
            1234 Castro Street, Suite 101, San Francisco, CA 94114
          </div>
          <div className="text-xs text-white/50">
            Phone: <a href="tel:+14155551234" className="underline hover:text-white">+1 (415) 555-1234</a>
          </div>
        </div>
        <div className="text-xs text-white/40 mt-3">
          &copy; {new Date().getFullYear()} SPL@T. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
