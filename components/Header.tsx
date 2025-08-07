@tailwind base;
@tailwind components;
@tailwind utilities;

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ambassador', label: 'Ambassador Program' },
    { href: '/merch', label: 'Merch (Coming Soon)' },
    { href: '/advertise', label: 'Advertise' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black bg-opacity-90 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo - always visible */}
        <Link href="/" className="flex items-center space-x-2" aria-label="SPL@T home">
          <img
            src="/splat-logo.png"
            alt="SPL@T Logo"
            className="h-10 w-auto"
          />
          <span className="text-3xl font-extrabold tracking-tight text-red-600">SPL@T</span>
        </Link>
        {/* Desktop navigation - only visible on md and up */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-red-400">
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
          >
            Join Waitlist
          </Link>
        </nav>
        {/* Mobile menu button - only visible on small screens */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close main menu" : "Open main menu"}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {/* Mobile navigation drawer */}
      {menuOpen && (
        <nav id="mobile-menu" className="md:hidden" aria-label="Mobile navigation">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800 hover:text-red-400"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="block rounded-md bg-red-600 px-3 py-2 text-base font-semibold text-white shadow hover:bg-red-700"
              onClick={() => setMenuOpen(false)}
            >
              Join Waitlist
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // ...other config
}