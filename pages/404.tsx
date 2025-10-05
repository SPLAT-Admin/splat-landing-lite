import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center p-8">
      <h1 className="text-5xl font-bold text-red-600 mb-4">She’s Not Here, Darling!</h1>
      <p className="text-lg mb-8">
        Looks like you spl@tted into the void. Let’s get you back somewhere safe.
      </p>
      <Link
        href="/"
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all"
      >
        Take Me Home
      </Link>
    </div>
  );
}
