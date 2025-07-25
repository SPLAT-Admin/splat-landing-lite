// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date('2025-07-25T10:00:00-07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft('Founder Sale is live!');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>SPL@T – No Shame. Just SPL@T.</title>
        <meta name="description" content="Join the movement. SPL@T is the bold new hookup and cruising app for everyone." />
        <script
          defer
          data-domain="usesplat.com"
          src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible = window.plausible || function() {
              (window.plausible.q = window.plausible.q || []).push(arguments)
            }`,
          }}
        />
      </Head>

      <section className="text-center py-24 px-6 bg-black text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">SPL@T</h1>

        <section className="max-w-4xl mx-auto text-lg text-white space-y-6 mt-6">
          <p>
            <strong>SPL@T™</strong> is a bold, unapologetic platform for connection and community. Built with radical authenticity, it reimagines queer digital spaces with speed, safety, and intention. Designed for queer users who want something radically different. Built from the ground up, SPL@T delivers a sleek, edgy, and inclusive experience where authentic self-expression, safety, and affordability are not optional—they’re foundational.
          </p>
          <p>
            Our mission is to make meaningful queer connection accessible to everyone—without price gouging or financial gatekeeping. At just $4.99/month, SPL@T™ offers a compelling alternative to legacy platforms charging hundreds per year for outdated, bloated features.
          </p>
          <p>
            SPL@T™ puts privacy and security front and center. We implement robust user verifications, including bot prevention, Turnstile CAPTCHA, and photo checks, to keep every interaction real and safe. Every feature—from our immersive SP@T Map™ view to the community-powered SPL@T Live Lobby™—is crafted to honor radical sex-positivity and protect user identity.
          </p>
          <p>
            This isn’t just another dating app. SPL@T is a movement. We’re building a complete digital biosphere—a fiercely authentic SPL@Tverse™ where queer folks can cruise, connect, and thrive with zero shame and total control.
          </p>
        </section>

        <p className="text-xl md:text-2xl text-gray-300 mt-10 italic">
          No Shame. Just SPL@T.
        </p>
      </section>

      <section className="bg-[color:var(--deep-crimson)] text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">🔥 Founder Sale – Limited Time</h2>
        <p className="mb-2 text-lg">
          First 250 only:{' '}
          <strong>SPL@T Premium Lifetime Membership</strong> for just{' '}
          <span className="text-yellow-300 text-xl font-bold">$25</span>.
        </p>
        <p className="mb-2 text-sm">No renewals. No monthly charges. Ever.</p>
        <p className="mb-6 text-sm">
          After 250 are gone, price jumps to $50 until the 7-hour window ends.
        </p>
        <p className="font-semibold mb-4 text-lg">
          Live <strong>July 25 @ 10 a.m. MST</strong>
        </p>
        <div className="text-2xl font-mono font-bold mb-6">⏳ {timeLeft}</div>
        <Link
          href="/founder"
          className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition"
        >
          Join the Founder Sale
        </Link>
      </section>

      <section className="bg-black text-white py-20 px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[color:var(--deep-crimson)]">
          We’re almost live.
        </h3>
        <ul className="list-disc list-inside text-left max-w-xl mx-auto mb-8 text-gray-300">
          <li className="mb-2">Android build is nearly done</li>
          <li>Beta testing launches soon</li>
        </ul>
        <Link
          href="/contactus"
          className="inline-block underline text-lg hover:text-red-500"
        >
          Help fund SPL@T’s launch →
        </Link>
      </section>

      <footer className="text-center text-sm text-gray-400 bg-black py-12">
        <p>© 2025 SPLAT, LLC • usesplat.com</p>
        <p className="mt-2 max-w-xl mx-auto px-4">
          Want to sponsor a SP@T location or SPL@T LIVE event? Ask us about our upcoming sponsorship deck.
        </p>
      </footer>
    </>
  );
}
