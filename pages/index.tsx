// pages/index.tsx

import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>SPL@T – No Shame. Just SPL@T.</title>
        <meta name="description" content="SPL@T is a bold, unapologetically sexy queer dating and cruising app. No shame. Just SPL@T." />
      </Head>

      <section className="bg-black text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">SPL@T</h1>
        <p className="text-xl md:text-2xl mb-8">No Shame. Just SPL@T.</p>
        <div className="bg-deep-crimson text-white px-6 py-4 rounded inline-block text-lg font-semibold mb-8">
          🔥 Founder Sale – Limited Time
        </div>
        <p className="mb-4 text-lg max-w-xl mx-auto">
          First 250 only: SPL@T Premium Lifetime Membership for just $25.<br />
          No renewals. No monthly charges. Ever.
        </p>
        <p className="mb-6 text-md max-w-xl mx-auto">
          After 250 are gone, price jumps to $50 until the 7-hour window ends.
        </p>
        <p className="text-deep-crimson text-sm font-bold mb-10">Live July 25 @ 10 a.m. MST</p>
        <Link
          href="/founder"
          className="inline-block bg-white text-black font-bold px-6 py-3 rounded hover:bg-red-700 hover:text-white transition"
        >
          Join the Founder Sale
        </Link>
      </section>

      <section className="bg-black text-white py-16 px-6">
        <h2 className="text-2xl font-semibold mb-4">We’re almost live.</h2>
        <ul className="list-disc list-inside mb-6 text-lg max-w-xl mx-auto">
          <li>• Android build is nearly done</li>
          <li>• Beta testing launches soon</li>
        </ul>
        <Link href="/contactus" className="underline text-red-500 hover:text-white">
          Help fund SPL@T’s launch →
        </Link>
      </section>

      <footer className="bg-black text-white text-center py-10 text-sm">
        <p>© 2025 SPLAT, LLC • <Link href="https://usesplat.com" className="underline hover:text-red-500">usesplat.com</Link></p>
        <p className="mt-2">Want to sponsor a SP@T location or SPL@T LIVE event? <Link href="/advertise" className="underline hover:text-red-500">Ask us about our upcoming sponsorship deck</Link>.</p>
      </footer>
    </>
  );
}
