import Head from "next/head";
import Link from "next/link";

export default function AmbassadorPage() {
  return (
    <>
      <Head>
        <title>Ambassador HQ — SPL@TVerse Insider</title>
        <meta
          name="description"
          content="Everything SPL@T: App features, culture, perks, programs—your insider pass."
        />
      </Head>

      <section className="bg-background text-foreground py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero */}
          <div className="text-center">
            <h1 className="font-extrabold mb-4 text-[#851825] leading-tight tracking-tight text-[44pt]">
              SPL@T Ambassador Program
            </h1>
            <p className="leading-relaxed text-white text-[18pt]">
              Your go-to guide for everything SPL@T – from app architecture to
              perks, terminology, and mission.
            </p>
          </div>

          {/* Overview */}
          <section>
            <h2 className="font-bold mb-3 text-[#851825] text-[24pt]">
              What Is SPL@T?
            </h2>
            <p className="text-white text-[18pt]">
              SPL@T is a queer-built, unapologetic, high-energy real-time
              platform for hookups, meetups, events, and social cruising.
              Designed for visibility without shame, it’s your digital third
              place to vibe, connect, or get wild. With live geolocation, chat,
              and public-private rooms, SPL@T empowers community connection
              wherever you are.
            </p>
          </section>

          {/* SPL@TVerse Modules */}
          <section>
            <h2 className="font-bold mb-3 text-[#851825] text-[24pt]">
              SPL@TVerse Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-white text-[18pt]">
              <li>
                <strong>SP@T Map Live‑View:</strong> Real-time geolocation of
                community members.
              </li>
              <li>
                <strong>SPL@T Live Lobby:</strong> Public chat spaces, virtual
                meet &amp; greet before engagement.
              </li>
              <li>
                <strong>SPL@T Codes &amp; Handles:</strong> Private access codes
                and user aliases for anonymity.
              </li>
              <li>
                <strong>HotSpots &amp; Events:</strong> Tap into trending
                locations and upcoming community collabs.
              </li>
              <li>
                <strong>Premium Tools:</strong> Teleport unlock, Stealth Mode,
                priority placement, private rooms.
              </li>
            </ul>
          </section>

          {/* Ambassador Perks */}
          <section>
            <h2 className="font-bold mb-3 text-[#851825] text-[24pt]">
              Ambassador Perks
            </h2>
            <ul className="list-disc list-inside space-y-2 text-white text-[18pt]">
              <li>Priority beta access &amp; feature testing.</li>
              <li>Promo code generation and exclusive merch bundles.</li>
              <li>Invites to SPL@T LIVE events and social collab opportunities.</li>
              <li>Recognition roll: social shout-outs, in-app badges.</li>
              <li>Ambassador-only community feedback circles.</li>
            </ul>
          </section>

          {/* Expectations, Benefits, and Bonuses */}
          <section>
            <h2 className="font-bold mb-3 text-[#851825] text-[24pt]">
              Ambassador Expectations &amp; Bonuses
            </h2>
            <ul className="list-disc list-inside space-y-2 text-white text-[18pt]">
              <li>
                Create content and social media buzz at least 2x/month using
                your SPL@T handle and assets.
              </li>
              <li>Refer 10+ users/month with your custom ambassador code.</li>
              <li>
                Represent SPL@T at local queer events, clubs, or scenes when
                possible.
              </li>
              <li>
                Be sexy, be bold, be loud – while promoting a shame-free vibe.
              </li>
              <li>
                <strong>Referral Bonus:</strong> Get rewarded for every verified
                user sign-up. The more you SPL@T, the more you earn!
              </li>
              <li>
                Top-performing ambassadors unlock merch, event invites, and
                spotlight features.
              </li>
            </ul>
          </section>

          {/* Program Requirements */}
          <section>
            <h2 className="font-bold mb-3 text-[#851825] text-[24pt]">
              Program Requirements
            </h2>
            <ul className="list-disc list-inside space-y-2 text-white text-[18pt]">
              <li>Must be 21+ and located in the U.S.</li>
              <li>
                Must identify within or be allied with the LGBTQ+ community.
              </li>
              <li>Willing to be visible and accountable on social media.</li>
              <li>
                Follow SPL@T’s code of conduct and branding standards.
              </li>
            </ul>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <Link
              href="/ambassador-apply"
              className="
                inline-block mt-8 rounded-full 
                bg-[#851825] text-white 
                px-10 py-5 
                text-[18pt] md:text-[20pt] 
                font-extrabold tracking-wide
                shadow-[0_0_35px_rgba(133,24,37,0.45)]
                ring-2 ring-[#851825]/70 
                hover:bg-[#6f1320] hover:shadow-[0_0_45px_rgba(133,24,37,0.55)]
                focus:outline-none focus-visible:ring-4 
                transition-all duration-200 ease-out
              "
            >
              APPLY NOW TO BECOME A SPL@T AMBASSADOR!
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
