import Head from "next/head";

const placements = [
  {
    title: "📱 SPL@T App",
    description:
      "Banner, featured, or native placements inside the app. Engage members where the sparks fly in real time.",
  },
  {
    title: "🗺️ SP@T Map",
    description:
      "Sponsor hotspots, pop-ups, or events on our live map. Geo-targeted reach with instant visibility.",
  },
  {
    title: "🎤 SPL@T Live Lobby",
    description:
      "Host branded takeovers, moderated rooms, or community showcases that drive live engagement.",
  },
  {
    title: "🏷️ SPL@T Handles & Codes",
    description:
      "Claim custom handles or drops to anchor your campaign and track the return with precision.",
  },
];

export default function AdvertisePage() {
  return (
    <>
      <Head>
        <title>Advertise in the SPL@TVerse | SPL@T</title>
        <meta
          name="description"
          content="Partner with SPL@T to reach the boldest queer audience. Explore placements across the SPL@TVerse."
        />
      </Head>

      <section className="bg-black text-white px-6 py-16">
        <div className="mx-auto max-w-6xl space-y-16">
          <header className="text-center space-y-4">
            <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
              Advertise in the SPL@TVerse
            </h1>
            <p className="text-[24pt] font-bold text-[#FFFFFF]">
              Put your brand in the only space built for the unapologetically queer, shameless, and ready-to-connect.
            </p>
            <p className="mx-auto max-w-3xl text-[18pt] leading-relaxed text-white/90">
              SPL@T placements span real-time geolocation, live rooms, IRL events, and creator collabs. We amplify the
              brands that champion community--no fluff, no filter.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {placements.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-800 bg-gray-900/80 p-8 text-left shadow-[0_25px_45px_rgba(0,0,0,0.35)] transition hover:border-[#851825] hover:shadow-[0_35px_65px_rgba(133,24,37,0.35)]"
              >
                <h2 className="text-[18pt] font-bold text-[#851825] mb-3">{item.title}</h2>
                <p className="text-[16pt] leading-relaxed text-white/90">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-10 text-center space-y-4">
            <h3 className="text-[24pt] font-extrabold text-[#FFFFFF]">
              Partnerships & Collabs
            </h3>
            <p className="text-[18pt] leading-relaxed text-white/90">
              We co-create drops, sponsor queer pop-ups, run hybrid live streams, and build custom campaigns. If it's bold,
              inclusive, and electric, we are down to make it real.
            </p>
            <p className="text-[16pt] text-white/70">
              Tell us your vision--sweepstakes, creator showcases, nightlife activations, digital takeovers--and we will map
              the strategy with you.
            </p>
          </div>

          <div className="text-center space-y-6">
            <p className="text-[18pt] text-white/90">Ready to get loud with SPL@T?</p>
            <a
              href="mailto:ads@usesplat.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#851825] px-12 py-4 text-[18pt] font-extrabold uppercase tracking-wide text-white shadow-[0_0_35px_rgba(133,24,37,0.45)] ring-2 ring-[#851825]/70 transition-all duration-200 hover:bg-[#6f1320] hover:shadow-[0_0_45px_rgba(133,24,37,0.6)] focus:outline-none focus-visible:ring-4"
            >
              📧 Contact ads@usesplat.com
            </a>
            <p className="text-sm text-white/60">
              Pitch us your idea, book a spot, or ask a question--we read every message.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
