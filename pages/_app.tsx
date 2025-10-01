// pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import withSplatBoundary from "./_splat-sentry-boundary";
import GlobalLayout from "@/components/layouts/GlobalLayout";
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

      <GlobalLayout>
        <div className="bg-jet-black text-acid-white min-h-screen">
          <Component {...pageProps} />
        </div>
      </GlobalLayout>
    </>
  );
}

export default withSplatBoundary(MyApp);
