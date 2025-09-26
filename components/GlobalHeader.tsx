import Link from 'next/link';

export default function GlobalHeader() {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-[#851825]">
            SPL@T
          </Link>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest">
          <Link href="/ambassador" className="hover:text-[#851825]">Ambassador Program</Link>
          <Link href="/storefront" className="hover:text-[#851825]">Storefront</Link>
          <Link href="/advertise" className="hover:text-[#851825]">Advertise</Link>
          <Link href="/contact" className="hover:text-[#851825]">Contact</Link>
          <Link href="/login" className="hover:text-[#851825]">Sign In</Link>
        </nav>
      </div>
    </header>
  );
}
