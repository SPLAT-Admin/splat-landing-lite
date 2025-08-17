import Head from 'next/head';
import Link from 'next/link';

export default function MerchPage() {
  return (
    <>
      <Head>
        <title>SPL@T Merch – Coming Soon</title>
        <meta name="description" content="SPL@T Merch is coming soon – bold, unfiltered, unapologetic. Tees, hats, and more to flex your vibe." />
      </Head>

      <section className="bg-black text-white min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center">
          <h1 className="text-[72pt] font-extrabold tracking-tight text-crimson mb-6 drop-shadow-lg">
            💦 SPL@T Merch
          </h1>

          <p className="text-[22pt] text-gray-300 mb-4 italic">
            Gear that hits different.
          </p>

          <p className="text-[16pt] text-gray-300 mb-8">
            From bold tees and nasty hats to exclusive drop sets that scream “I SPL@T and I know it” —
            our merch is almost ready to flood your closet. Made for the unfiltered, the unapologetic,
            and the fully expressed.
          </p>

          <div className="inline-block cursor-not-allowed rounded-full bg-white px-10 py-4 text-[16pt] font-bold text-black shadow-md transition hover:bg-yellow-300">
            👀 Launching Soon
          </div>

          <p className="mt-10 text-sm text-gray-500">
            Want early access? Hit us up at{" "}
            <Link href="mailto:hello@usesplat.com" className="underline hover:text-crimson">
              hello@usesplat.com
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
