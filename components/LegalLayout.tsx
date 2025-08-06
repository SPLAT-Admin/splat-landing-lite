import Link from "next/link";
import Head from "next/head";
import { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Head>
        <title>{title} | SPL@T</title>
        <meta name="description" content={`${title} for SPL@T`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <html lang="en" />
      </Head>

      {/* Header */}
      <header className="bg-deep-crimson py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">{title}</h1>
      </header>

      {/* Content */}
      <main
        role="main"
        className="flex-1 max-w-3xl mx-auto p-6 text-sm md:text-base leading-relaxed"
      >
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs py-4 text-gray-400 border-t border-gray-800 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="hover:text-deep-crimson transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/privacy"
          className="hover:text-deep-crimson transition-colors duration-200"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="hover:text-deep-crimson transition-colors duration-200"
        >
          Terms of Service
        </Link>
        <Link
          href="/community"
          className="hover:text-deep-crimson transition-colors duration-200"
        >
          Community Standards
        </Link>
      </footer>
    </div>
  );
}
