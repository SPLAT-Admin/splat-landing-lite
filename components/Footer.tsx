import Link from 'next/link';

export default function Footer() {
  const links = [
    { href: '/sitemap', label: 'Site Map' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/community', label: 'SPL@T Community Standards' }
  ];

  return (
    <footer className="relative bg-black border-t border-[color:var(--deep-crimson)] pt-8 pb-6 text-[10px] text-gray-400">
      {/* Gradient at top for luxe blend */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-[color:var(--deep-crimson)] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 space-y-2 text-center">
        <div>
          © {new Date().getFullYear()} SPLAT, LLC | www.usesplat.com | 844-420-8333
        </div>
        <div>
          SPLAT, LLC | 971 S University Ave, Suite 1088 Provo, Utah 84601
        </div>
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 pt-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white hover:underline transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
