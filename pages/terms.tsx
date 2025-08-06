import LegalLayout from "@/layouts/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <div className="bg-[#FAFAFA] text-black px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm italic mb-6">Effective Date: August 4, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the SPL@T app, website, or any part of the SPL@Tverse™, you agree to these Terms of Service, our Privacy Policy, and all other policies referenced herein. If you do not agree, you must discontinue use of SPL@T immediately. This agreement constitutes a legally binding contract.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to create an account and use SPL@T. By using SPL@T, you represent that you have the legal capacity to enter into this agreement under the laws of your jurisdiction. Accounts created by minors are subject to immediate termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">3. License to Use</h2>
            <p>
              SPL@T grants you a limited, non-exclusive, non-transferable license to use the app and related services for personal, non-commercial purposes, subject to these Terms. All rights not expressly granted remain with SPL@T. Unauthorized scraping, reverse engineering, or modification of the app is prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">4. Membership & Pricing</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>Monthly Membership: $9.99/month</li>
              <li>Annual Membership: $59.88/year ($4.99/month equivalent)</li>
              <li>Founder Lifetime Membership: $25 one-time payment (limited offer, non-refundable, non-transferable)</li>
            </ul>
            <p className="mt-2">
              SPL@T reserves the right to modify pricing for new customers at any time. Existing Lifetime Memberships remain honored for the life of the product. Additional local taxes and processing fees may apply.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">5. Payment, Renewal & Refunds</h2>
            <p>
              All paid memberships renew automatically unless canceled. Cancellation must be completed through your account settings before renewal to avoid charges. All purchases, including Founder Lifetime Memberships, are non-refundable to the fullest extent permitted by law. Refund requests for extenuating circumstances will be reviewed at SPL@T’s sole discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">6. User Conduct</h2>
            <p>
              You agree to comply with SPL@T’s Community Standards. Prohibited actions include harassment, hate speech, impersonation, sharing non-consensual content, spamming, hacking, or engaging in illegal activities. SPL@T reserves the right to cooperate with law enforcement as necessary.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">7. Intellectual Property</h2>
            <p>
              All SPL@T content, branding, and technology are owned by SPLAT, LLC and protected under applicable intellectual property laws. You may not copy, distribute, or create derivative works without express permission. SPL@T, SPL@Tverse™, and all related marks are trademarks of SPLAT, LLC.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">8. Disclaimers & Limitation of Liability</h2>
            <p>
              SPL@T is provided "as is" without warranties of any kind. SPLAT, LLC is not liable for damages arising from the use or inability to use the service, to the maximum extent permitted by law. This includes, but is not limited to, incidental, consequential, or punitive damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">9. Termination</h2>
            <p>
              SPL@T reserves the right to suspend or terminate accounts that violate these Terms or Community Standards. Terminations for cause are not eligible for refunds. Repeat or severe violations may result in permanent bans.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">10. Governing Law & Arbitration</h2>
            <p>
              These Terms are governed by the laws of Utah, USA. All disputes will be resolved exclusively through binding arbitration under the rules of the American Arbitration Association in Utah. Class action and jury trial rights are waived. Users agree to submit to the jurisdiction of Utah courts for enforcement of arbitration awards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#851725] mb-4">11. Contact Information</h2>
            <p>
              SPLAT, LLC <br />
              971 S University Ave, Suite 1088 <br />
              Provo, Utah <br />
              Phone: 844-420-8333 <br />
              Email: support@usesplat.com
            </p>
          </section>
        </div>
      </div>
    </LegalLayout>
  );
}
