import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/** Home page for SPL@T with improved layout and SEO. */
export default function Home() {
  const features = [
    { title: 'SP@T Live Map',    description: 'See users live, cruising in real time, by location.' },
    { title: 'Live Lobby',       description: 'Hang out, chat and preview nearby action.' },
    { title: 'SP@T Codes',       description: 'Share one‑time hook‑up codes that disappear after use.' },
    { title: 'SP@T Handles',     description: 'Choose a public username to connect fast and stay anonymous.' },
    { title: 'Stealth Mode',     description: 'Browse privately when you need it.' },
    { title: 'Teleport Unlock',  description: 'Drop into any city before you land there.' },
  ];
  const timeline = [
    { date: 'Aug 2025',  event: 'Landing site + Stripe launch' },
    { date: 'Sept 2025', event: 'SP@T Map + Live Lobby beta' },
    { date: 'Oct 2025',  event: 'Messaging, profiles, filters' },
    { date: 'Nov 2025',  event: 'Public launch' },
  ];

  return (
    <>
      <Head>
        <title>SPL@T – The Queer Cruising Platform</title>
        <meta name="description" content="SPL@T is a real‑time cruising platform built by and for the queer community. Join our waitlist to experience live maps, lobbies, handles and more." />
        <link rel="canonical" href="https://usesplat.com/" />
        <meta property="og:title" content="SPL@T – The Queer Cruising Platform" />
        <meta property="og:description" content="Join SPL@T – a fast, unapologetic cruising platform offering live maps, private handles and stealth mode." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://usesplat.com/" />
        <meta property="og:image" content="/images/hero-placeholder.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main className="bg-black text-white">
        {/* Hero */}
        <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to SPL@T!
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">
            Your back‑door pass to the SPL@TVerse – a real‑time digital cruising ground for connection without shame.
          </p>
          <div>
            <a href="/signup" className="inline-block rounded-md bg-red-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-red-700">
              Join the Waitlist
            </a>
          </div>
        </section>

        {/* Who We Are */}
        <section id="who-we-are" className="px-4 py-16 md:px-8 lg:px-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Who We Are</h2>
          <p className="max-w-4xl text-lg">
            SPL@T is a queer‑built, unapologetic hookup and cruising platform designed for connection without shame.
            Built by and for the community, we’re throwing out outdated systems and building something sexy, fast and free.
          </p>
        </section>

        {/* What We’re Offering */}
        <section id="what-we-offer" className="bg-gray-900 px-4 py-16 md:px-8 lg:px-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">What We’re Offering</h2>
          <p className="max-w-4xl text-lg">
            We’re creating a real‑time digital cruising ground – featuring the SPL@T Map, Live Lobby, SP@T Codes, Handles and more. Whether you want to meet now or just vibe online, SPL@T gives you options, visibility and control.
          </p>
        </section>

        {/* Planned Features */}
        <section id="planned-features" className="px-4 py-16 md:px-8 lg:px-16">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">Planned Features</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-lg">
                <h3 className="mb-2 text-xl font-semibold text-red-500">{feature.title}</h3>
                <p className="text-base text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Go Premium */}
        <section id="why-go-premium" className="bg-gray-900 px-4 py-16 md:px-8 lg:px-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Why Go Premium?</h2>
          <p className="max-w-4xl text-lg">
            Premium unlocks everything. Advanced filters, stealth mode, location teleporter and much more. Missed the founder sale?
            Stay tuned for early access options before public launch.
          </p>
        </section>

        {/* Development Timeline */}
        <section id="development-timeline" className="px-4 py-16 md:px-8 lg:px-16">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">Development Timeline</h2>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.date} className="flex items-start space-x-4">
                <div className="text-sm font-bold text-red-500">{item.date}</div>
                <div className="text-base text-gray-300">{item.event}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
