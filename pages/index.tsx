// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-between font-sans">
      <Head>
        <title>SPL@T – LGBTQ+ Community & Connection</title>
        <meta name="description" content="SPL@T is the bold new way for LGBTQ+ people to connect, meet, and build community. Join the founder sale and get lifetime access." />
        <meta property="og:title" content="SPL@T – LGBTQ+ Community & Connection" />
        <meta property="og:description" content="Join SPL@T for a bold, next-gen LGBTQ+ chat and connection experience. First 250 get Lifetime access for $25." />
        <meta property="og:image" content="/splat-og-hero.jpg" />
      </Head>

      {/* NAV */}
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
            Unleash Connection.
            <br />
            <span className="text-[color:var(--deep-crimson,#e11d48)]">SPL@T.</span> No Apologies.
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium mx-auto max-w-xl">
            The bold, high-velocity app for LGBTQ+ people to connect, share, and explore community—online and off.<br />
            <span className="text-[color:var(--deep-crimson,#e11d48)] font-bold">
              No shame. No limits. All you.
            </span>
          </p>
          {/* HERO SAFE IMAGE PLACEHOLDER */}
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
              <span className="text-2xl">💦</span> Founder Sale: $25 Lifetime
            </Link>
            <a
              href="mailto:team@usesplat.com"
              className="w-64 mx-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-lg font-semibold rounded-full py-4 shadow transition-all duration-150"
            >
              Contact Us
            </a>
          </div>
          <div className="mt-8 text-center text-sm text-white/70">
            SPL@T launches 2025.
            <span className="text-yellow-400 font-semibold"> First 250 get it all for $25.</span>
            No subscriptions. No barriers. No limits.
          </div>
        </div>
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
