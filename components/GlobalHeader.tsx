/* components/GlobalHeader.tsx - SPL@T styled global navigation */
import Link from "next/link";

export default function GlobalHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* SPL@T Logo */}
        <Link href="/" className="text-3xl font-extrabold text-[#851825] tracking-tight hover:opacity-90 transition">
          SPL@T
        </Link>
        {/* Nav Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-[0.2em] text-white">
          <Link href="/ambassador" className="hover:text-[#851825]">Ambassador Program</Link>
          <Link href="/storefront" className="hover:text-[#851825]">Storefront</Link>
          <Link href="/merch" className="hover:text-[#851825]">Merch</Link>
          <Link href="/advertise" className="hover:text-[#851825]">Advertise</Link>
          <Link href="/contact" className="hover:text-[#851825]">Contact</Link>
          {/* Optional Sign-in (for future order tracking/admin) */}
          <Link href="/login" className="hover:text-[#851825]">Sign In</Link>
        </nav>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 p-2 hover:opacity-80"
          aria-label="Open Menu"
        >
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
        </button>
      </div>
    </header>
  );
}
