import Link from "next/link";
import Head from "next/head";

export default function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>{title} | SPL@T</title>
        <meta name="description" content={`${title} for SPL@T`} />
      </Head>

      {/* Header */}
      <header className="bg-[color:var(--deep-crimson)] py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">{title}</h1>
      </header>

      {/* Content */}
      <main role="main" className="max-w-3xl mx-auto p-6 text-sm md:text-base leading-relaxed">
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
          {children}
        </div>
      </main>

      {/* Footer with Legal Links */}
      <footer className="text-center text-xs py-4 text-gray-400 space-x-4">
        <Link href="/" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
          Home
        </Link>
        <Link href="/privacy" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
          Terms of Service
        </Link>
        <Link href="/community" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
          Community Standards
        </Link>
      </footer>
    </div>
  );
}
