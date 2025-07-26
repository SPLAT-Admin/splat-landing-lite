import Head from 'next/head';
import HeroFlashSale from '@/components/HeroFlashSale';

export default function Home() {
  return (
    <>
      <Head>
        <title>SPL@T – Gay Cruising & Hookup Reimagined</title>
        <meta name="description" content="No shame. Just SPL@T. Join the boldest queer hookup and cruising experience online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <HeroFlashSale />

        <section className="mt-16 max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Welcome to SPL@T
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            No shame. No censorship. No limits. A bold new era of gay cruising and connection—built by us, for us.
          </p>
          <a href="/founder">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition text-lg mt-4">
              💥 Join as a Founding Member
            </button>
          </a>
        </section>
      </main>

      <footer className="mt-20 py-6 text-center text-sm text-gray-400 border-t border-gray-700">
        <p>© 2025 SPL@T, LLC — usesplat.com</p>
        <p>951 S University Ave, Suite 1088, Provo, UT 84601</p>
        <p>Toll-Free: 844-420-8333</p>
      </footer>
    </>
  );
}
