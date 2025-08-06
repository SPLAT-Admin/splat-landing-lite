import LegalLayout from "@/layouts/LegalLayout";

export default function Community() {
  return (
    <LegalLayout title="SPL@T Community Standards">
      <section className="space-y-8">
        {/* Community Standards */}
        <Standard title="Consent is Non‑Negotiable">
          Clear, enthusiastic, ongoing. Consent must be explicit and can be withdrawn at any time. Engaging without consent may lead to immediate suspension or ban, and may be reported to relevant authorities when applicable.
        </Standard>

        <Standard title="Respect is Required">
          No hate speech, bullying, or discrimination—ever. This includes, but is not limited to, racism, transphobia, homophobia, fatphobia, ableism, ageism, or xenophobia. SPL@T maintains a zero‑tolerance stance on harassment.
        </Standard>

        <Standard title="Be Real">
          No catfishing, no bots, no fake profiles. Misrepresentation, identity theft, or impersonation of another user or entity will result in immediate removal and possible permanent ban.
        </Standard>

        <Standard title="Be Sexy, Not Shady">
          Flirt hard, but stay honest. Deceptive or manipulative behavior, including scams or solicitation in violation of local laws, is prohibited.
        </Standard>

        <Standard title="No Shame, All Pride">
          Every body, identity, and kink deserves dignity. Expression of identity is welcome as long as it complies with our content guidelines and legal requirements.
        </Standard>

        <Standard title="Safety First">
          Report abuse—don’t ignore it. SPL@T acts quickly to investigate reports, and reserves the right to suspend or ban accounts that pose a threat to user safety.
        </Standard>

        <Standard title="Privacy is Power">
          Don’t out others, don’t leak receipts, don’t violate trust. Unauthorized sharing of private communications, images, or personal information is a serious violation that may result in permanent removal.
        </Standard>

        <Standard title="You’re the Vibe">
          You help shape the community—lead with authenticity. Behavior that disrupts the safety, inclusivity, or intended use of the SPL@Tverse™ will be addressed through moderation actions.
        </Standard>

        <p className="italic text-gray-400">
          These standards aren’t suggestions—they’re the foundation of a fierce, safe, and radically real digital experience. SPL@T™ enforces them through a blend of community moderation, AI‑driven flagging tools, and direct user reporting. Violations lead to warnings, suspensions, or bans, ensuring a protected and respectful space for all.
        </p>

        {/* Core Values */}
        <h2 className="text-2xl font-bold text-[color:var(--deep-crimson)] mt-10 mb-4">SPL@T Core Values</h2>
        <Value title="Affordability First">
          Access should never be gated by money. SPL@T™ keeps pricing low so everyone can connect without exploitation.
        </Value>

        <Value title="Privacy is Power">
          We don’t sell your data. We don’t leak your secrets. Full stop. User trust is sacred.
        </Value>

        <Value title="Authentic Connections">
          We are anti-bot, anti-fake, pro-real. Every user interaction is designed to be genuine, verified, and meaningful.
        </Value>

        <Value title="Radical Sex‑Positivity">
          No shame, no censorship. We honor kink, identity, and expression in all forms.
        </Value>

        <Value title="Security by Design">
          Verification systems and safety tools are built in from day one—not as an afterthought.
        </Value>

        <Value title="Community Over Commodity">
          You’re not a product. You’re part of something bigger. We build with and for the SPL@Tverse™.
        </Value>
      </section>
    </LegalLayout>
  );
}

function Standard({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg text-[color:var(--deep-crimson)] mb-2">{title}</h3>
      <p className="text-gray-200">{children}</p>
    </div>
  );
}

function Value({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="font-bold text-md text-[color:var(--deep-crimson)] mb-1">{title}</h4>
      <p className="text-gray-300">{children}</p>
    </div>
  );
}
