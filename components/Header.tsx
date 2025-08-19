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
      <div className="mx-auto max-w-screen-2xl flex items-center justify-between px-6 lg:px-10 py-4">
        {/* Logo */}
        <Link href="/" aria-label="SPL@T home" className="flex items-center">
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
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[20pt] font-bold transition-colors ${
                  active ? "text-crimson-primary" : "text-[#851825] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="p-2 rounded-md focus:outline-none"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden px-4 pb-4 bg-black/95 border-t border-white/10 space-y-3">
          {navLinks.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block w-full py-3 px-3 rounded text-lg font-semibold hover:bg-white/10 ${
                  active ? "text-crimson-primary" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
