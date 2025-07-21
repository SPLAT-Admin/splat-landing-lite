// pages/merch.tsx

import Head from 'next/head';

export default function Merch() {
  return (
    <>
      <Head>
        <title>SPL@T Merch — Coming Soon</title>
        <meta name="description" content="SPL@T Merch Store launching soon!" />
      </Head>
      <section className="min-h-screen bg-black text-white px-6 py-24 text-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">SPL@T Merch</h1>
          <p className="text-lg mb-4">
            We’re brewing up some juicy, limited-edition SPL@T gear.
          </p>
          <p className="text-xl font-semibold mb-10">Coming Soon.</p>
          <p className="text-sm text-gray-400">Stay splattered — follow us for updates.</p>
        </div>
      </section>
    </>
  );
}
