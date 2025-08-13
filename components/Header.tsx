// components/Header.tsx (Exact match to live site with correct links, spacing, logo)
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/ambassador", label: "Ambassador Program" },
    { href: "/merch", label: "Merch (Coming Soon)" },
    { href: "/advertise", label: "Advertise" },
    { href: "/contact", label: "Contact" },
    { href: "/signup", label: "Join Waitlist" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 md:px-6">
        {/* Logo */}
        <Link href="/" aria-label="SPL@T home" className="flex items-center">
  <Image
    src="/splat-logo.png"
    alt="SPL@T Logo"
    width={160}
    height={40}
    priority
    className="h-10 w-auto object-contain"
  />
</Link>


        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-[0.5in] text-[18px] font-medium whitespace-pre">
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
      </div>
    </header>
  );
}
