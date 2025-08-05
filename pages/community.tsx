import LegalLayout from "../components/LegalLayout";

export default function CommunityPage() {
  return (
    <LegalLayout title="Community Standards & Core Values">
      <div className="bg-[#FAFAFA] text-black px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm italic mb-6">Effective Date: August 4, 2025</p>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-[#851725] mb-4">SPL@T Community Standards™</h2>
            <p className="mb-4">We expect everyone in the SPL@Tverse™ to uphold the following standards:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consent is Non-Negotiable:</strong> Clear, enthusiastic, ongoing.</li>
              <li><strong>Respect is Required:</strong> No hate speech, bullying, or discrimination—ever.</li>
              <li><strong>Be Real:</strong> No catfishing, no bots, no fake profiles.</li>
              <li><strong>Be Sexy, Not Shady:</strong> Flirt hard, but stay honest.</li>
              <li><strong>No Shame, All Pride:</strong> Every body, identity, and kink deserves dignity.</li>
              <li><strong>Safety First:</strong> Report abuse, don’t ignore it. We act fast and without hesitation.</li>
              <li><strong>Privacy is Power:</strong> Don’t out others, don’t leak receipts, don’t violate trust.</li>
              <li><strong>You’re the Vibe:</strong> You help shape the community—lead with authenticity.</li>
            </ul>
            <p className="mt-4">
              These standards aren’t suggestions—they are the foundation of a fierce, safe, and radically real digital experience. SPL@T™ enforces them through community moderation, AI-driven flagging tools, and direct user reporting. Violations may lead to warnings, suspensions, or bans.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-[#851725] mb-4">Core Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Affordability First:</strong> Access should never be gated by money. SPL@T™ keeps pricing low so everyone can connect without exploitation.</li>
              <li><strong>Privacy is Power:</strong> We don’t sell your data. We don’t leak your secrets. User trust is sacred.</li>
              <li><strong>Authentic Connections:</strong> We are anti-bot, anti-fake, pro-real. Every interaction is genuine, verified, and meaningful.</li>
              <li><strong>Radical Sex-Positivity:</strong> No shame, no censorship. We honor kink, identity, and expression in all forms.</li>
              <li><strong>Security by Design:</strong> Verification systems and safety tools are built in from day one—not as an afterthought.</li>
              <li><strong>Community Over Commodity:</strong> You’re not a product. You’re part of something bigger. We build with and for the SPL@Tverse™.</li>
            </ul>
            <p className="mt-4">
              <strong>Key Differentiators:</strong> Low cost, privacy-first, sex-positive, verified users.
            </p>
          </section>
        </div>
      </div>
    </LegalLayout>
  );
}
