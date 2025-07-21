// pages/thank-you.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thank You | SPL@T</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="p-8 max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Thanks for SPL@T‑ing 💦</h1>
        <p className="mb-4">Your submission was received. We’ll be in touch soon.</p>
        <Link href="/" passHref>
          <a className="inline-block mt-4 px-4 py-2 bg-black text-white rounded hover:bg-red-800 transition">
            Go Home
          </a>
        </Link>
      </main>
    </>
  );
}
