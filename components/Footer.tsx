import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 text-[10pt] py-4 px-6 border-t border-gray-800">
      <div className="flex flex-col items-center space-y-2 text-center sm:space-y-1">
        <div className="whitespace-pre">
          © <time dateTime="2025">2025</time> - SPL@T | <a href="https://www.fundsplat.com" target="_blank" rel="noopener noreferrer" className="hover:underline">www.fundsplat.com</a> | <a href="tel:8444208333" className="hover:underline">844-420-8333</a>
        </div>
        <div className="whitespace-pre">
          971 S University Avenue Suite 1088 Provo, Utah 84601
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-1">
          <Link href="/sitemap" aria-label="Site Map" className="font-bold hover:underline">Site Map</Link>
          <Link href="/privacy" aria-label="Privacy Policy" className="font-bold hover:underline">Privacy Policy</Link>
          <Link href="/terms" aria-label="Terms of Service" className="font-bold hover:underline">Terms of Service</Link>
          <Link href="/community" aria-label="SPL@T Community Standards" className="font-bold hover:underline">SPL@T Community Standards</Link>
        </div>
      </div>
    </footer>
  );
}
