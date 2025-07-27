import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>SPL@T – A Modern Way to Meet Nearby LGBTQ+ Adults</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Connect with real people nearby through a private, location-based social networking app for LGBTQ+ adults. Respectful. Secure. Modern." />
      </Head>
      <main>
        <header className="hero">
          <h1>SPL@T – A Modern Way to Meet Nearby LGBTQ+ Adults</h1>
          <p>Connect with real people in your area through a private, location-based social networking app. Designed for adult users seeking authentic, respectful connections.</p>
        </header>

        <section className="features">
          <h2>Why Choose SPL@T?</h2>
          <ul>
            <li>
              <h3>Browse Nearby Profiles</h3>
              <p>See a real-time grid of user profiles based on location, updated as you move. Filter by shared interests, age, and more.</p>
            </li>
            <li>
              <h3>Interactive Map View</h3>
              <p>Use our optional map view to explore profiles near popular venues or neighborhoods — always with location privacy and safety in mind.</p>
            </li>
            <li>
              <h3>Secure Messaging</h3>
              <p>Start private 1-on-1 chats instantly with in-app messaging and media sharing. Our platform includes tools to report or block any unwanted interactions.</p>
            </li>
            <li>
              <h3>Customizable Profile Privacy</h3>
              <p>Control what you share. Optional privacy features for Premium members include viewing anonymously and browsing discreetly.</p>
            </li>
            <li>
              <h3>Premium Membership</h3>
              <p>Unlock enhanced filters, remove ads, and access additional browsing options starting at $59.99/year or $9.99/month. Cancel anytime.</p>
            </li>
          </ul>
        </section>

        <section className="about">
          <h2>About SPL@T</h2>
          <p>SPL@T is a secure and inclusive community platform that helps adult LGBTQ+ individuals connect, communicate, and explore relationships on their terms. Our app promotes respectful interactions, privacy controls, and moderation tools to ensure a safe experience for everyone.</p>
        </section>

        <section className="preview">
          <h2>Here’s a preview of SPL@T in action:</h2>
          <ul>
            <li>Profile Grid View</li>
            <li>SP@T Map View</li>
            <li>Secure Chat Interface</li>
            <li>Quick and simple onboarding</li>
          </ul>
        </section>

        <footer>
          <nav className="footer-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
            <a href="#">Safety Guidelines</a>
          </nav>
          <div className="business-info">
            <p><strong>SPLAT, LLC</strong></p>
            <p>971 S University Ave, Suite 1088</p>
            <p>Provo, Utah 84601</p>
            <p>Phone: <a href="tel:8444308333">844-430-8333</a></p>
          </div>
        </footer>
      </main>
    </>
  );
}
