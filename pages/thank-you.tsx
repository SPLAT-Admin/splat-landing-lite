import Head from 'next/head';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thank You | SPL@T</title>
        <meta name="description" content="Thanks for connecting with SPL@T. You're in, babe." />
      </Head>

      <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#851725]">
          Thank You 💦
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-xl">
          Your submission was received. Whether it was a message, a payment, or a signup—you’ve just made SPL@T a little hotter.
        </p>
        <p className="text-md text-gray-400 mb-8 max-w-md">
          We’ll reach out soon if needed. In the meantime, stay bold. Stay nasty. Stay SPL@T.
        </p>

        <Link
          href="/"
          className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
        >
          Return to Homepage
        </Link>
      </section>
    </>
  );
}
