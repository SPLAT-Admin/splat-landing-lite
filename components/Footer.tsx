import Link from 'next/link';

export default function Footer() {
  const links = [
    { href: '/sitemap', label: 'Site Map' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/community', label: 'SPL@T Community Standards' }
  ];

  return (
    <footer className="relative bg-black border-t border-[color:var(--deep-crimson)] pt-8 pb-6">
      {/* Gradient at top for luxe blend */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-[color:var(--deep-crimson)] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="text-white text-lg font-bold">
          © {new Date().getFullYear()} SPL@T™
        </div>

        {/* Footer Nav */}
        <nav className="flex flex-wrap justify-center items-center gap-y-3 text-sm text-gray-300">
          {links.map((link, index) => (
            <div key={link.href} className="flex items-center">
              <Link 
                href={link.href}
                className="px-3 hover:text-white hover:shadow-[0_0_5px_var(--deep-crimson)] transition-all"
              >
                {link.label}
              </Link>
              {index < links.length - 1 && (
                <span className="hidden md:inline text-[color:var(--deep-crimson)]">|</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
