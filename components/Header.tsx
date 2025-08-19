import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/ambassador", label: "Ambassador Program" },
    { href: "/merch", label: "Merch (Coming Soon)" },
    { href: "/advertise", label: "Advertise" },
    { href: "/contactus", label: "Contact" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 text-white shadow-md backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="SPL@T home" className="flex items-center flex-shrink-0">
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={200}
            height={80}
            priority
            className="h-14 lg:h-16 w-auto"
          />
        </Link>

        {/* Desktop Navigation (>=768px) */}
        {!isMobile && (
          <nav className="flex flex-1 justify-evenly items-center text-[20pt] font-bold tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 hover:text-crimson-primary transition-colors ${
                  router.pathname === link.href ? "text-crimson-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* 🍔 Mobile Hamburger Toggle (<768px) */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            aria-label="Hamburger menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-primary rounded-md"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobile && open && (
        <nav
          id="mobile-menu"
          className="px-4 pb-4 space-y-3 text-lg font-semibold bg-black/95 border-t border-white/10 transition-all duration-300 ease-in-out"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block w-full py-3 px-3 rounded hover:bg-white/10 ${
                router.pathname === link.href ? "text-crimson-primary" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
