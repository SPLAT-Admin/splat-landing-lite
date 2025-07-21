// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>SPL@T – No Shame. Just SPL@T.</title>
        <meta name="description" content="Join the movement. SPL@T is the bold new hookup and cruising app for everyone." />
      </Head>

      <section className="text-center py-20 px-6 bg-black text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">SPL@T</h1>
        <p className="text-lg md:text-2xl text-gray-300">No Shame. Just SPL@T.</p>
      </section>

      <section className="bg-red-700 text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">🔥 Founder Sale – Limited Time</h2>
        <p className="mb-2 text-lg">First 250 only: <strong>SPL@T Premium Lifetime Membership</strong> for just <span className="text-yellow-300">$25</span>.</p>
        <p className="mb-2 text-sm">No renewals. No monthly charges. Ever.</p>
        <p className="mb-6 text-sm">After 250 are gone, price jumps to $50 until the 7-hour window ends.</p>
        <p className="font-semibold mb-6">Live <strong>July 25 @ 10 a.m. MST</strong></p>
        <Link href="/founder" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
          Join the Founder Sale
        </Link>
      </section>

      <section className="bg-black text-white py-16 px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">We’re almost live.</h3>
        <ul className="list-disc list-inside text-left max-w-xl mx-auto mb-6">
          <li>Android build is nearly done</li>
          <li>Beta testing launches soon</li>
        </ul>
        <Link href="/contactus" className="underline hover:text-red-500">
          Help fund SPL@T’s launch →
        </Link>
      </section>

      <footer className="text-center text-sm text-gray-400 bg-black py-10">
        <p>© 2025 SPLAT, LLC • usesplat.com</p>
        <p className="mt-2">Want to sponsor a SP@T location or SPL@T LIVE event? Ask us about our upcoming sponsorship deck.</p>
      </footer>
    </>
  );
}
