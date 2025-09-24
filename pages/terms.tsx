import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | SPL@T</title>
        <meta name="description" content="The legally binding terms that govern your use of SPL@T and the SPL@TVerse." />
      </Head>

      <section className="bg-black text-white px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          <header className="text-center space-y-4">
            <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
              Terms of Service
            </h1>
            <p className="mx-auto max-w-3xl text-[16pt] leading-relaxed text-white/90">
              Read this like your access depends on it--because it does. These Terms create a contract between you and
              SPLAT, LLC ("SPL@T", "we", "us"). By tapping into the SPL@TVerse, you agree to every clause below. If you
              do not agree, do not create an account, do not use the app, and do not touch our platforms.
            </p>
          </header>

          <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-8 md:p-12 space-y-10 text-left">
            <Section id="agreement" title="1. Agreement to Terms">
              <p className="text-[16pt] leading-relaxed text-white/90">
                These Terms apply to your access to and use of the SPL@T mobile applications, websites, events, content,
                and any service we power now or in the future (collectively, the "Services"). Supplemental terms may apply
                to specific features; we will present those when relevant. If you keep using the Services after we update
                these Terms, that counts as acceptance.
              </p>
            </Section>

            <Section id="eligibility" title="2. Eligibility">
              <ul className="list-disc space-y-3 pl-6 text-[16pt] leading-relaxed text-white/90">
                <li>You must be 18+ (or the age of majority where you live) and legally capable of entering this agreement.</li>
                <li>You affirm you are part of--or an ally to--the LGBTQIA+ community and that visibility in queer spaces is legal where you participate.</li>
                <li>You promise SPL@T is not prohibited for you by any law, court order, or prior suspension from us.</li>
              </ul>
            </Section>

            <Section id="account" title="3. Account Registration & Security">
              <ul className="list-disc space-y-3 pl-6 text-[16pt] leading-relaxed text-white/90">
                <li>Keep your credentials secret and lock your devices. Everything that happens through your account is on you.</li>
                <li>Provide accurate, up-to-date info--including age verification details when requested.</li>
                <li>Tell us immediately at
                  <a className="ml-2 font-semibold text-[#851825] underline" href="mailto:ops@fundsplat.com">ops@fundsplat.com</a>
                  if you suspect unauthorized access or security incidents.
                </li>
                <li>We may reclaim user names, SPL@T Handles, or codes if needed for safety, legal compliance, or brand protection.</li>
              </ul>
            </Section>

            <Section id="content" title="4. Your Content & License">
              <p className="text-[16pt] leading-relaxed text-white/90">
                You own the content you upload (messages, photos, bios, profile elements). By posting, you grant SPL@T a
                worldwide, royalty-free, sublicensable license to host, use, display, reproduce, and distribute that
                content solely to operate, improve, market, and enforce the Services. The license ends when you delete the
                content, except where copies persist in backup, moderation files, or other users have already interacted
                with it.
              </p>
            </Section>

            <Section id="conduct" title="5. Prohibited Conduct">
              <p className="text-[16pt] leading-relaxed text-white/90">
                This is a high-vibe space--keep it that way. You agree not to:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-[16pt] leading-relaxed text-white/90">
                <li>
                  Violate our{" "}
                  <Link href="/community" className="ml-1 font-semibold text-[#851825] underline">
                    Community Standards
                  </Link>{" "}
                  or any other policy we publish.
                </li>
                <li>Engage in harassment, hate, stalking, threats, exploitation, or non-consensual behavior.</li>
                <li>Impersonate any person or entity, or submit false data for verification, referrals, or promotions.</li>
                <li>Scrape, spider, reverse engineer, or otherwise abuse our APIs, code, or infrastructure.</li>
                <li>Upload malicious code or tamper with security features, algorithms, or moderation systems.</li>
                <li>Use the Services for commercial solicitation without written approval, including unauthorized ads, spam, or pyramid schemes.</li>
                <li>Collect other users' information without consent or otherwise violate their privacy rights.</li>
              </ul>
            </Section>

            <Section id="payments" title="6. Payments, Credits & Promotions">
              <p className="text-[16pt] leading-relaxed text-white/90">
                Paid upgrades, event tickets, advertising placements, or ambassador perks may have additional terms.
                Unless those terms say otherwise, fees are non-refundable once delivered. Promotional codes, beta access,
                and loyalty rewards have no cash value and can expire or be revoked any time. You authorize us to charge
                your chosen payment method for purchases you initiate.
              </p>
            </Section>

            <Section id="service" title="7. Service Availability & Changes">
              <ul className="list-disc space-y-3 pl-6 text-[16pt] leading-relaxed text-white/90">
                <li>We can modify, suspend, or discontinue any feature without notice.</li>
                <li>We may throttle or restrict access when necessary for maintenance, capacity, legal compliance, or security.</li>
                <li>We are not liable for outages, latency, or data loss caused by providers, the internet, or things outside our control.</li>
              </ul>
            </Section>

            <Section id="termination" title="8. Termination & Enforcement">
              <p className="text-[16pt] leading-relaxed text-white/90">
                We can suspend or terminate your account, reclaim usernames, remove content, or block devices at our sole
                discretion, with or without notice, for any breach of these Terms, our Community Standards, or applicable
                law. You can delete your account anytime in the app or by contacting support. Certain obligations--like
                licenses granted, indemnities, and limitations of liability--survive termination.
              </p>
            </Section>

            <Section id="intellectual" title="9. Intellectual Property">
              <p className="text-[16pt] leading-relaxed text-white/90">
                SPL@T, SPL@TVerse, SP@T Map, and all related logos, designs, graphics, and product names are trademarks or
                service marks of SPLAT, LLC. Our code, designs, and content are protected by copyright, trademark, and
                other laws. You may not use them without express written permission.
              </p>
            </Section>

            <Section id="third-party" title="10. Third-Party Services">
              <p className="text-[16pt] leading-relaxed text-white/90">
                We may link to or integrate third-party services (payment processors, verification vendors, platform
                partners). Those services have their own terms and privacy policies. SPL@T is not responsible for their
                rules or actions.
              </p>
            </Section>

            <Section id="disclaimers" title="11. Disclaimers">
              <p className="text-[16pt] leading-relaxed text-white/90">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. YOUR ACCESS IS AT YOUR OWN RISK.
              </p>
            </Section>

            <Section id="liability" title="12. Limitation of Liability">
              <p className="text-[16pt] leading-relaxed text-white/90">
                TO THE FULLEST EXTENT ALLOWED, SPL@T AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, AND PARTNERS WILL
                NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR
                ANY LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES. OUR TOTAL LIABILITY FOR CLAIMS
                ARISING OUT OF OR RELATING TO THE SERVICES WILL NOT EXCEED THE GREATER OF (A) $100 OR (B) THE AMOUNTS YOU
                PAID TO SPL@T IN THE 12 MONTHS BEFORE THE CLAIM AROSE.
              </p>
            </Section>

            <Section id="indemnity" title="13. Indemnification">
              <p className="text-[16pt] leading-relaxed text-white/90">
                You agree to defend, indemnify, and hold harmless SPL@T and our officers, directors, employees, partners,
                and agents from any claim, demand, or damage (including attorneys' fees) arising out of your content,
                your use of the Services, or your violation of these Terms or any law.
              </p>
            </Section>

            <Section id="law" title="14. Governing Law">
              <p className="text-[16pt] leading-relaxed text-white/90">
                These Terms are governed by the laws of the State of Utah and the United States, without regard to conflict
                of law rules. The United Nations Convention on Contracts for the International Sale of Goods does not
                apply.
              </p>
            </Section>

            <Section id="dispute" title="15. Dispute Resolution & Arbitration">
              <p className="text-[16pt] leading-relaxed text-white/90">
                We prefer to settle drama fast. If a dispute arises, contact us at
                <a className="ml-2 font-semibold text-[#851825] underline" href="mailto:legal@usesplat.com">legal@usesplat.com</a>
                so we can try to resolve it informally. If we cannot resolve within 30 days, the dispute will be settled
                by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial
                Arbitration Rules in Salt Lake County, Utah. Arbitration will be conducted in English by a single
                arbitrator, and the arbitrator's decision will be final and enforceable in any court with jurisdiction. YOU
                WAIVE ANY RIGHT TO A JURY TRIAL OR TO PARTICIPATE IN A CLASS ACTION OR REPRESENTATIVE PROCEEDING. Individual
                claims for small claims court may proceed in that venue.
              </p>
            </Section>

            <Section id="severability" title="16. Severability & Assignment">
              <p className="text-[16pt] leading-relaxed text-white/90">
                If any part of these Terms is found unenforceable, the rest remains in force. You may not assign these
                Terms without our advance written consent, but we may assign them in connection with a merger, sale, or
                corporate restructure.
              </p>
            </Section>

            <Section id="updates" title="17. Updates to the Terms">
              <p className="text-[16pt] leading-relaxed text-white/90">
                We may revise these Terms to adapt to new features, laws, or business priorities. When we make material
                changes, we will notify you through the Services or via email. Continued use after the effective date of
                the updated Terms means you consent to them.
              </p>
            </Section>

            <Section id="contact" title="18. Contact SPL@T Legal">
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
                  <a className="ml-2 font-semibold text-[#851825] underline" href="mailto:legal@usesplat.com">
                    legal@usesplat.com
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
