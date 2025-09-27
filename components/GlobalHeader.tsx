import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/ambassador", label: "Ambassador Program" },
  { href: "/storefront", label: "Merch" },
  { href: "/advertise", label: "Advertise" },
  { href: "/contact", label: "Contact" },
];

export default function GlobalHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (href: string) => {
    setOpen(false);
    void router.push(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href="/"
          className="text-4xl font-black uppercase tracking-tight text-[#db1d33] transition hover:opacity-90"
        >
          SPL@T
        </Link>
        <nav className="hidden items-center gap-10 text-sm font-semibold uppercase tracking-[0.25em] text-white lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#db1d33]">
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#db1d33] hover:text-[#db1d33] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
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
      {open ? (
        <nav className="border-t border-white/10 bg-black/95 px-6 pb-6 text-sm uppercase tracking-[0.3em] text-white lg:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavigate(link.href)}
                  className="w-full rounded-xl border border-white/10 bg-black/70 px-4 py-3 text-left font-semibold hover:border-[#db1d33] hover:text-[#db1d33]"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
