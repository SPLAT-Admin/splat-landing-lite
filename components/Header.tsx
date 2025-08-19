import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/ambassador", label: "Ambassador Program" },
    { href: "/merch", label: "Merch (Coming Soon)" },
    { href: "/advertise", label: "Advertise" },
    { href: "/contactus", label: "Contact" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 text-white shadow-md backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label="SPL@T home" className="flex-shrink-0">
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={260}
            height={100}
            priority
            className="h-20 md:h-24 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav className="flex gap-10">
            {navLinks.map((link) => {
              const active = router.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xl font-bold transition-colors ${
                    active ? "text-crimson-primary" : "text-[#851825] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Mobile 🍔 */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-primary"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      {isMobile && open && (
        <nav className="flex flex-col gap-2 border-t border-white/10 bg-black/95 px-4 py-4 text-lg font-semibold transition-all duration-300">
          {navLinks.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded px-3 py-3 hover:bg-white/10 ${
                  active ? "text-crimson-primary" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
