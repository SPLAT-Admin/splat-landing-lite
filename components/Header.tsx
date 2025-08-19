import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const [open, setOpen] = useState(false);
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
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <nav
          role="navigation"
          aria-label="Primary"
          className="hidden md:flex flex-1 justify-end items-center gap-12"
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

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Hamburger menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-primary rounded-md"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation with Animation */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out transform origin-top ${
          open ? "max-h-[500px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
        } px-4 bg-black/95 text-lg font-semibold border-t border-white/10`}
      >
        <div className="flex flex-col gap-2 py-4">
          {navLinks.map((link, i) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block w-full py-3 px-3 rounded transition-all duration-300 ease-in-out transform ${
                  active ? "text-crimson-primary" : ""
                } hover:bg-white/10 hover:scale-[1.02] hover:text-white`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
