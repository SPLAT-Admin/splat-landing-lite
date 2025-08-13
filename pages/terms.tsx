// pages/terms.tsx
import Head from "next/head";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service — SPL@T</title>
        <meta name="description" content="SPL@T Terms of Service" />
      </Head>

      <main className="mx-auto max-w-3xl px-6 py-16 text-gray-200">
        <h1 className="text-3xl font-bold text-red-400">Terms of Service</h1>
        <p className="mt-4">
          Welcome to SPL@T. By using the Service, you agree to these Terms of Service
          (the &quot;Terms&quot;). If you do not agree to the Terms, you may not use the Service.
        </p>

        <h2 className="mt-10 text-2xl font-semibold text-white">1. Eligibility</h2>
        <p className="mt-2">
          You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Service.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-white">2. Your Account</h2>
        <p className="mt-2">
          You are responsible for maintaining the confidentiality of your account credentials and for all activities
          that occur under your account.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-white">3. Acceptable Use</h2>
        <p className="mt-2">
          You agree not to use the Service for any unlawful purpose or in violation of our
          <a href="/community-standards" className="ml-1 underline hover:text-red-400">Community Standards</a>.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-white">4. Intellectual Property</h2>
        <p className="mt-2">
          The SPL@T name, logos, and related marks are our property. You may not use them without prior written consent.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-white">5. Disclaimers</h2>
        <p className="mt-2">
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-white">6. Contact</h2>
        <p className="mt-2">
          Questions about these Terms? Email us at <a className="underline" href="mailto:ops@fundsplat.com">ops@fundsplat.com</a>.
        </p>
      </main>
    </>
  );
}
