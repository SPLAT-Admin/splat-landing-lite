import Link from "next/link";
import Head from "next/head";
import { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Head>
        <title>{title} | SPL@T</title>
        <meta name="description" content={`${title} for SPL@T`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      {/* Header */}
      <header className="bg-crimson-primary py-6 text-center shadow-md">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          {title}
        </h1>
      </header>

      {/* Main Legal Body */}
      <main
        role="main"
        className="flex-1 max-w-3xl mx-auto px-4 py-10 text-sm md:text-base leading-relaxed"
      >
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg border border-gray-800">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs py-6 text-gray-400 border-t border-gray-800 flex flex-wrap justify-center gap-6">
        <Link
          href="/"
          className="hover:text-crimson-hover transition-colors duration-200 font-medium"
        >
          Home
        </Link>
        <Link
          href="/privacy"
          className="hover:text-crimson-hover transition-colors duration-200 font-medium"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="hover:text-crimson-hover transition-colors duration-200 font-medium"
        >
          Terms of Service
        </Link>
        <Link
          href="/community"
          className="hover:text-crimson-hover transition-colors duration-200 font-medium"
        >
          Community Standards
        </Link>
      </footer>
    </div>
  );
}
