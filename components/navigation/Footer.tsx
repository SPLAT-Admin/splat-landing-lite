import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-jet-black text-acid-white border-t border-deep-crimson py-8 text-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 text-center">
        <p>
          © 2025 - SPL@T |{' '}
          <a href="https://www.fundsplat.com" className="underline" rel="noreferrer" target="_blank">
            www.fundsplat.com
          </a>{' '}
          | 844-420-8333
        </p>
        <p>971 S University Avenue Suite 1088 Provo, Utah 84601</p>
        <div className="flex flex-wrap justify-center gap-6 underline">
          <Link href="/sitemap">Site Map</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/community">SPL@T Community Standards</Link>
        </div>
      </div>
    </footer>
  );
}
