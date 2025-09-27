import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        {siteKey ? (
          <script
            async
            defer
            src={`https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`}
            data-sitekey={siteKey}
          />
        ) : null}
        <NextScript />
      </body>
    </Html>
  );
}
