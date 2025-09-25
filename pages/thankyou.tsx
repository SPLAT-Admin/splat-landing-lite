import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      void router.push("/merch");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Thanks for Joining SPL@T</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-black via-[#0b0206] to-black px-6 py-16 text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="relative mb-10 flex h-36 w-36 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#851825]/30" />
            <div className="absolute inset-4 animate-pulse rounded-full bg-[#851825]/40" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#851825] shadow-[0_0_65px_rgba(133,23,37,0.55)]">
              <span className="text-5xl">💦</span>
            </div>
          </div>

          <h1 className="text-[38pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg sm:text-[48pt]">
            💦 Thanks for joining SPL@T!
          </h1>
          <p className="mt-4 text-lg text-white/85 sm:text-xl">
            You're officially part of the crew. Stay tuned—juicy drops are on their way to your inbox.
          </p>

          <Link
            href="/merch"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-[#851825] px-10 py-4 text-lg font-bold uppercase tracking-wide text-white shadow-[0_0_35px_rgba(133,23,37,0.45)] transition-transform duration-200 hover:scale-[1.03] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/60"
          >
            🔥 Shop the Merch
          </Link>

          <p className="mt-6 text-sm text-white/60">
            Redirecting you to the merch drop in 5…
          </p>
        </div>
      </main>
    </>
  );
}
