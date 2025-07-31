import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SPL@T</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col justify-between bg-[color:var(--deep-crimson)] text-white">
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>

        <footer className="text-center text-white py-6 bg-black border-t-2 border-[color:var(--deep-crimson)] shadow-[0_-1px_8px_rgba(139,0,0,0.5)]">
          <p className="mb-2 text-sm md:text-base">
            © 2025 SPLAT, LLC | 
            <a href="https://www.usesplat.com" 
               className="mx-1 hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
              www.usesplat.com
            </a> | 
            <a href="mailto:Support@usesplat.com" 
               className="mx-1 hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
              Support@usesplat.com
            </a>
          </p>
          
          <p className="mb-3 text-sm md:text-base">
            SPLAT, LLC | 971 S University Ave, Suite 1088 Provo, Utah 84601 | 
            <a href="tel:8444308333" 
               className="ml-1 hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
              844-430-8333
            </a>
          </p>
          
          <div className="flex justify-center flex-wrap gap-4 text-xs md:text-sm">
            <a href="/sitemap" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
              Site Map
            </a>
            <a href="/terms" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
              Terms of Service
            </a>
            <a href="/privacy" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/community-standards" className="hover:text-[color:var(--deep-crimson)] transition-colors duration-200">
              SPL@T Community Standards
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
