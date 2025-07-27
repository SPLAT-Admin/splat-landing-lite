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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <section className="max-w-3xl w-full text-center space-y-8 mt-8 mb-14">
          <p className="text-lg md:text-2xl text-white/90 font-medium mx-auto max-w-xl mb-6">
            SPL@T is an LGBTQ+ community platform designed for authentic connection, inclusivity, and self-expression.
            <br />
            We put safety and respect at the center of everything, giving you a vibrant space to meet, chat, and participate.
            <br /><br />
            <span className="block mt-3">
              For support or questions, email us at <a href="mailto:support@usesplat.com" className="underline text-yellow-300">support@usesplat.com</a>.
            </span>
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-2 mb-3">
            <Link
              href="/founder"
              className="w-64 mx-auto flex items-center justify-center gap-2 bg-[color:var(--deep-crimson,#e11d48)] hover:bg-red-700 active:scale-95 text-white text-xl font-bold rounded-full py-4 shadow-lg transition-all duration-150 mb-3 md:mb-0"
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
          <div className="mt-10 text-center text-sm text-white/70">
            SPL@T launches 2025. The first 250 members receive special lifetime access.
          </div>
        </section>

        {/* SPL@TVerse Section */}
        <section className="max-w-3xl w-full mt-8 text-center space-y-10 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Discover the SPL@TVerse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white/5 rounded-xl p-8 shadow flex flex-col items-center">
              <span className="text-3xl mb-3">📱</span>
              <div className="font-bold text-lg text-[color:var(--deep-crimson,#e11d48)] mb-2">SPL@T App</div>
              <div className="text-white/80 text-base">Connect, join conversations, and find community in a private, inclusive space.</div>
            </div>
            <div className="bg-white/5 rounded-xl p-8 shadow flex flex-col items-center">
              <span className="text-3xl mb-3">🗺️</span>
              <div className="font-bold text-lg text-[color:var(--deep-crimson,#e11d48)] mb-2">SP@T Map</div>
              <div className="text-white/80 text-base">A live map to explore LGBTQ+ spaces, events, and activities—find your people online and IRL, safely and respectfully.</div>
            </div>
            <div className="bg-white/5 rounded-xl p-8 shadow flex flex-col items-center">
              <span className="text-3xl mb-3">🎤</span>
              <div className="font-bold text-lg text-[color:var(--deep-crimson,#e11d48)] mb-2">SPL@T Live Lobby</div>
              <div className="text-white/80 text-base">Participate in live, moderated conversations and community forums—always supportive, always welcoming.</div>
            </div>
            <div className="bg-white/5 rounded-xl p-8 shadow flex flex-col items-center">
              <span className="text-3xl mb-3">🏷️</span>
              <div className="font-bold text-lg text-[color:var(--deep-crimson,#e11d48)] mb-2">SPL@T Handles & Codes</div>
              <div className="text-white/80 text-base">Personalize your experience with unique handles and codes—safe, creative ways to connect and share.</div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-8 flex flex-col items-center justify-center bg-black/90 border-t border-white/10 px-6 mt-8">
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
        <div className="flex flex-col items-center gap-1 mt-1 text-center">
          <div className="text-xs text-white/50">
            SPLAT, LLC
          </div>
          <div className="text-xs text-white/50">
            971 S University Avenue, Suite 1088, Provo, Utah 84601
          </div>
          <div className="text-xs text-white/50">
            Phone: <a href="tel:18444208333" className="underline hover:text-white">844-420-8333</a>
          </div>
        </div>
        <div className="text-xs text-white/40 mt-3">
          &copy; {new Date().getFullYear()} SPLAT, LLC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}