import Head from 'next/head';
import Link from 'next/link';

export default function MerchPage() {
  return (
    <>
      <Head>
        <title>SPL@T Merch – Coming Soon</title>
      </Head>

      <section className="bg-black text-white py-24 px-6 text-center min-h-screen">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#851725]">
          💦 SPL@T Merch
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 italic">
          Gear that hits different.
        </p>
        <p className="max-w-2xl mx-auto text-lg mb-12">
          From bold tees and nasty hats to exclusive drop sets that say “I SPL@T and I know it”—our merch
          is almost ready to flood your closet. Made for the unfiltered, the unapologetic, and the fully expressed.
        </p>
        <div className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition cursor-not-allowed">
          👀 Launching Soon
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Want early access? Hit us up at{' '}
          <Link href="mailto:hello@usesplat.com" className="underline hover:text-[#851725]">
            hello@usesplat.com
          </Link>
        </p>
      </section>
    </>
  );
}
