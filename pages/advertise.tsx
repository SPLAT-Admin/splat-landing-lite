// pages/advertise.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function AdvertisePage() {
  return (
    <>
      <Head>
        <title>Advertise with SPL@T | The Future is Queer</title>
        <meta
          name="description"
          content="Partner with SPL@T to reach a bold, unapologetic, and hyper-engaged queer audience through immersive digital spaces and real-world activations."
        />
      </Head>

      <section className="bg-black text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[color:var(--deep-crimson)]">
            Partner with the SPL@Tverse
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
            SPL@T is more than an app—it's a movement. A digital cruising ground, a chaotic queer galaxy of connection, expression, and exploration. We're looking for brands, creators, venues, artists, and disruptors who want to go deeper.
          </p>

          <div className="grid gap-6 md:grid-cols-2 text-left text-gray-200 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-2">🌐 SPL@T Core</h2>
              <p className="text-sm">
                Bold hookup UX, vibrant profile tiles, and real-time SP@T Map integration. Prime real estate for ads, shout-outs, or branded drops.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">🎤 SPL@T LIVE Lobby</h2>
              <p className="text-sm">
                Digital events. IRL sex-positive shows. Club takeovers. Sponsored livestreams. Our lobby is your stage.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">💬 SPL@T Chat + Handles</h2>
              <p className="text-sm">
                Custom stickers, branded reactions, limited-edition Handles, and unlockable chat codes. Get seen in the scroll.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">🗺️ SP@T Map Zones</h2>
              <p className="text-sm">
                Sponsor high-traffic cruising areas, festivals, Pride routes, or digital zaps. Geo-targeted brand activation at its sexiest.
              </p>
            </div>
          </div>

          <p className="text-lg mb-8">
            If you’ve got a wild idea, we’re probably already into it.
          </p>

          <a
            href="mailto:ads@usesplat.com"
            className="inline-block bg-[color:var(--deep-crimson)] hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition"
          >
            Let’s Collab → ads@usesplat.com
          </a>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 bg-black py-10">
        <p>© 2025 SPLAT, LLC • usesplat.com</p>
      </footer>
    </>
  );
}
