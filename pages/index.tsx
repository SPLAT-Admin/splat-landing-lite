import Head from "next/head";
import Link from "next/link";
import Section from "../components/Section";
import FeatureGrid from "../components/FeatureGrid";
import Timeline from "../components/Timeline";

export default function Home() {
  const features = [
    { title: "SP@T Map Live-View", description: "See members live in real time by location." },
    { title: "SPL@T Live Lobby", description: "Hang out, chat, and preview nearby energy." },
    { title: "SPL@T Codes", description: "Share a one-time room or entrance code that disappears after use." },
    { title: "SPL@T Handles", description: "Public username to connect fast & stay anonymous." },
    { title: "SPL@T Chat", description: "Real-time chat with nearby or new connections." },
    { title: "SPL@T Events", description: "Community-led events, meetups, and collabs." },
    { title: "SP@T Map HotSpots", description: "See the hottest trending areas on the map—where the most community action is happening." },
    { title: "Premium", description: "Priority placement, more photos, Stealth Mode, Teleport Unlock, host private rooms & more." },
  ];

  const timeline = [
    { date: "Aug 2025", event: "Launch Landing Site – www.usesplat.com (Completed), Ambassador Program Live, Early Life-Time Founder Memberships offered ($25, Completed)" },
    { date: "Sept 2025", event: "Dev continues – SP@T Map Live, Messaging, Profiles, Filters" },
    { date: "Oct 2025", event: "SPL@T Live Lobby, Beta Program Launch" },
    { date: "Nov 2025", event: "SPL@T Public Launch (Prod-Ready)" },
  ];

  return (
    <>
      <Head>
        <title>WELCOME TO SPL@T!</title>
        <meta
          name="description"
          content="Your back-door pass to the SPL@TVerse — a real-time digital community for connection without shame."
        />
      </Head>

      <main className="bg-black text-white overflow-x-hidden">
        {/* Hero */}
        <section className="relative flex flex-col items-center px-4 pt-24 pb-12 text-center">
          <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825]">
            WELCOME TO SPL@T!
          </h1>
          <p className="mt-4 max-w-4xl text-[22pt] text-gray-300">
            Your back-door pass to the SPL@TVerse — a real-time digital community for connection without shame.
          </p>

          <Link
            href="/signup"
            aria-label="Join the SPL@T waitlist"
            className="mt-10 inline-block rounded-full bg-[#851825] px-16 py-6 text-[30pt] font-extrabold uppercase tracking-wide text-white shadow-[0_0_25px_rgba(216,13,39,0.35)] ring-2 ring-[#851825]/60 hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 animate-pulse"
          >
            JOIN THE WAITLIST
          </Link>

          <div className="mt-10 max-w-4xl rounded-xl bg-gray-800/80 px-6 py-6 text-[18pt] leading-snug shadow-md">
            <p className="font-semibold text-white">
              The SPL@T app — coming soon to iOS and Android — is in development and nearing completion. Beta testing is on the horizon, and it’s gonna be 🔥. Join our waitlist for the latest updates.
            </p>
            <p className="mt-4 font-semibold text-white">
              Our SPL@T Ambassador Program is live! Apply via the link above. We’re seeking ambassadors across all 50 states—if you’re a promoter, influencer, event planner, or just bold as hell, help us SPL@T the word.
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <Section
          id="who-we-are"
          className="px-4 pt-8 pb-12"
          title="Who We Are"
          titleClassName="text-[#851825] font-bold"
        >
          <p className="max-w-4xl text-[20pt]">
            SPL@T is a queer-built, unapologetic, bold and sexy real-time community-based event & meetup platform designed
            to create authentic connections without shame. Built by and for the LGBTQ+ community, we're throwing out outdated
            systems—and building something secure, authentic, private, bold, sexy, and a little sassy.
          </p>
        </Section>

        <Section
          id="what-we-offer"
          className="bg-gray-900 px-4 py-12"
          title="What We're Offering"
          titleClassName="text-[#851825] font-bold"
        >
          <p className="max-w-4xl text-[20pt]">
            We’re creating a real-time digital biosphere—the SPL@TVerse—featuring the SPL@T app, including <span className="font-semibold">SP@T Map Live-View</span>, SPL@T Chat, SPL@T Live Lobby, SPL@T Codes, SPL@T Handles, exclusive merch shop, SPL@T Events & Collabs, <span className="font-semibold">SP@T Map HotSpots</span>, and more. Whether you want to meet now or just vibe online, SPL@T gives you options, visibility, and control.
          </p>
        </Section>

        <Section id="features" className="px-4 py-12" title="Features" titleClassName="text-[#851825] font-bold">
          <FeatureGrid features={features} />
        </Section>

        <Section id="roadmap" className="bg-gray-900 px-4 py-12" title="Roadmap" titleClassName="text-[#851825] font-bold">
          <Timeline items={timeline} />
        </Section>
      </main>
    </>
  );
}
