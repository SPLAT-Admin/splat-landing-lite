import Head from "next/head";
import { motion } from "framer-motion";
import HeroBanner from "@/components/marketing/Hero";
import AnimatedSection from "@/components/layouts/AnimatedSection";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import Timeline from "@/components/marketing/Timeline";
import { Hero as HeroHeading, BodyLarge, Body } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

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
        <title>SPL@T - Your Gateway to the SPL@TVerse | LGBTQ+ Community Platform</title>
        <meta
          name="description"
          content="Join SPL@T, the bold and unapologetic LGBTQ+ community platform. Real-time connections, events, and authentic meetups without shame. Coming soon to iOS & Android."
        />
        <link rel="canonical" href="https://www.usesplat.com" />
      </Head>

      <main className="bg-jet-black text-acid-white overflow-x-hidden">
        {/* Removed HeroBanner from the very top */}

        {/* Welcome Section FIRST */}
        <section
          className="relative flex flex-col items-center px-4 pt-24 pb-12 text-center overflow-hidden"
          aria-labelledby="welcome-heading"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <HeroHeading
              id="welcome-heading"
              className="text-[44pt] font-bold text-deep-crimson"
            >
              WELCOME TO SPL@T
            </HeroHeading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <BodyLarge className="mt-6 max-w-4xl text-[22pt] font-bold text-acid-white">
              Your exclusive pass to the SPL@TVerse — where authentic connections happen without apology.
            </BodyLarge>
          </motion.div>
        </section>

        {/* Hero CTA NOW placed AFTER Welcome */}
        <HeroBanner />

        {/* Content Sections */}
        <AnimatedSection id="who-we-are" title="Who We Are" delay={0.1}>
          <BodyLarge className="max-w-4xl mx-auto">
            SPL@T is a queer-built, unapologetic, bold and sexy real-time community-based event & meetup platform designed
            to create authentic connections without shame. Built by and for the LGBTQ+ community, we're throwing out outdated
            systems—and building something secure, authentic, private, bold, sexy, and a little sassy.
          </BodyLarge>
        </AnimatedSection>

        <AnimatedSection
          id="what-we-offer"
          className="bg-gray-900/50"
          title="What We're Offering"
          delay={0.2}
        >
          <BodyLarge className="max-w-4xl mx-auto">
            We're creating a real-time digital biosphere—the SPL@TVerse—featuring the SPL@T app, including <span className="font-semibold text-deep-crimson">SP@T Map Live-View</span>, SPL@T Chat, SPL@T Live Lobby, SPL@T Codes, SPL@T Handles, exclusive merch shop, SPL@T Events & Collabs, <span className="font-semibold text-deep-crimson">SP@T Map HotSpots</span>, and more. Whether you want to meet now or just vibe online, SPL@T gives you options, visibility, and control.
          </BodyLarge>
        </AnimatedSection>

        <AnimatedSection id="features" title="Features" delay={0.3}>
          <FeatureGrid features={features} />
        </AnimatedSection>

        <AnimatedSection id="roadmap" className="bg-gray-900/50" title="Roadmap" delay={0.4}>
          <Timeline items={timeline} />
        </AnimatedSection>
      </main>
    </>
  );
}
