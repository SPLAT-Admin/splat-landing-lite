import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-[color:var(--deep-crimson)] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={160}
            height={60}
            priority
          />
        </Link>
        <nav className="flex space-x-4 text-sm md:text-base font-semibold text-white">
          <Link href="/founder" className="hover:text-[color:var(--deep-crimson)]">Founder</Link>
          <Link href="/ambassador" className="hover:text-[color:var(--deep-crimson)]">Ambassador</Link>
          <Link href="/merch" className="hover:text-[color:var(--deep-crimson)]">Merch</Link>
          <Link href="/advertise" className="hover:text-[color:var(--deep-crimson)]">Advertise</Link>
          <Link href="/contactus" className="hover:text-[color:var(--deep-crimson)]">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
