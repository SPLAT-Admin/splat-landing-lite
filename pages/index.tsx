// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col font-sans">
      <Head>
        <title>SPL@T – Connect, Explore, Belong</title>
        <meta name="description" content="SPL@T is a modern SaaS platform empowering LGBTQ+ connection and discovery. Explore the SPL@TVerse: safe, inclusive, community-powered digital experiences." />
      </Head>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full flex flex-col items-center justify-start px-4 md:px-0">
        {/* Hero Section */}
        <section className="w-full max-w-5xl text-center mt-14 md:mt-20 mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl">
            Welcome to <span className="text-[color:var(--deep-crimson,#e11d48)]">SPL@T</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto mb-8">
            SPL@T is a next-generation SaaS platform created for the LGBTQ+ community and allies—built for connection, self-expression, and safe exploration. <br />
            Experience authentic community with innovative features, live digital spaces, and powerful privacy controls.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
            <Link
              href="/founder"
              className="bg-[color:var(--deep-crimson,#e11d48)] hover:bg-red-700 text-white text-xl font-bold rounded-full px-10 py-4 shadow-lg transition-all duration-150"
            >
              Join as a Founder Member
            </Link>
            <a
              href="mailto:support@usesplat.com"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-lg font-semibold rounded-full px-10 py-4 shadow transition-all duration-150"
            >
              Contact Support
            </a>
          </div>
        </section>

        {/* What is SPL@T */}
        <section className="w-full max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">What is SPL@T?</h2>
          <p className="text-lg text-white/80 text-center mb-4">
            SPL@T is a software-as-a-service (SaaS) app that empowers LGBTQ+ people and allies to connect, communicate, and discover safe community spaces—online and in real life. 
            With robust privacy options, advanced filters, and intuitive design, SPL@T supports meaningful engagement and real-time exploration.
          </p>
          <ul className="text-white/80 text-lg max-w-2xl mx-auto space-y-3 list-inside list-disc text-left md:text-center">
            <li>Private & group chat, with safety at the core</li>
            <li>Live map for discovering welcoming spaces and events</li>
            <li>Personalized handles, profiles, and privacy controls</li>
            <li>Completely ad-free for all founder members</li>
            <li>Created and led by LGBTQ+ innovators</li>
          </ul>
        </section>

        {/* The SPL@TVerse */}
        <section className="w-full max-w-5xl mx-auto mb-20 pt-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Explore the SPL@TVerse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-2">
            <div className="bg-gradient-to-br from-red-950 via-black to-black rounded-2xl p-8 shadow-lg flex flex-col items-center hover:scale-105 transition-all duration-200">
              <span className="text-4xl mb-3">📱</span>
              <div className="font-bold text-xl text-white mb-1">SPL@T App</div>
              <div className="text-white/80 text-base text-center">Seamless communication with chat, media sharing, and customizable profiles. Your privacy, your pace, your people.</div>
            </div>
            <div className="bg-gradient-to-br from-red-950 via-black to-black rounded-2xl p-8 shadow-lg flex flex-col items-center hover:scale-105 transition-all duration-200">
              <span className="text-4xl mb-3">🗺️</span>
              <div className="font-bold text-xl text-white mb-1">SP@T Map</div>
              <div className="text-white/80 text-base text-center">Explore LGBTQ+ inclusive spaces, businesses, and events near you and worldwide. See live activity and join community gatherings with safety in mind.</div>
            </div>
            <div className="bg-gradient-to-br from-red-950 via-black to-black rounded-2xl p-8 shadow-lg flex flex-col items-center hover:scale-105 transition-all duration-200">
              <span className="text-4xl mb-3">🎤</span>
              <div className="font-bold text-xl text-white mb-1">Live Lobby</div>
              <div className="text-white/80 text-base text-center">Participate in moderated live conversations, panels, and Q&As. Share your voice and find real-time support and connection.</div>
            </div>
            <div className="bg-gradient-to-br from-red-950 via-black to-black rounded-2xl p-8 shadow-lg flex flex-col items-center hover:scale-105 transition-all duration-200">
              <span className="text-4xl mb-3">🏷️</span>
              <div className="font-bold text-xl text-white mb-1">Handles & Codes</div>
              <div className="text-white/80 text-base text-center">Unique, customizable usernames and invitation codes. Stay anonymous, stay creative, stay safe—your identity, your terms.</div>
            </div>
          </div>
        </section>

        {/* Why SPL@T? */}
        <section className="w-full max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">Why SPL@T?</h2>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <div className="flex-1 text-lg text-white/80 text-center px-2">
              <strong className="text-white font-semibold">Inclusive & Respectful:</strong>  
              SPL@T was designed to welcome everyone. Whether you’re looking to build friendships, find events, or join in conversation, you’ll find your place here.
            </div>
            <div className="flex-1 text-lg text-white/80 text-center px-2">
              <strong className="text-white font-semibold">Private & Secure:</strong>
              State-of-the-art security and customizable privacy controls let you be yourself with confidence, wherever you go in the SPL
