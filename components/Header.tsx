import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/ambassador", label: "Ambassador Program" },
    { href: "/merch", label: "Merch (Coming Soon)" },
    { href: "/advertise", label: "Advertise" },
    { href: "/contactus", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 text-white shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-6 md:py-4">
        {/* Logo (bigger, responsive) */}
        <Link href="/" aria-label="SPL@T home" className="flex items-center">
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={640}  // intrinsic width (2x of 320)
            height={160} // intrinsic height (2x of 80)
            priority
            className="w-auto max-h-28 sm:max-h-32 md:max-h-36 lg:max-h-40 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-wrap items-center justify-center gap-[0.5in] text-[20px] font-large whitespace-pre">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
        >
          <span className="sr-only">Toggle navigation</span>
          {/* Icon */}
          <svg
            className={`h-7 w-7 transition-transform ${open ? "rotate-90" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <>
                <path d="M6 6l12 12M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden bg-black/95 border-t border-gray-800 transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-stretch px-6 py-4 gap-4 text-[18px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-left transition-colors hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
