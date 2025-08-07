export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
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
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" aria-label="SPL@T home">
          <span className="text-3xl font-extrabold tracking-tight text-red-600">SPL@T</span>
        </Link>
        {/* Desktop navigation */}
        <nav className="hidden items-center space-x-6 md:flex" aria-label="Primary navigation">
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
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-800 hover:text-white md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile navigation drawer */}
      {isOpen && (
        <nav id="mobile-menu" className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800 hover:text-red-400"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="block rounded-md bg-red-600 px-3 py-2 text-base font-semibold text-white shadow hover:bg-red-700"
              onClick={() => setIsOpen(false)}
            >
              Join Waitlist
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}