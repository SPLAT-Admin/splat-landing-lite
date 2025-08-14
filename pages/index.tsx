import Head from "next/head";
import Link from "next/link";
import Section from "../components/Section";
import FeatureGrid from "../components/FeatureGrid";
import Timeline from "../components/Timeline";

export default function Home() {
  const features = [
    { title: "SP@T Live Map",    description: "See users live, cruising in real time, by location." },
    { title: "Live Lobby",       description: "Hang out, chat and preview nearby action." },
    { title: "SP@T Codes",       description: "Share one‑time hook‑up codes that disappear after use." },
    { title: "SP@T Handles",     description: "Choose a public username to connect fast and stay anonymous." },
    { title: "Stealth Mode",     description: "Browse privately when you need it." },
    { title: "Teleport Unlock",  description: "Drop into any city before you land there." },
  ];

  const timeline = [
    { date: "Aug 2025",  event: "Landing site + Stripe launch" },
    { date: "Sept 2025", event: "SP@T Map + Live Lobby beta" },
    { date: "Oct 2025",  event: "Messaging, profiles, filters" },
    { date: "Nov 2025",  event: "Public launch" },
  ];

  return (
    <>
      <main className="bg-black text-white">
        {/* Hero */}
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-10 text-center">
          <h1 className="text-[48pt] sm:text-[60pt] md:text-[72pt] font-extrabold tracking-tight">
            WELCOME TO SPL@T!
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-2xl text-gray-300">
            Your back‑door pass to the SPL@TVerse — a real‑time digital cruising ground for connection without shame.
          </p>

          {/* CTA BUBBLE BUTTON */}
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-full bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg ring-2 ring-red-500/60 hover:bg-red-700 focus:outline-none focus-visible:ring-4 animate-pulse"
          >
            Join the Waitlist
          </Link>

          {/* Bulletin */}
          <div className="mt-12 max-w-4xl px-6 py-6 bg-gray-800/80 rounded-xl text-[20pt] leading-snug shadow-md">
            <p className="font-semibold text-acid-white">
              \\ The SPL@T app — available soon on iOS through the Apple App Store and Android via the Google Play Store — is currently in development and nearing build completion. We anticipate beta testing to launch very soon, and it’s going to be hot! 🔥 Be sure to join our waitlist for the most up-to-date info.  
              <br /><br />
              Our SPL@T Ambassador Program is now live! Apply via the Ambassador Program link above. We're currently seeking SPL@T Ambassadors in all 50 states. If you’re a social media influencer, nightlife promoter, event planner, or just love repping bold queer tech, come SPL@T the word. Let’s build this movement together. //
            </p>
          </div>
        </section>

        {/* Rest of page stays untouched, just stacked below */}
        <Section id="who-we-are" className="px-4 py-16 md:px-8 lg:px-16" title="Who We Are">
          <p className="max-w-4xl text-[16pt]">
            SPL@T is a queer‑built, unapologetic hookup and cruising platform designed for connection without shame.
            Built by and for the community, we’re throwing out outdated systems and building something sexy, fast, and free.
          </p>
        </Section>

        <Section id="what-we-offer" className="bg-gray-900 px-4 py-16 md:px-8 lg:px-16" title="What We’re Offering">
          <p className="max-w-4xl text-[16pt]">
            We’re creating a real‑time digital cruising ground — featuring the SPL@T Map, Live Lobby, SP@T Codes, Handles and more.
            Whether you want to meet now or just vibe online, SPL@T gives you options, visibility, and control.
          </p>
        </Section>

        <Section id="features" className="px-4 py-16 md:px-8 lg:px-16" title="Features">
          <FeatureGrid features={features} />
        </Section>

        <Section id="roadmap" className="bg-gray-900 px-4 py-16 md:px-8 lg:px-16" title="Roadmap">
          <Timeline items={timeline} />
        </Section>
      </main>
    </>
  );
}
