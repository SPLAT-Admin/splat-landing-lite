import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;
  return (
    <Html className="bg-background text-foreground">
      <Head>
        {/* Preload Oswald font for better performance */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700;800&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </noscript>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className="bg-background text-foreground min-h-screen">
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
