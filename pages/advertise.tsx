import Head from 'next/head';

export default function AdvertisePage() {
  return (
    <>
      <Head>
        <title>Advertise in the SPL@TVerse | SPL@T</title>
        <meta
          name="description"
          content="Partner, sponsor, or advertise in the SPL@TVerse – SPL@T App, SPL@T Live Lobby, SP@T Map, SPL@T Handles, SPL@T Codes, and more. Bold, shameless, and built for connection."
        />
      </Head>

      <section className="bg-black text-white min-h-screen py-20 px-6 flex flex-col items-center">
        <div className="max-w-5xl text-center mb-16">
          <h1 className="text-[72pt] font-extrabold text-crimson drop-shadow-lg mb-6">Advertise in the SPL@TVerse</h1>
          <p className="text-[20pt] text-gray-300">
            Want to reach the boldest, fastest-growing LGBTQ+ audience online? SPL@T advertising puts your brand where it
            belongs—center stage in a space that’s shameless, sexy, and all about real-time connection.
          </p>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            {
              title: '📱 SPL@T App',
              description:
                'Banner, featured, or native ads inside the SPL@T app. Engage users where the magic happens.',
            },
            {
              title: '🗺️ SP@T Map',
              description:
                'Sponsor real locations, pop-ups, or events on our live map. Geo-targeted reach, real-world impact.',
            },
            {
              title: '🎤 SPL@T Live Lobby',
              description:
                'Sponsor chat lobbies, host branded takeovers, or create live experiences with our community.',
            },
            {
              title: '🏷️ SPL@T Handles & Codes',
              description:
                'Get your brand, creator, or event a custom SPL@T handle or code—drive direct engagement and boost campaigns.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-900/80 rounded-2xl p-8 border border-gray-700 shadow-md hover:shadow-xl transition"
            >
              <h2 className="text-xl font-bold text-red-400 mb-3">{item.title}</h2>
              <p className="text-[15pt] text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl text-center mb-20">
          <h3 className="text-[22pt] font-extrabold text-yellow-400 mb-3">Partnerships & Collabs</h3>
          <p className="text-[16pt] text-gray-300">
            We don’t just sell ads—we co-create. Launch pop-up campaigns, co-host SPL@T Live events, sponsor contests,
            or pitch something wild. If it’s queer, bold, and electric—we’re down.
          </p>
        </div>

        <div className="max-w-xl text-center">
          <p className="text-[18pt] text-white/90 mb-5">Ready to get started?</p>
          <a
            href="mailto:ads@usesplat.com"
            className="inline-flex items-center justify-center gap-2 bg-crimson hover:bg-red-700 text-white text-[16pt] font-bold rounded-full py-4 px-10 shadow-md hover:shadow-lg transition-all"
          >
            📧 Contact ads@usesplat.com
          </a>
          <p className="text-sm text-white/60 mt-4">
            Pitch us your idea, book a spot, or ask a question—we read every message.
          </p>
        </div>
      </section>
    </>
  );
}
