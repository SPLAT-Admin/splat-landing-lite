// pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import withSplatBoundary from "./_splat-sentry-boundary";
import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SPL@T – Backstage Pass to the SPL@TVerse</title>
        <meta
          name="description"
          content="SPL@T is your gateway to the SPL@TVerse – maps, events, ambassadors, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#851725" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-background text-foreground min-h-screen flex flex-col">
        {/* Skip Navigation Link for Screen Readers */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        
        <GlobalHeader />
        <main
          id="main-content"
          className="flex-grow"
          role="main"
          aria-label="Main content"
          style={{
            paddingInline: "clamp(24px, 8vw, 96px)",
          }}
        >
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default withSplatBoundary(MyApp);
