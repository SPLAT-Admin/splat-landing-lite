import Link from "next/link";
import { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        {children}
      </main>
      <footer className="text-center text-xs py-4 text-gray-400">
        <Link href="/" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}
