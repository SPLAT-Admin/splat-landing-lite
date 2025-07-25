// components/HeroFlashSale.tsx
import Link from 'next/link';

export default function HeroFlashSale() {
  return (
    <div className="bg-red-600 text-white py-6 px-4 text-center rounded-lg shadow-lg animate-pulse mb-12">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-2 uppercase tracking-wider">
        💥 Founder Flash Sale – Limited Time Only!
      </h2>
      <p className="text-md md:text-lg mb-4">
        Lifetime SPL@T Premium – <span className="font-bold">$25</span> for the first 250 only!
      </p>
      <Link
        href="/founder"
        className="inline-block bg-white text-red-600 px-6 py-3 font-bold rounded-full text-lg hover:bg-yellow-300 transition"
      >
        Claim Your Spot →
      </Link>
    </div>
  );
}
