import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import SplatCaptcha from "@/components/SplatCaptcha";

const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim()) && value.trim().length <= 320;

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => { if (error && errorRef.current) errorRef.current.focus(); }, [error]);

  // Prefill referral from ?ref=ABC123 (or ?referral=)
  useEffect(() => {
    if (!router.isReady) return;
    const refParam = (router.query.ref || router.query.referral) as string | string[] | undefined;
    const raw = Array.isArray(refParam) ? refParam[0] : refParam;
    if (raw && /^[A-Za-z0-9]{3,12}$/.test(raw)) {
      setReferralCode(String(raw).toUpperCase().slice(0, 8));
    }
  }, [router.isReady, router.query.ref, router.query.referral]);

  const canSubmit = useMemo(
    () => !loading && isValidEmail(email) && !!turnstileToken,
    [loading, email, turnstileToken]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim() || null,
          lastName: lastName.trim() || null,
          marketingConsent,
          turnstileToken,
          referralCode: referralCode ? referralCode.toUpperCase() : null,
        }),
      });

      if (res.ok || res.status === 409) return router.push("/thank-you");

      const data = await res.json().catch(() => ({}));
      const message: string = data?.error || "Something went wrong.";
      if (/captcha|token|turnstile/i.test(message)) {
        setError("Captcha check failed — try again.");
        setTurnstileToken(null);
      } else if (/invalid email/i.test(message) || !isValidEmail(email)) {
        setError("That email doesn’t look right.");
      } else if (/referral/i.test(message)) {
        setError("Invalid referral code. Use 6–8 letters/numbers.");
      } else {
        setError(message);
      }
    } catch (err) {
      setError("Network issue — try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md bg-gradient-to-b from-[#8b0000] to-[#5c0000] p-6 rounded-2xl shadow-xl border border-red-700/40"
      >
        <header className="mb-5">
          <h1 className="text-3xl font-black tracking-tight">Join the SPL@T List</h1>
          <p className="text-sm text-white/70 mt-1">Early drops. Dirty details. Zero spam.</p>
        </header>

        <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full p-3 rounded-xl bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-invalid={!!error}
          aria-describedby={error ? "signup-error" : undefined}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="firstName">First name (optional)</label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 rounded-xl bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-red-300"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="lastName">Last name (optional)</label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 rounded-xl bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-red-300"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Referral code (optional) */}
        <label className="block text-sm font-semibold mb-2 mt-4" htmlFor="referral">Referral code (optional)</label>
        <input
          id="referral"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
          onBlur={() => referralCode && setReferralCode(referralCode.toUpperCase().slice(0, 8))}
          maxLength={8}
          inputMode="text"
          placeholder="ABC123"
          className="w-full p-3 rounded-xl bg-white text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-red-300 tracking-widest"
        />
        <p className="text-xs text-white/60 mt-1">6–8 letters/numbers. Leave blank if none.</p>

        <label className="mt-4 inline-flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/30 bg-white/10"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
          />
          I want spicy updates & beta invites.
        </label>

        <div className="mt-4">
          <SplatCaptcha onVerify={setTurnstileToken} />
          <p className="text-xs text-white/60 mt-2">Protected by Turnstile. We hate bots.</p>
        </div>

        {error && (
          <p id="signup-error" ref={errorRef} tabIndex={-1} className="mt-3 text-sm text-red-200" aria-live="assertive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black font-bold py-3 transition active:scale-[.99] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Submitting…
            </span>
          ) : (
            "Sign Up"
          )}
        </button>

        <footer className="mt-4 text-center text-xs text-white/50">By signing up, you agree to receive emails from SPL@T. Unsubscribe anytime.</footer>
      </form>
    </main>
  );
}
