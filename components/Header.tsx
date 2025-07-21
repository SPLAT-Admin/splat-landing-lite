import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-red-700 px-6 py-4 shadow-md flex items-center justify-between max-w-7xl mx-auto">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/splat-logo.png"
          alt="SPL@T Logo"
          width={160}
          height={60}
          priority
        />
      </Link>
      <nav className="flex space-x-6 text-sm md:text-base font-semibold">
        <Link href="/founder" className="hover:text-red-500">Founder Sale</Link>
        <Link href="/ambassador" className="hover:text-red-500">Ambassador</Link>
        <Link href="/merch" className="hover:text-red-500">Merch</Link>
        <Link href="/advertise" className="hover:text-red-500">Advertise</Link>
        <Link href="/contactus" className="hover:text-red-500">Contact</Link>
      </nav>
    </header>
  );
}
