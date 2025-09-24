import Head from "next/head";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | SPL@T</title>
        <meta
          name="description"
          content="Learn how SPL@T collects, uses, protects, and shares your information across the SPL@TVerse."
        />
      </Head>

      <section className="bg-black text-white px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          <header className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Effective Date: August 4, 2025
            </p>
            <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-3xl text-[16pt] leading-relaxed text-white/90">
              We built SPL@T for people who demand privacy, respect, and control. This Privacy Policy explains how we
              collect, use, disclose, and secure your information when you access the SPL@T app, the SPL@T Live Lobby,
              SP@T Map, SPL@T Handles and Codes, and every connected experience in the SPL@TVerse.
            </p>
          </header>

          <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-8 md:p-12 space-y-10 text-left">
            <Section id="scope" title="1. Who We Are & Scope">
              <p className="text-[16pt] leading-relaxed text-white/90">
                SPLAT, LLC ("SPL@T", "we", "us", and "our") is headquartered in Provo, Utah and operates social,
                geolocation, and community platforms for LGBTQIA+ adults. This policy covers personal information we
                handle when you create an account, visit our sites, join the SPL@T app, interact with our events, or
                communicate with our team. It applies globally, including to residents of the European Economic Area
                ("EEA"), the United Kingdom, Switzerland, Canada, and California.
              </p>
            </Section>

            <Section id="collection" title="2. Information We Collect">
              <div className="space-y-6 text-[16pt] leading-relaxed text-white/90">
                <div>
                  <p className="font-semibold text-white">Information you provide directly:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-white/90">
                    <li>Account identifiers such as your email address, display name, password, and date of birth.</li>
                    <li>Profile content including photos, bios, interests, preferences, pronouns, and any SPL@T Handle or Code you claim.</li>
                    <li>Messages, media, event RSVPs, referrals, customer support requests, and feedback you send us.</li>
                    <li>Payment identifiers and transaction details processed through PCI-compliant partners when you purchase paid features.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">Information collected automatically:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-white/90">
                    <li>Device and log data such as IP address, device identifiers, operating system, browser, language, crash reports, and diagnostics.</li>
                    <li>Usage data including pages viewed, features engaged, in-app activity, interactions with other users, and referral sources.</li>
                    <li>Approximate or precise geolocation when you opt in to features like SP@T Map or Live Lobby placements.</li>
                    <li>Cookie, pixel, and tracking data gathered using in-product analytics and anti-abuse tooling.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">Information from partners and third parties:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-white/90">
                    <li>Identity verification signals, fraud scores, or blacklist inputs from safety vendors.</li>
                    <li>Aggregated campaign metrics from marketing platforms when you respond to our ads or collaborations.</li>
                    <li>Publicly available data to confirm eligibility or investigate safety incidents.</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="use" title="3. How We Use Your Information">
              <ul className="list-disc space-y-3 pl-6 text-[16pt] leading-relaxed text-white/90">
                <li>Operate, maintain, and personalize SPL@T products, including matchmaking, live rooms, and events.</li>
                <li>Authenticate logins, prevent spam, combat fraud, and keep the community safe.</li>
                <li>Process payments, subscriptions, promotional credits, and ambassador or advertising partnerships.</li>
                <li>Send transactional communications, including confirmations, updates, security alerts, and policy notices.</li>
                <li>Deliver customer support, investigate reports, and resolve disputes between users.</li>
                <li>Analyze trends to improve performance, develop new features, and power product research.</li>
                <li>Comply with legal obligations, enforce our Terms of Service, and defend our legal rights.</li>
              </ul>
            </Section>

            <Section id="legal-bases" title="4. Legal Bases for Processing (GDPR/UK GDPR)">
              <p className="text-[16pt] leading-relaxed text-white/90">
                When we process personal data about individuals in the EEA, UK, or Switzerland, we rely on the following
                legal bases:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-[16pt] leading-relaxed text-white/90">
                <li><span className="font-semibold text-white">Contractual necessity:</span> To create and maintain your account, deliver requested services, and provide customer support.</li>
                <li><span className="font-semibold text-white">Legitimate interests:</span> To secure the platform, prevent abuse, personalize experiences, and advance SPL@T product innovation--balanced against your rights.</li>
                <li><span className="font-semibold text-white">Consent:</span> For optional experiences like marketing emails, precise geolocation, or cookie drops where required.</li>
                <li><span className="font-semibold text-white">Legal obligations:</span> To satisfy tax, regulatory, law-enforcement, and compliance requirements.</li>
              </ul>
            </Section>

            <Section id="rights" title="5. Your Privacy Rights">
              <div className="space-y-6 text-[16pt] leading-relaxed text-white/90">
                <div>
                  <p className="font-semibold text-white">Under GDPR/UK GDPR you can:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-white/90">
                    <li>Request access to the personal data we hold about you.</li>
                    <li>Ask us to correct inaccurate or incomplete information.</li>
                    <li>Request deletion or restriction of your data in certain circumstances.</li>
                    <li>Object to processing based on legitimate interests or direct marketing.</li>
                    <li>Request data portability for information you provided to us in a structured format.</li>
                    <li>Withdraw consent at any time without affecting prior processing.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white">If you are a California resident, the CCPA/CPRA gives you the right to:</p>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-white/90">
                    <li>Know the categories and specific pieces of personal information we collect, use, and disclose.</li>
                    <li>Request deletion or correction of personal information (subject to statutory exceptions).</li>
                    <li>Opt out of the "sale" or "sharing" of personal information--SPL@T does not sell or share data for behavioral advertising, but you may still request confirmation.</li>
                    <li>Limit the use and disclosure of sensitive personal information.</li>
                    <li>Appoint an authorized agent to submit requests on your behalf.</li>
                    <li>Receive equal service and price even if you exercise your privacy rights.</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="requests" title="6. How to Exercise Your Rights">
              <p className="text-[16pt] leading-relaxed text-white/90">
                You can submit privacy requests at any time by emailing
                <a className="ml-1 font-semibold text-[#851825] underline" href="mailto:privacy@usesplat.com">privacy@usesplat.com</a>
                or by mailing the address listed below. We authenticate requests by verifying your account credentials or
                requesting additional information when necessary. Authorized agents must provide written permission from
                the account holder and be prepared to confirm the user's identity. If we deny your request, you may appeal
                by replying to our decision notice. Individuals in the EEA/UK may also contact their local data-protection
                authority, and California residents may contact the California Privacy Protection Agency.
              </p>
            </Section>

            <Section id="cookies" title="7. Cookies, Pixels & Tracking">
              <p className="text-[16pt] leading-relaxed text-white/90">
                SPL@T uses cookies, web beacons, SDKs, and similar technologies to keep you logged in, remember your
                preferences, measure performance, and safeguard the community. You can switch off non-essential cookies in
                your browser or device settings; however, disabling certain cookies may limit key features like SP@T Map
                placements or Live Lobby recognition. Where required by law, we will request your consent before dropping
                analytics or marketing cookies.
              </p>
            </Section>

            <Section id="sharing" title="8. Data Sharing & Processors">
              <p className="text-[16pt] leading-relaxed text-white/90">
                We never sell your personal data. We disclose information only when it is necessary to operate SPL@T, meet
                legal duties, or protect our community:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-[16pt] leading-relaxed text-white/90">
                <li>Cloud hosting, infrastructure, analytics, communications, content moderation, and payment partners acting as processors under written contracts.</li>
                <li>Ambassador, advertising, or event collaborators--with your direction or where data is aggregated, de-identified, or otherwise non-personal.</li>
                <li>Law enforcement or regulators when compelled by valid legal request or to protect the rights, property, or safety of SPL@T, our users, or the public.</li>
                <li>Professional advisors (attorneys, auditors, insurers) bound to confidentiality obligations.</li>
              </ul>
            </Section>

            <Section id="retention" title="9. Data Retention">
              <p className="text-[16pt] leading-relaxed text-white/90">
                We keep personal information only as long as it is needed for the purposes described above, to comply with
                legal obligations, or to resolve disputes. Account content is generally removed or anonymized within 30
                days of verified deletion, except where law enforcement preservation requests, fraud prevention, backup
                integrity, or legal claims require longer retention.
              </p>
            </Section>

            <Section id="security" title="10. Security Practices">
              <p className="text-[16pt] leading-relaxed text-white/90">
                Protecting sensitive data is core to SPL@T. We apply layered safeguards including:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-[16pt] leading-relaxed text-white/90">
                <li>Encryption for data in transit and at rest across critical systems.</li>
                <li>Role-based access controls, multi-factor authentication, and least-privilege enforcement for staff.</li>
                <li>Continuous monitoring, logging, and vulnerability management for our infrastructure.</li>
                <li>Background checks and privacy training for employees and contractors with data access.</li>
                <li>Incident response plans and user notification procedures that comply with applicable breach laws.</li>
              </ul>
              <p className="mt-4 text-[16pt] leading-relaxed text-white/90">
                No digital platform is unbreakable, but we aggressively test defenses and partner with outside specialists
                to harden SPL@T security.
              </p>
            </Section>

            <Section id="transfers" title="11. International Data Transfers">
              <p className="text-[16pt] leading-relaxed text-white/90">
                Your information may be stored or processed in the United States or other countries where we or our
                service providers operate. Whenever we transfer personal data out of the EEA, UK, or Switzerland, we rely
                on standard contractual clauses, adequacy decisions, or other lawful transfer mechanisms and implement
                supplementary safeguards where needed.
              </p>
            </Section>

            <Section id="children" title="12. Children">
              <p className="text-[16pt] leading-relaxed text-white/90">
                SPL@T is for adults. We do not knowingly collect personal data from anyone under 18 (or the age of
                majority in your jurisdiction). If you believe a minor is using the platform, contact us immediately so we
                can remove the account.
              </p>
            </Section>

            <Section id="changes" title="13. Changes to This Policy">
              <p className="text-[16pt] leading-relaxed text-white/90">
                When we make material updates, we will notify you through in-app messaging, email, or prominent notices
                on our sites. The "Effective Date" at the top of this page reflects the latest revision. Continued use of
                SPL@T after changes become effective means you accept the revised policy.
              </p>
            </Section>

            <Section id="contact" title="14. Contact SPL@T">
              <div className="space-y-2 text-[16pt] leading-relaxed text-white/90">
                <p>
                  SPLAT, LLC
                  <br />
                  971 S University Ave, Suite 1088
                  <br />
                  Provo, Utah 84601 USA
                </p>
                <p>
                  Email:
                  <a className="ml-2 font-semibold text-[#851825] underline" href="mailto:privacy@usesplat.com">
                    privacy@usesplat.com
                  </a>
                </p>
                <p>Phone: 844-420-8333</p>
              </div>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="space-y-4">
      <h2 className="text-[24pt] font-bold text-[#851825] drop-shadow-md">{title}</h2>
      <div className="space-y-4 text-white/90">{children}</div>
    </section>
  );
}
