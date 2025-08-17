import Head from "next/head";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thanks for Joining | SPL@T</title>
        <meta
          name="description"
          content="You're in! Grab early merch while it's hot and stay tuned."
        />
      </Head>
      <main className="bg-black flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-[#851725]">Thanks for Joining!</h1>
        <p className="text-xl text-gray-300 max-w-xl">
          You’re officially part of the SPL@T fam. Check your inbox for a confirmation —
          and while you’re here, check out the upcoming merch drop and rep the movement.
        </p>
        <Link
          href="/merch?ref=thank-you"
          className="inline-block bg-[#851725] hover:bg-red-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-md transition"
        >
          💦 Go to Merch Shop
        </Link>
      </main>
    </>
  );
}
