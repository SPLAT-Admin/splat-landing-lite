import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; // Animated icons

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/founder', label: 'Founder' },
    { href: '/ambassador', label: 'Ambassador' },
    { href: '/merch', label: 'Merch' },
    { href: '/advertise', label: 'Advertise' },
    { href: '/contactus', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[color:var(--deep-crimson)] shadow-lg transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={260}
            height={160}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center flex-1 gap-x-14 text-lg font-medium text-white">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="px-6 py-3 rounded-full border border-[color:var(--deep-crimson)] hover:bg-[color:var(--deep-crimson)] hover:shadow-lg hover:-translate-y-1 transform transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="block md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="p-2 border border-[color:var(--deep-crimson)] rounded-md transition-transform duration-300"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-white transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="w-6 h-6 text-white transition-transform duration-300 rotate-0" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden bg-black/95 border-t border-[color:var(--deep-crimson)] overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="w-3/4 text-center px-6 py-4 rounded-full border border-[color:var(--deep-crimson)] hover:bg-[color:var(--deep-crimson)] hover:text-white hover:shadow-lg hover:-translate-y-1 transform transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
