// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SPL@T</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </Head>

      <header className="sticky top-0 z-50 bg-black border-b border-[color:var(--deep-crimson)] px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/splat-logo.png"
              alt="SPL@T Logo"
              width={160}
              height={60}
              priority
            />
          </Link>
          <nav className="flex gap-3 text-sm md:text-base font-semibold">
            <Link href="/founder">
              <button className="px-4 py-2 rounded hover:bg-[color:var(--deep-crimson)] hover:text-white transition">Founder</button>
            </Link>
            <Link href="/ambassador">
              <button className="px-4 py-2 rounded hover:bg-[color:var(--deep-crimson)] hover:text-white transition">Ambassador</button>
            </Link>
            <Link href="/merch">
              <button className="px-4 py-2 rounded hover:bg-[color:var(--deep-crimson)] hover:text-white transition">Merch</button>
            </Link>
            <Link href="/advertise">
              <button className="px-4 py-2 rounded hover:bg-[color:var(--deep-crimson)] hover:text-white transition">Advertise</button>
            </Link>
            <Link href="/contactus">
              <button className="px-4 py-2 rounded hover:bg-[color:var(--deep-crimson)] hover:text-white transition">Contact Us</button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="min-h-screen bg-black text-white">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;
