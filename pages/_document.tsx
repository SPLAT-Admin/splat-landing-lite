import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <script
          async
          defer
          src={`https://challenges.cloudflare.com/turnstile/v0/api.js?render=${process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY ?? "explicit"}`}
        />
        <NextScript />
      </body>
    </Html>
  );
}
