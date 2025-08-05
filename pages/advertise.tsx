import Head from 'next/head';

export default function AdvertisePage() {
  return (
    <>
      <Head>
        <title>Advertise in the SPL@TVerse | SPL@T</title>
        <meta name="description" content="Partner, sponsor, or advertise in the SPL@TVerse – SPL@T App, SPL@T Live Lobby, SP@T Map, SPL@T Handles, SPL@T Codes, and more. Bold, shameless, and built for connection." />
      </Head>

      <section className="bg-black text-white min-h-screen py-16 px-6 flex flex-col items-center">
        <div className="max-w-4xl w-full text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#851725] drop-shadow-lg">
            Advertise in the SPL@TVerse
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-4">
            Want to reach the boldest, fastest-growing LGBTQ+ audience online? Advertise, partner, or sponsor across the entire SPL@TVerse—where connection happens and your brand becomes part of the story.
          </p>
        </div>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 border border-red-900/10">
            <h2 className="text-xl font-bold text-red-400 mb-2">📱 SPL@T App</h2>
            <p className="text-white/80">Banner, featured, or native ads inside the SPL@T app. Engage users where the magic happens.</p>
          </div>
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 border border-red-900/10">
            <h2 className="text-xl font-bold text-red-400 mb-2">🗺️ SP@T Map</h2>
            <p className="text-white/80">Sponsor real locations, pop-ups, or events on our live map. Geo-targeted reach, real-world impact.</p>
          </div>
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 border border-red-900/10">
            <h2 className="text-xl font-bold text-red-400 mb-2">🎤 SPL@T Live Lobby</h2>
            <p className="text-white/80">Sponsor chat lobbies, host branded takeovers, or create live experiences with our community.</p>
          </div>
          <div className="bg-white/5 rounded-2xl shadow-lg p-7 border border-red-900/10">
            <h2 className="text-xl font-bold text-red-400 mb-2">🏷️ SPL@T Handles & Codes</h2>
            <p className="text-white/80">Get your brand, creator, or event a custom SPL@T handle or code—drive direct engagement and boost campaigns.</p>
          </div>
        </div>

        <div className="max-w-3xl text-center mb-16">
          <h3 className="text-2xl font-extrabold text-yellow-400 mb-3">Partnerships & Collabs</h3>
          <p className="text-white/80">
            We don’t just sell ads—we co-create. Launch pop-up campaigns, co-host live SPL@T events, sponsor community contests, or bring us your wildest idea. If you want to reach and celebrate LGBTQ+ energy, you belong in the SPL@TVerse.
          </p>
        </div>

        <div className="max-w-xl text-center">
          <p className="text-lg text-white/80 mb-4">Ready to get started?</p>
          <a href="mailto:ads@usesplat.com" className="inline-flex items-center justify-center gap-2 bg-[#851725] hover:bg-red-700 text-white text-xl font-bold rounded-full py-4 px-8 shadow-lg transition-all">
            📧 Contact ads@usesplat.com
          </a>
          <p className="text-sm text-white/60 mt-3">
            Pitch us your idea, book a spot, or just ask a question—we read every message.
          </p>
        </div>
      </section>
    </>
  );
}
