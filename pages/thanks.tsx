import Head from "next/head";
import Link from "next/link";

export default function ThanksPage() {
  return (
    <>
      <Head>
        <title>You’re on the List | SPL@T</title>
        <meta
          name="description"
          content="You're on the SPL@T waitlist! Check out merch and support the movement."
        />
      </Head>
      <main className="bg-black flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-[#851725]">
          You’re on the SPL@T Waitlist 💦
        </h1>
        <p className="text-xl text-gray-300 max-w-xl">
          You’re all set. While we get ready for launch, grab some exclusive merch and rep the SPL@T mission.
        </p>
        <Link
          href="/merch?ref=waitlist"
          className="inline-block bg-[#851725] hover:bg-red-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-md transition"
        >
          🚀 Visit the Merch Shop
        </Link>
      </main>
    </>
  );
}
