import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroFlashSale from "../components/HeroFlashSale";
import AnimatedSection from "../components/AnimatedSection";
import FeatureGrid from "../components/FeatureGrid";
import Timeline from "../components/Timeline";
import { Hero, BodyLarge, Body } from "../components/Typography";
import Button from "../components/Button";

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
        <meta name="keywords" content="LGBTQ+, community, meetup, events, social platform, queer, connections, SPL@T, SPL@TVerse" />
        <meta name="author" content="SPL@T, LLC" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.usesplat.com" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.usesplat.com" />
        <meta property="og:title" content="SPL@T - Your Gateway to the SPL@TVerse | LGBTQ+ Community Platform" />
        <meta property="og:description" content="Join SPL@T, the bold and unapologetic LGBTQ+ community platform. Real-time connections, events, and authentic meetups without shame." />
        <meta property="og:image" content="https://www.usesplat.com/splat-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="SPL@T" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.usesplat.com" />
        <meta property="twitter:title" content="SPL@T - Your Gateway to the SPL@TVerse" />
        <meta property="twitter:description" content="Join SPL@T, the bold and unapologetic LGBTQ+ community platform. Real-time connections, events, and authentic meetups without shame." />
        <meta property="twitter:image" content="https://www.usesplat.com/splat-logo.png" />
        
        {/* Additional SEO */}
        <meta name="application-name" content="SPL@T" />
        <meta name="apple-mobile-web-app-title" content="SPL@T" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SPL@T",
              "alternateName": "SPL@TVerse",
              "url": "https://www.usesplat.com",
              "logo": "https://www.usesplat.com/splat-logo.png",
              "description": "SPL@T is a bold and unapologetic LGBTQ+ community platform for real-time connections, events, and authentic meetups without shame.",
              "foundingDate": "2025",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "971 S University Avenue Suite 1088",
                "addressLocality": "Provo",
                "addressRegion": "Utah",
                "postalCode": "84601",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-844-420-8333",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.fundsplat.com"
              ],
              "applicationCategory": "Social Networking",
              "operatingSystem": ["iOS", "Android"],
              "offers": {
                "@type": "Offer",
                "description": "Early access to SPL@T platform and community features",
                "availability": "https://schema.org/PreOrder"
              }
            })
          }}
        />
      </Head>

      <main className="bg-jet-black text-acid-white overflow-x-hidden">
        <HeroFlashSale />

        {/* Hero Section */}
        <section 
          className="relative flex flex-col items-center px-4 pt-24 pb-12 text-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Gradient Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-crimson/20 via-jet-black to-jet-black opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-jet-black via-transparent to-transparent" />
          
          {/* Blurred Crimson Orbs for Depth */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-deep-crimson/30 rounded-full blur-3xl opacity-40 animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-crimson-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
          
          <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Hero id="hero-heading">
              WELCOME TO SPL@T
            </Hero>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <BodyLarge className="mt-6 max-w-4xl text-acid-white/80">
              Your exclusive pass to the SPL@TVerse — where authentic connections happen without apology.
            </BodyLarge>
          </motion.div>

          <motion.div 
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row" 
            role="group" 
            aria-label="Primary actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Button
              href="/signup"
              size="xl"
              aria-label="Join the SPL@T waitlist to get early access"
            >
              Join the Waitlist
            </Button>
            <Button
              href="/storefront"
              variant="outline"
              size="xl"
              aria-label="Browse SPL@T merchandise store"
            >
              Explore Merch
            </Button>
          </motion.div>

          <motion.aside 
            className="mt-12 max-w-4xl rounded-2xl bg-gray-900/90 border border-white/10 px-8 py-8 shadow-glow backdrop-blur-sm"
            aria-labelledby="app-status-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <h2 id="app-status-heading" className="sr-only">App Development Status</h2>
            <Body className="font-semibold text-acid-white">
              The SPL@T app — coming soon to iOS and Android — is in development and nearing completion. Beta testing is on the horizon, and it's going to be incredible. Join our waitlist for the latest updates.
            </Body>
            <Body className="mt-4 font-semibold text-acid-white">
              Our SPL@T Ambassador Program is live! Apply via the link below. We're seeking ambassadors across all 50 states—if you're a promoter, influencer, event planner, or just bold as hell, help us SPL@T the word.
            </Body>
            <div className="mt-6">
              <Button
                href="/ambassador"
                variant="outline"
                size="md"
                aria-label="Apply to become a SPL@T Ambassador"
              >
                Become an Ambassador
              </Button>
            </div>
          </motion.aside>
          </div>
        </section>

        {/* Content Sections */}
        <AnimatedSection
          id="who-we-are"
          title="Who We Are"
          delay={0.1}
        >
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
