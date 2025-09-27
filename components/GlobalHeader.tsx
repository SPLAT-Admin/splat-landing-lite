import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const links = [
  { href: "/ambassador", label: "Ambassador" },
  { href: "/ambassador", label: "Program" },
  { href: "/storefront", label: "Merch" },
  { href: "/advertise", label: "Advertise" },
  { href: "/contact", label: "Contact" },
];

export default function GlobalHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleNavigate = (href: string) => {
    setOpen(false);
    void router.push(href);
  };

  // Focus trapping for mobile menu
  useEffect(() => {
    if (open) {
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
          menuButtonRef.current?.focus();
        }
        
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  return (
    <header 
      className="sticky top-0 z-50 border-b border-white/10 bg-background backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href="/"
          className="transition-all duration-200 hover:scale-105 focus:scale-105"
          aria-label="SPL@T - Go to homepage"
        >
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={120}
            height={40}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>
        
        <nav 
          className="hidden items-center space-x-8 text-base md:text-lg font-semibold uppercase tracking-wide text-foreground lg:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="relative transition-all duration-200 hover:text-deep-crimson focus:text-deep-crimson after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-deep-crimson after:transition-all after:duration-200 hover:after:w-full focus:after:w-full"
              aria-label={`Navigate to ${link.label}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-acid-white transition-all duration-200 hover:border-deep-crimson hover:text-deep-crimson hover:bg-deep-crimson/10 focus:border-deep-crimson focus:text-deep-crimson focus:bg-deep-crimson/10 lg:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open ? "true" : "false"}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            )}
          </svg>
        </button>
      </div>
      
      {open && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="border-t border-white/10 bg-background backdrop-blur-md px-6 pb-6 text-sm uppercase tracking-[0.3em] text-foreground lg:hidden focus-trap"
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <ul className="flex flex-col space-y-6 pt-4" role="list">
            {links.map((link, index) => (
              <li key={link.href} role="listitem">
                <button
                  type="button"
                  onClick={() => handleNavigate(link.href)}
                  className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-left font-semibold transition-all duration-200 hover:border-deep-crimson hover:text-deep-crimson hover:bg-deep-crimson/5 focus:border-deep-crimson focus:text-deep-crimson focus:bg-deep-crimson/5"
                  aria-label={`Navigate to ${link.label}`}
                  tabIndex={0}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
