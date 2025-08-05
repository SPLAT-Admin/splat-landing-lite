import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-[color:var(--deep-crimson)] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={260}
            height={160}
            priority
          />
        </Link>
        <nav className="hidden md:flex gap-x-6 text-lg font-medium text-white">
          {[
            { href: "/founder", label: "Founder" },
            { href: "/ambassador", label: "Ambassador" },
            { href: "/merch", label: "Merch" },
            { href: "/advertise", label: "Advertise" },
            { href: "/contactus", label: "Contact" }
          ].map(link => (
            <Link key={link.href} href={link.href} className="px-4 py-2 rounded-full border border-[color:var(--deep-crimson)] hover:bg-[color:var(--deep-crimson)] hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 border border-[color:var(--deep-crimson)] rounded-md">
            ☰
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-[color:var(--deep-crimson)] py-4 animate-slide-down">
          <div className="flex flex-col items-center gap-4">
            {[
              { href: "/founder", label: "Founder" },
              { href: "/ambassador", label: "Ambassador" },
              { href: "/merch", label: "Merch" },
              { href: "/advertise", label: "Advertise" },
              { href: "/contactus", label: "Contact" }
            ].map(link => (
              <Link key={link.href} href={link.href} className="px-4 py-2 rounded-full border border-[color:var(--deep-crimson)] hover:bg-[color:var(--deep-crimson)] hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}