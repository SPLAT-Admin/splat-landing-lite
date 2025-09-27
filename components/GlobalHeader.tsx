import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function GlobalHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background backdrop-blur-md border-b border-gray-800">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo on LEFT */}
        <Link href="/" className="flex items-center">
          <Image
            src="/splat-logo.png"
            alt="SPL@T"
            width={120}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8 text-base md:text-lg font-semibold uppercase tracking-wide text-foreground">
          {[
            ["Ambassador", "/ambassador"],
            ["Program", "/ambassador"],
            ["Merch", "/storefront"],
            ["Advertise", "/advertise"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="relative hover:text-deep-crimson transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-deep-crimson after:transition-all after:duration-200 hover:after:w-full"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-background border-t border-gray-800 px-6 py-4 space-y-6 text-lg font-semibold uppercase tracking-wide text-foreground">
          {[
            ["Ambassador", "/ambassador"],
            ["Program", "/ambassador"],
            ["Merch", "/storefront"],
            ["Advertise", "/advertise"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block hover:text-deep-crimson transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
