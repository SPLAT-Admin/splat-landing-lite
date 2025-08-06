import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-black text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo (Big but Balanced) */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="SPL@T Logo" 
            width={300} // Balanced size
            height={100}
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="flex space-x-12 text-xl font-semibold">
          <Link href="/founder" className="hover:text-[#851725] transition-colors duration-200">
            Founders Sale
          </Link>
          <Link href="/ambassador" className="hover:text-[#851725] transition-colors duration-200">
            Ambassador Program
          </Link>
          <Link href="/merch" className="hover:text-[#851725] transition-colors duration-200">
            Merch
          </Link>
          <Link href="/advertise" className="hover:text-[#851725] transition-colors duration-200">
            Advertise
          </Link>
        </nav>

      </div>
    </header>
  );
}