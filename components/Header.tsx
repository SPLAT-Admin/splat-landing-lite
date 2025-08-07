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
      <div className="container mx-auto flex items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
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
        <nav className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2 text-[20px] font-semibold">
          {navLinks.map((link, index) => (
            <div key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className="hover:text-[#851725] transition-colors duration-200"
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 && (
                <span className="mx-3 text-gray-500">|</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
