// pages/founder.tsx

import Head from 'next/head';
import Link from 'next/link';

export default function FounderPage() {
  return (
    <>
      <Head>
        <title>Founder Sale | SPL@T</title>
      </Head>

      <section className="bg-black text-white py-20 px-4 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-deep-crimson">
            🔥 Founder Sale – Limited Time
          </h1>
          <p className="mb-6 text-lg">
            First 250 only: SPL@T Premium Lifetime Membership for just <strong>$25</strong>.
          </p>
          <p className="mb-6">
            No renewals. No monthly charges. Ever.
          </p>
          <p className="mb-6">
            After 250 are gone, price jumps to <strong>$50</strong> until the 7-hour window ends.
          </p>
          <p className="mb-6 text-sm text-gray-400">
            Launches <strong>July 25, 2025</strong> at <strong>10:00 AM MST</strong>
          </p>

          {/* Stripe Checkout Placeholder */}
          <div className="mt-10">
            <Link href="/checkout" passHref>
              <button
                className="bg-deep-crimson hover:bg-red-600 text-white px-6 py-3 rounded text-lg font-semibold"
                disabled
              >
                ⏳ Checkout opens July 25 @ 10 a.m.
              </button>
            </Link>
          </div>

          {/* Timer placeholder */}
          <div className="mt-10 text-sm text-gray-500">
            Countdown placeholder (hook in when ready)
          </div>
        </div>
      </section>
    </>
  );
}
