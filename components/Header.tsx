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
      <div className="mx-auto w-full max-w-[2400px] px-6 lg:px-12 py-5 flex items-center gap-8 lg:gap-12">
        {/* Logo (slightly bigger so it pops) */}
        <Link href="/" aria-label="SPL@T home" className="flex items-center flex-shrink-0">
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={420}
            height={200}
            priority
            className="h-32 md:h-40 lg:h-48 xl:h-56 w-auto transition-transform duration-500 ease-out hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation (more breathing room, same labels/order) */}
        <nav
          role="navigation"
          aria-label="Primary"
          className="hidden md:flex flex-1 justify-end items-center gap-6 lg:gap-10 xl:gap-14"
        >
          {navLinks.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap text-[20pt] font-bold px-2 transition-colors ${
                  active ? "text-crimson-primary" : "text-[#851825] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger (unchanged) */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
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

      {/* Mobile Menu (unchanged) */}
      {menuOpen && (
        <nav className="md:hidden px-6 pb-4 bg-black/95 border-t border-white/10 space-y-2 text-lg font-semibold">
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

      {/* Safety net: ensure desktop shows on ≥768px even if Tailwind hiccups */}
      <style jsx>{`
        @media (min-width: 768px) {
          nav[aria-label="Primary"] { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
