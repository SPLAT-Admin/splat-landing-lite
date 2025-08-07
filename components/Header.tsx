import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/founder', label: 'Founder Sale (Closed)' },
    { href: '/ambassador', label: 'Ambassador Program' },
    { href: '/merch', label: 'Merch (Coming Soon)' },
    { href: '/advertise', label: 'Advertise' },
    { href: '/contactus', label: 'Contact' }
  ];

  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-left mb-4 md:mb-0">
          <Image 
            src="/splat-logo.png" 
            alt="SPL@T Logo" 
            width={360} 
            height={120} 
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="flex flex-wrap justify-center md:justify-end items-center gap-6 text-lg md:text-xl font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#851725] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
