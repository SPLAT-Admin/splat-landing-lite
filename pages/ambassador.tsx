// pages/ambassador.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function AmbassadorPage() {
  return (
    <>
      <Head>
        <title>Become a SPL@T Ambassador</title>
      </Head>
      <section className="bg-black text-white min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-[color:var(--deep-crimson)]">Join the SPL@T Ambassador Program</h1>
          <p className="text-lg text-gray-300 mb-4">
            Are you bold, sexy, connected, and ready to splash the world with the SPL@T movement? Whether you're an influencer,
            community leader, nightlife royalty, or just fiercely social—SPL@T wants you.
          </p>
          <p className="mb-6 text-sm text-gray-400">
            Ambassadors get early access, exclusive perks, promo codes, invites to SPL@T LIVE events, and a voice in the evolution
            of the hookupverse.
          </p>

          <div className="bg-gray-900 rounded-xl p-6 mt-10 text-left text-sm">
            <h2 className="text-lg font-bold text-white mb-2">SPL@T Ambassador Expectations</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Must be 21+ years old</li>
              <li>Follow and promote SPL@T across your social platforms</li>
              <li>Respect the SPL@T Community Standards (no hate, no shame, no drama)</li>
              <li>Bring energy, visibility, and queer joy to the world of SPL@T</li>
            </ul>
          </div>

          <div className="mt-12">
            <Link href="/ambassador-apply">
              <button className="bg-[color:var(--deep-crimson)] hover:bg-red-800 text-white font-bold px-6 py-3 rounded-full text-lg transition">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
