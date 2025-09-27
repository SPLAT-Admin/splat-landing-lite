import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function GlobalHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background text-foreground backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        
        {/* LEFT: LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/splat-logo.png"
            alt="SPL@T Logo"
            width={140}
            height={50}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center space-x-8 text-base md:text-lg font-semibold uppercase tracking-wide">
          {[
            { name: "Ambassador", href: "/ambassador" },
            { name: "Program", href: "/ambassador" },
            { name: "Merch", href: "/storefront" },
            { name: "Advertise", href: "/advertise" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-deep-crimson after:transition-all after:duration-200 hover:after:w-full focus:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className="lg:hidden text-foreground focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <nav className="lg:hidden flex flex-col items-center space-y-6 py-6 bg-background text-lg font-semibold uppercase tracking-wide">
          <Link href="/ambassador">Ambassador</Link>
          <Link href="/ambassador">Program</Link>
          <Link href="/storefront">Merch</Link>
          <Link href="/advertise">Advertise</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      )}
    </header>
  );
}
