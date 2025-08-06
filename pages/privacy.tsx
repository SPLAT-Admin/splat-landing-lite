export default function Privacy() {
  return (
    <main className="p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Effective Date: August 5, 2025</p>

      <p className="mb-4">
        SPL@T respects your privacy. We collect limited personal information to operate our
        services, including your email address, payment details, and app usage data. This
        information is used exclusively to provide and improve the SPL@T experience.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-2 mb-4">
        <li>Email address for account creation and communication.</li>
        <li>Payment details processed securely through Stripe.</li>
        <li>Optional profile information shared within the app.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-4">How We Use Your Information</h2>
      <p className="mb-4">
        Your data is used to provide the service, process payments, maintain security,
        and improve SPL@T’s features. We do not sell or share personal data with third
        parties outside of necessary payment processing and hosting services.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Contact</h2>
      <p>
        For privacy concerns, contact us at:{" "}
        <a href="mailto:privacy@usesplat.com" className="underline">
          privacy@usesplat.com
        </a>
      </p>
    </main>
  );
}
