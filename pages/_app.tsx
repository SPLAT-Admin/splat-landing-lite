// pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import withSplatBoundary from "./_splat-sentry-boundary";
import Header from "@/components/Header";
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col bg-black text-white">
        <Header />
        <main className="flex-grow main-content">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default withSplatBoundary(MyApp);
