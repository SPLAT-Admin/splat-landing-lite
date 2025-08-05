export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[color:var(--deep-crimson)] py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold">{title}</h1>
      </header>
      <main className="max-w-3xl mx-auto p-6 text-sm md:text-base leading-relaxed">
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
          {children}
        </div>
      </main>
      <footer className="text-center text-xs py-4 text-gray-400">
        <Link href="/" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}
