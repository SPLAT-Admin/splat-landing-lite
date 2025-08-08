import Link from 'next/link';

export default function Header() {
  const navLinks = [
    { href: '/', label: 'Home     |     ' },
      { href: '/ambassador', label: 'Ambassador Program     |     ' },
    { href: '/merch', label: 'Merch (Coming Soon)     |      '},
    { href: '/advertise', label: 'Advertise     |     ' },
    { href: '/contact', label: 'Contact     |     ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black bg-opacity-90 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" aria-label="SPL@T home">
          <img
            src="/splat-logo.png"
            alt="SPL@T Logo"
            className="h-10 w-auto"
          />
        </Link>
        {/* Navigation - always visible */}
        <nav className="flex flex-row flex-wrap items-center space-x-12 space-y-12" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-lg font-large transition-colors hover:text-red-400">
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="rounded-md bg-red-600 px-4 py-2 text-lg font-semibold text-white shadow hover:bg-red-700"
          >
            Join Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}

