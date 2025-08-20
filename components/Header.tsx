import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/ambassador", label: "Ambassador Program" },
    { href: "/merch", label: "Merch (Coming Soon)" },
    { href: "/advertise", label: "Advertise" },
    { href: "/contactus", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 text-white shadow-md backdrop-blur-md">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-4 flex items-center gap-8">
        {/* Logo (left, large) */}
        <Link href="/" aria-label="SPL@T home" className="flex items-center flex-shrink-0">
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={260}
            height={100}
            priority
            className="h-20 md:h-24 w-auto"
          />
        </Link>

        {/* Desktop Navigation (even spacing, 20pt) */}
        <nav
          role="navigation"
          aria-label="Primary"
          className="desktop-nav hidden md:flex flex-1 justify-end items-center gap-12"
        >
          {navLinks.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[20pt] font-bold px-1 transition-colors ${
                  active ? "text-crimson-primary" : "text-[#851825] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger (only <768px) */}
        <div className="mobile-toggle md:hidden ml-auto">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-primary"
          >
            <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (simple, reliable) */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="mobile-menu md:hidden px-6 pb-4 bg-black/95 border-t border-white/10 space-y-2 text-lg font-semibold"
        >
          {navLinks.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block w-full py-3 px-3 rounded hover:bg-white/10 ${
                  active ? "text-crimson-primary" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Hard fallback: guarantees desktop nav shows ≥768px even if Tailwind md: fails */}
      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle, .mobile-menu { display: none !important; }
        }
        @media (max-width: 767.98px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
