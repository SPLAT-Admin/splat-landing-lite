import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SPL@T – Backstage Pass to the SPL@TVerse</title>
        <meta
          name="description"
          content="SPL@T is your gateway to the SPL@TVerse – maps, events, ambassadors, and more. Join the movement."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
          async
          defer
        ></script>
      </Head>

      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
