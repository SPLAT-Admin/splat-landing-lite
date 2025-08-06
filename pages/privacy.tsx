import LegalLayout from "../components/LegalLayout";
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <div className="bg-[#FAFAFA] text-black px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm italic mb-6">Effective Date: August 4, 2025</p>

          <Section title="1. Our Commitment to Privacy">
            At SPL@T, privacy isn’t just policy—it’s power. We believe your data belongs to you. We do not sell, rent, or share your personal information for profit. This Privacy Policy explains how we collect, use, protect, and respect your data.
          </Section>

          <Section title="2. Information We Collect">
            <ul className="list-disc pl-6">
              <li><strong>Account Info:</strong> Email, password, age, and profile details you provide.</li>
              <li><strong>Usage Data:</strong> App activity, interactions, device data, and IP address.</li>
              <li><strong>Location:</strong> Approximate or precise location, if enabled.</li>
              <li><strong>Communications:</strong> Messages, media, and interactions with other users.</li>
              <li><strong>Payments:</strong> Purchase and transaction info for memberships.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <ul className="list-disc pl-6">
              <li>To provide, maintain, and improve SPL@T services.</li>
              <li>To personalize your experience, including location-based discovery and recommendations.</li>
              <li>To detect, investigate, and prevent fraudulent or abusive behavior.</li>
              <li>To enforce our Terms of Service and Community Standards.</li>
              <li>To communicate updates, account notices, or support responses.</li>
            </ul>
          </Section>

          <Section title="4. Data Sharing & Third Parties">
            We do not sell your personal data. We share data only with trusted service providers under strict confidentiality agreements to operate the platform (e.g., cloud hosting, analytics, payment processing). Data may also be shared when legally required to comply with law enforcement or protect SPL@T users.
          </Section>

          <Section title="5. Cookies & Tracking">
            We use cookies and similar technologies to enhance performance and remember preferences. You can control these settings through your device or browser, though disabling cookies may impact functionality.
          </Section>

          <Section title="6. Data Retention & Security">
            We retain your data as long as your account is active or as needed to provide SPL@T services. We use encryption, firewalls, access controls, and secure servers to safeguard personal data. Deleted accounts are wiped within 30 days unless retention is needed for legal or security reasons.
          </Section>

          <Section title="7. Your Rights">
            You may request access, correction, or deletion of your data at any time by contacting privacy@usesplat.com. Users in jurisdictions like the EU or California may also have rights to data portability, restriction of processing, and more.
          </Section>

          <Section title="8. Third-Party Services">
            SPL@T may integrate with external services (e.g., maps, support systems, payment providers). These services operate under their own privacy policies. We recommend reviewing them when applicable.
          </Section>

          <Section title="9. International Data Transfers">
            SPL@T may process and store your information in locations outside your country. Safeguards such as Standard Contractual Clauses (SCCs) are used where legally required.
          </Section>

          <Section title="10. Dispute Resolution & Arbitration">
            Disputes related to this policy will be resolved by binding arbitration in Utah, USA, per the rules of the American Arbitration Association. Class actions are waived by use of SPL@T.
          </Section>

          <Section title="11. Updates to this Policy">
            We may revise this Privacy Policy as necessary to reflect legal, technical, or business developments. Significant changes will be communicated via app alerts or email before becoming effective.
          </Section>

          <Section title="12. Contact Information">
            SPLAT, LLC  
            <br />
            971 S University Ave, Suite 1088  
            <br />
            Provo, Utah  
            <br />
            Phone: 844-420-8333  
            <br />
            Email: <a href="mailto:privacy@usesplat.com" className="underline">privacy@usesplat.com</a>
          </Section>
        </div>
      </div>
    </LegalLayout>
  );
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-[#851725] mb-4">{title}</h2>
      <div className="text-gray-900 text-[15px]">{children}</div>
    </section>
  );
}
