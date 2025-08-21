import Head from 'next/head';
import Link from 'next/link';

export default function MerchPage() {
  return (
    <>
      <Head>
        <title>SPL@T Merch – Coming Soon</title>
        <meta
          name="description"
          content="SPL@T Merch is coming soon – bold, unfiltered, unapologetic. Tees, hats, and more to flex your vibe."
        />
      </Head>

      {/* Removed full-screen vertical centering to eliminate empty top space */}
      <section className="bg-black text-white px-6 pt-8 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title: 44pt, Deep Crimson, keep 💦 */}
          <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] mb-6 drop-shadow-lg">
            💦 SPL@T Merch
          </h1>

          {/* Sub Title: 24pt, Acid White, Bold */}
          <p className="text-[24pt] font-bold text-[#FFFFFF] mb-4 italic">
            Gear that hits different.
          </p>

          {/* Body copy: 18pt, Acid White */}
          <p className="text-[18pt] text-[#FFFFFF] mb-8">
            From bold tees and nasty hats to exclusive drop sets that scream “I SPL@T and I know it” —
            our merch is almost ready to flood your closet. Made for the unfiltered, the unapologetic,
            and the fully expressed.
          </p>

          {/* Keep existing placeholder pill */}
          <div className="inline-block cursor-not-allowed rounded-full bg-white px-10 py-4 text-[16pt] font-bold text-black shadow-md transition hover:bg-yellow-300">
            👀 Launching Soon
          </div>

          {/* Keep contact line; tiny style tweak for hover color */}
          <p className="mt-10 text-sm text-gray-500">
            Want early access? Hit us up at{" "}
            <Link href="mailto:hello@usesplat.com" className="underline hover:text-[#851825]">
              hello@usesplat.com
            </Link>
          </p>

          {/* New CTA at the bottom: mimic index waitlist button (Deep Crimson bubble, ~20pt) */}
          <div className="text-center">
            <Link
              href="/#waitlist"
              className="
                inline-block mt-12 rounded-full
                bg-[#851825] text-white
                px-10 py-5
                text-[20pt] font-extrabold tracking-wide
                shadow-[0_0_35px_rgba(133,24,37,0.45)]
                ring-2 ring-[#851825]/70
                hover:bg-[#6f1320] hover:shadow-[0_0_45px_rgba(133,24,37,0.55)]
                focus:outline-none focus-visible:ring-4
                transition-all duration-200 ease-out
              "
            >
              JOIN THE WAITLIST
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
