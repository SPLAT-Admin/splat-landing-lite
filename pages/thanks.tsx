// pages/thanks.tsx
import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">You’re on the SPL@T Waitlist 💦</h1>
      <p className="text-lg text-gray-300 mb-4 max-w-xl">
        We’ve got your info and you’ll be the first to know when SPL@T goes live. While you wait, check out our exclusive merch and support the movement.
      </p>

      <Link href="/merch" className="inline-block bg-red-500 text-white px-6 py-3 rounded font-bold hover:bg-red-600 transition">
        Browse Merch →
      </Link>
    </main>
  );
}
