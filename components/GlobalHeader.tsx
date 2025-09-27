/* SPL@T nav bar */
import Link from "next/link";

export default function GlobalHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        <Link
          href="/"
          className="text-4xl font-extrabold tracking-tight text-[#851825] transition hover:opacity-90"
        >
          SPL@T
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.25em] text-white md:flex">
          <Link href="/ambassador" className="hover:text-[#851825]">
            Ambassador Program
          </Link>
          <Link href="/storefront" className="hover:text-[#851825]">
            Merch
          </Link>
          <Link href="/advertise" className="hover:text-[#851825]">
            Advertise
          </Link>
          <Link href="/contact" className="hover:text-[#851825]">
            Contact
          </Link>
        </nav>
        <button
          type="button"
          className="md:hidden flex flex-col gap-1 p-2 text-white hover:opacity-80"
          aria-label="Open Menu"
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="block h-0.5 w-6 bg-current" />
          <span className="block h-0.5 w-6 bg-current" />
        </button>
      </div>
    </header>
  );
}
