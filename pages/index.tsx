import Head from 'next/head';
import HeroFlashSale from '@/components/HeroFlashSale';
import JoinWaitlistForm from '@/components/JoinWaitlistForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>SPL@T – Community Discovery App</title>
        <meta name="description" content="Join the movement. SPL@T is a bold new social networking experience for local connection and community discovery." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-white bg-black px-6 py-24 min-h-screen">
        <HeroFlashSale />

        <section className="text-center max-w-4xl mx-auto bg-[color:var(--deep-crimson)] p-10 rounded-xl shadow-lg">
          <h1 className="text-5xl font-bold mb-4 text-white">SPL@T</h1>
          <p className="text-xl mb-6 text-gray-100">
            Where bold connection meets discovery. Join now for early access to our mobile‑first social networking experience.
          </p>

          {/* Embedded Waitlist Form */}
          <div className="max-w-md mx-auto mt-6">
            <JoinWaitlistForm />
          </div>

          <div className="mt-10 text-left max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-white">What's Included</h2>
            <ul className="list-disc list-inside text-lg text-white">
              <li>Personalized discovery filters</li>
              <li>Private messaging & profile customization</li>
              <li>Map-based user exploration</li>
              <li>Enhanced privacy & blocking tools</li>
            </ul>

            <h2 className="text-3xl font-bold mt-10 text-white">Pricing</h2>
            <p className="text-lg text-white">
              SPL@T Premium is just <strong>$4.99/month</strong>. Secure Stripe billing, cancel anytime.
            </p>
          </div>
        </section>

        <section className="mt-16 max-w-3xl mx-auto text-lg">
          <h2 className="text-3xl font-bold mb-4">Support</h2>
          <p>Email us at <a href="mailto:support@usesplat.com" className="underline text-red-400">support@usesplat.com</a></p>

          <h2 className="mt-10 text-3xl font-bold mb-4">Legal</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><a href="#" className="underline">Privacy Policy</a></li>
            <li><a href="#" className="underline">Terms of Use</a></li>
            <li><a href="#" className="underline">Refund Policy</a></li>
          </ul>

          <h2 className="mt-10 text-3xl font-bold mb-4">Security</h2>
          <p>Payments processed via Stripe, PCI‑compliant, and we never store card data.</p>

          <h2 className="mt-10 text-3xl font-bold mb-4">FAQ</h2>
          <div className="space-y-4">
            <p><strong>What is SPL@T?</strong><br/>A community discovery app to connect and explore locally.</p>
            <p><strong>When am I charged?</strong><br/>Billing occurs at checkout, recurring monthly.</p>
            <p><strong>How do I cancel?</strong><br/>Log in and manage your subscription via settings anytime.</p>
          </div>
        </section>

        <section className="text-center mt-16 italic text-gray-300 text-lg">
          No Shame. Just SPL@T.
        </section>

<footer className="text-center text-sm text-gray-400 mt-24 space-y-1">
  <p>© 2025 SPLAT, LLC • usesplat.com</p>
  <p>971 S University Ave, Suite 1088‑84601, Provo, Utah</p>
  <p>Toll-Free: 844‑420‑8333</p>
</footer>
      </main>
    </>
  );
}
