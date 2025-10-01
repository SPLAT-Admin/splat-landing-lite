import Head from "next/head";

const placements = [
  {
    title: "📱 SPL@T App",
    description:
      "Banner, featured, or native placements inside the app. Engage members where the sparks fly in real time.",
  },
  {
    title: "🗺️ SP@T Map-Live",
    description:
      "Sponsor hotspots, pop-ups, or events on our live map. Geo-targeted reach with instant visibility.",
  },
  {
    title: "🎤 SPL@T Live Lobby",
    description:
      "Host branded takeovers, moderated rooms, or community showcases that drive live engagement.",
  },
  {
    title: "🏷️ SPL@T Handles & SPL@T Codes",
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

      <section className="bg-jet-black text-acid-white px-6 py-20">
        <div className="mx-auto max-w-6xl space-y-16">
          {/* Consistent Title + Subtitle */}
          <header className="text-center space-y-6">
            <h1 className="text-[44pt] font-extrabold tracking-tight text-deep-crimson drop-shadow-lg">
              Advertise in the SPL@TVerse
            </h1>
            <p className="text-[22pt] font-bold text-acid-white">
              Put your brand in the only space built for the unapologetically queer, shameless, and ready-to-connect.
            </p>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-acid-white/90">
              SPL@T placements span real-time geolocation, live rooms, IRL events, and creator collabs. We amplify the
              brands that champion community — no fluff, no filter.
            </p>
          </header>

          {/* Placement Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {placements.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-800 bg-gray-900/80 p-8 text-left shadow-[0_25px_45px_rgba(0,0,0,0.35)] transition hover:border-deep-crimson hover:shadow-[0_35px_65px_rgba(133,16,37,0.35)]"
              >
                <h2 className="text-[20pt] font-bold text-deep-crimson mb-3">{item.title}</h2>
                <p className="text-lg leading-relaxed text-acid-white/90">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Partnerships Block */}
          <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-10 text-center space-y-4 shadow-[0_25px_45px_rgba(0,0,0,0.35)]">
            <h3 className="text-[28pt] font-extrabold text-acid-white">
              Partnerships & Collabs
            </h3>
            <p className="text-lg leading-relaxed text-acid-white/90 max-w-4xl mx-auto">
              We co-create drops, sponsor queer pop-ups, run hybrid live streams, and build custom campaigns. If it's bold,
              inclusive, and electric, we are down to make it real.
            </p>
            <p className="text-base text-acid-white/70 max-w-2xl mx-auto">
              Tell us your vision — sweepstakes, creator showcases, nightlife activations, digital takeovers — and we will map
              the strategy with you.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="text-center space-y-6">
            <p className="text-lg text-acid-white/90">Ready to get loud with SPL@T?</p>
            <a
              href="mailto:ads@usesplat.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-deep-crimson px-12 py-4 text-lg font-extrabold uppercase tracking-wide text-white shadow-[0_0_35px_rgba(133,16,37,0.45)] ring-2 ring-deep-crimson/70 transition-all duration-200 hover:bg-[#6f1320] hover:shadow-[0_0_45px_rgba(133,16,37,0.6)] focus:outline-none focus-visible:ring-4"
            >
              📧 Contact ads@usesplat.com
            </a>
            <p className="text-sm text-acid-white/60">
              Pitch us your idea, book a spot, or ask a question — we read every message.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
