import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>{/* Turnstile script loads via @marsidev/react-turnstile */}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
