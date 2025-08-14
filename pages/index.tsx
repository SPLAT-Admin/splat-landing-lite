import Head from "next/head";
import Link from "next/link";
import Section from "../components/Section";
import FeatureGrid from "../components/FeatureGrid";
import Timeline from "../components/Timeline";

export default function Home() {
  const features = [
    { title: "SPL@T Live Map", description: "See users live... cruising in real time, by location." },
    { title: "SPL@T Live Lobby", description: "Hang out, chat, and preview nearby action." },
    { title: "SPL@T Codes", description: "Share one‑time hook‑up codes that disappear after use." },
    { title: "SPL@T Handles", description: "Public username to connect fast & stay anonymous." },
    { title: "SPL@T Chat", description: "Real-time chat with nearby or new connections." },
    { title: "SPL@T Events", description: "Community-led events, meetups and collabs." },
    { title: "SPL@T Map Hotspots", description: "Spot the hottest cruising zones in real time." },
    { title: "Premium", description: "Priority placement, more photos, Stealth Mode, Teleport Unlock, host private rooms & more." },
  ];

  const timeline = [
    { date: "Aug 2025", event: "Launch Landing Site – www.usesplat.com (Completed), Ambassador Program Live, Early Life‑Time Founder Memberships offered ($25, Completed)" },
    { date: "Sept 2025", event: "Dev continues – SPL@T Map Live, Messaging, Profiles, Filters" },
    { date: "Oct 2025", event: "SPL@T Live Lobby, Beta Program Launch" },
    { date: "Nov 2025", event: "SPL@T Public Launch (Prod‑Ready)" },
  ];

  return (
    <>
      <main className="bg-black text-white">
        {/* Hero */}
        <section className="relative flex min-h-[80vh] flex-col items-start justify-start pt-10 px-4 text-center">
          <h1 className="text-[72pt] font-extrabold tracking-tight">WELCOME TO SPL@T!</h1>
          <p className="mt-2 max-w-3xl text-[26pt] text-gray-300">
            Your back‑door pass to the SPL@TVerse — a real‑time digital cruising ground for connection without shame.
          </p>

          {/* CTA */}
          <Link href="/signup" className="mt-6 inline-block rounded-full bg-red-600 px-10 py-5 text-[16pt] font-bold text-white shadow-lg ring-2 ring-red-500/60 hover:bg-red-700 focus:outline-none focus-visible:ring-4 animate-pulse">
            Join The Waitlist
          </Link>

          {/* Bulletin */}
          <div className="mt-10 max-w-4xl px-6 py-6 bg-gray-800/80 rounded-xl text-[18pt] leading-snug shadow-md">
            <p className="font-semibold text-acid-white">
              The SPL@T app — coming soon to iOS and Android — is in development and nearing completion. Beta testing is on the horizon, and it’s gonna be 🔥. Join our waitlist for the latest updates.
            </p>
            <p className="mt-4 font-semibold text-acid-white">
              Our SPL@T Ambassador Program is live! Apply via the link above. We’re seeking ambassadors across all 50 states—if you’re a promoter, influencer, event planner, or just bold as hell, help us SPL@T the word.
            </p>
          </div>
        </section>

        <Section id="who-we-are" className="px-4 py-16" title="Who We Are">
          <p className="max-w-4xl text-[16pt]">
            SPL@T is a queer‑built, unapologetic, bold and sexy real‑time community-based event & meetup platform designed to create authentic connections without shame. Built by and for the LGBTQ+ community, we're throwing out outdated systems—and building something secure, authentic, private, bold, sexy, and a little sassy.
          </p>
        </Section>

        <Section id="what-we-offer" className="bg-gray-900 px-4 py-16" title="What We’re Offering">
          <p className="max-w-4xl text-[16pt]">
            We’re creating a real‑time digital biosphere—the SPL@TVerse—featuring the SPL@T app, including SPL@T Map Live‑View, SPL@T Chat, SPL@T Live Lobby, SPL@T Codes, SPL@T Handles, exclusive merch shop, SPL@T Events & Collabs, SPL@T Map HotSpots, and more. Whether you want to meet now or just vibe online, SPL@T gives you options, visibility, and control.
          </p>
        </Section>

        <Section id="features" className="px-4 py-16" title="Features">
          <FeatureGrid features={features} />
        </Section>

        <Section id="roadmap" className="bg-gray-900 px-4 py-16" title="Roadmap">
          <Timeline items={timeline} />
        </Section>
      </main>
    </>
  );
}
