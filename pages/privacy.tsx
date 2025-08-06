<<<<<<< HEAD
export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FAFAFA] text-black min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#851725] mb-8">
          SPL@T Privacy Policy
        </h1>
        <p className="mb-6 text-sm italic">
          Effective Date: August 4, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#851725] mb-4">
            1. Introduction
          </h2>
          <p>
            SPL@T, LLC ("SPL@T," "we," "our," or "us") respects your privacy and
            is committed to protecting it through compliance with this policy.
            This Privacy Policy applies to all SPL@T services, including the SPL@T
            app, SP@T Live Map, SPL@T Live Lobby, and all related platforms within
            the SPL@Tverse™.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#851725] mb-4">
            2. Information We Collect
          </h2>
          <p>We collect the following types of information:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Account details (name, email, age, preferences)</li>
            <li>Location data for SP@T Live Map functionality</li>
            <li>Chat and media shared in SPL@T features</li>
            <li>Payment information for premium memberships</li>
            <li>Technical data (IP address, device type, operating system)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#851725] mb-4">
            3. How We Use Your Information
          </h2>
          <p>Your information is used to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Provide and improve SPL@T services</li>
            <li>Personalize your SPL@T experience</li>
            <li>Facilitate connections, chats, and location-based interactions</li>
            <li>Process payments and manage subscriptions</li>
            <li>Protect user safety and enforce Community Standards</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#851725] mb-4">
            4. Data Sharing & Third Parties
          </h2>
          <p>
            SPL@T does not sell your personal data. Limited information may be
            shared with trusted service providers to operate the app, process
            payments, and enhance security. All third-party partners are bound by
            confidentiality agreements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#851725] mb-4">
            5. Data Retention & Security
          </h2>
          <p>
            We retain your data as long as your account is active or as needed to
            provide SPL@T services. We use encryption, secure servers, and
            monitoring to safeguard all personal data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#851725] mb-4">
            6. Your Rights
          </h2>
          <p>
            You may request access, correction, or deletion of your data at any
            time by contacting us at privacy@usesplat.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#851725] mb-4">
            7. Dispute Resolution & Arbitration
          </h2>
          <p>
            Any disputes arising from this Privacy Policy will be resolved through
            binding arbitration in the State of Utah, USA, in accordance with the
            rules of the American Arbitration Association. By using SPL@T, you
            waive the right to participate in a class action.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#851725] mb-4">
            8. Contact Information
          </h2>
          <p>
            SPLAT, LLC <br />
            971 S University Ave, Suite 1088 <br />
            Provo, Utah <br />
            Phone: 844-420-8333 <br />
            Email: privacy@usesplat.com | support@usesplat.com
          </p>
        </section>
      </div>
    </div>
=======
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

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">1. Our Commitment to Privacy</h2>
            <p>
              At SPL@T, privacy isn’t just policy—it’s power. We believe your data belongs to you. We do not sell, rent, or share your personal information for profit. This Privacy Policy explains how we collect, use, protect, and respect your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-6">
              <li><strong>Account Info:</strong> Email, password, age, and profile details you provide.</li>
              <li><strong>Usage Data:</strong> App activity, interactions, device data, and IP address.</li>
              <li><strong>Location:</strong> Approximate or precise location, if enabled.</li>
              <li><strong>Communications:</strong> Messages, media, and interactions with other users.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">3. How We Use Your Data</h2>
            <ul className="list-disc pl-6">
              <li>To provide, maintain, and improve SPL@T services.</li>
              <li>To personalize your experience, including location-based discovery and recommendations.</li>
              <li>To detect, investigate, and prevent fraudulent or abusive behavior.</li>
              <li>To enforce our Terms of Service and Community Standards.</li>
              <li>To communicate updates, account notices, or support responses.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">4. Data Sharing</h2>
            <p>
              We do not sell your personal data. We share data only with trusted service providers under strict confidentiality agreements to operate the platform (e.g., cloud hosting, analytics, payment processing). Data may also be shared when legally required to comply with law enforcement or protect SPL@T users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">5. Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance performance and remember preferences. You can control these settings through your device or browser, though disabling cookies may impact functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">6. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary to fulfill our services and legal obligations. Deleted accounts and related data are permanently erased within 30 days unless retention is required for legal disputes or enforcement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">7. Security Measures</h2>
            <p>
              We use encryption, firewalls, access controls, and secure servers to safeguard data. While no system is 100% secure, SPL@T continuously updates security practices to address emerging threats.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">8. Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal data at any time. If you are in a jurisdiction with specific privacy rights (e.g., GDPR, CCPA), you may also have the right to data portability, restriction of processing, or lodging complaints with a supervisory authority.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">9. Third-Party Services</h2>
            <p>
              SPL@T may integrate with third-party services (e.g., mapping, messaging enhancements). We are not responsible for their privacy practices. Review their respective privacy policies before use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">10. International Data Transfers</h2>
            <p>
              SPL@T may process and store your information in locations outside your country. Where applicable, safeguards such as Standard Contractual Clauses (SCCs) are in place for international data transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">11. Updates to this Policy</h2>
            <p>
              We may revise this Privacy Policy to reflect legal, technical, or business changes. Significant updates will be communicated through in-app notifications or email prior to taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">12. Contact Information</h2>
            <p>
              Questions, requests, or complaints? Contact us:
              <br />
              Email: privacy@usesplat.com
              <br />
              Address: SPLAT, LLC, 971 S University Ave, Suite 1088, Provo, Utah
              <br />
              Phone: 844-420-8333
            </p>
          </section>
        </div>
      </div>
    </LegalLayout>
>>>>>>> main
  );
}
