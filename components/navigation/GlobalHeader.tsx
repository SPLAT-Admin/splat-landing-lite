import Link from "next/link";
import Image from "next/image";

const leftLinks = [
  { label: "Ambassador Program", href: "/ambassador" },
  { label: "Merch", href: "/merch" },
];

const rightLinks = [
  { label: "Advertise", href: "/advertise" },
  { label: "Contact Us", href: "/contact" },
];

export default function GlobalHeader() {
  return (
    <header className="bg-jet-black text-acid-white border-b border-deep-crimson">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between py-4 px-6">
        <div className="flex gap-6 font-semibold text-lg">
          {leftLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="hover:text-deep-crimson transition-colors">
              {label}
            </Link>
          ))}
        </div>
        <Link href="/" className="flex-shrink-0" aria-label="SPL@T home">
          <Image src="/splat-logo.png" alt="SPL@T logo" width={320} height={320} priority />
        </Link>
        <div className="flex gap-6 font-semibold text-lg">
          {rightLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="hover:text-deep-crimson transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
