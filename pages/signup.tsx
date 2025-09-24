import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import SplatCaptcha from "@/components/SplatCaptcha";
import PasswordField from "@/components/PasswordField";
import { supabase } from "@/lib/supabaseClient";

const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim()) && value.trim().length <= 320;

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => { if (error && errorRef.current) errorRef.current.focus(); }, [error]);

  useEffect(() => {
    if (!router.isReady) return;
    const refParam = (router.query.ref || router.query.referral) as string | string[] | undefined;
    const raw = Array.isArray(refParam) ? refParam[0] : refParam;
    if (raw && /^[A-Za-z0-9]{3,12}$/.test(raw)) {
      setReferralCode(String(raw).toUpperCase().slice(0, 8));
    }
  }, [router.isReady, router.query.ref, router.query.referral]);

  useEffect(() => {
    if (passwordValid) {
      setPasswordError(null);
    }
  }, [passwordValid]);

  const canSubmit = useMemo(
    () => !loading && isValidEmail(email) && !!turnstileToken && passwordValid,
    [loading, email, turnstileToken, passwordValid]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) {
      if (!passwordValid) {
        setPasswordError("Password must be strong and meet all requirements.");
      }
      return;
    }
    setLoading(true);
    setError("");

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            first_name: firstName.trim() || null,
            last_name: lastName.trim() || null,
          },
        },
      });

      if (signUpError && !/registered/i.test(signUpError.message)) {
        throw new Error(signUpError.message || "Failed to create account.");
      }

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

      const data = await res.json().catch(() => ({}));

      if (res.ok || res.status === 409) {
        const redirect = data?.redirectTo || data?.data?.redirectTo || "/thank-you";
        return router.push(redirect);
      }
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
    } catch (err: any) {
      const message = typeof err?.message === "string" ? err.message : "Network issue — try again in a moment.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#120207] to-black px-6 py-20 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center">
        <div className="w-full fade-up">
          <div className="gradient-frame crimson-glow">
            <div className="gradient-content p-8 sm:p-10">
              <header className="text-center space-y-2">
                <h1 className="text-[42px] font-extrabold tracking-tight text-[#851825]">Join the SPL@T List</h1>
                <p className="text-base text-white/80">Early drops. Dirty details. Zero spam.</p>
              </header>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-7 text-[14pt]">
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                    aria-invalid={!!error}
                    aria-describedby={error ? "signup-error" : undefined}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      First Name (optional)
                    </label>
                    <input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      Last Name (optional)
                    </label>
                    <input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <PasswordField
                    value={password}
                    onChange={setPassword}
                    enforceStrength
                    onValidityChange={setPasswordValid}
                    label="Create Password"
                    placeholder="Craft something fierce"
                  />
                  {passwordError && (
                    <p className="text-sm text-red-400">{passwordError}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="referral" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    Referral Code (optional)
                  </label>
                  <input
                    id="referral"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    onBlur={() => referralCode && setReferralCode(referralCode.toUpperCase().slice(0, 8))}
                    maxLength={8}
                    inputMode="text"
                    placeholder="ABC123"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 tracking-[0.4em] transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                  />
                  <p className="mt-2 text-sm text-white/50">6–8 letters/numbers. Leave blank if none.</p>
                </div>

                <label className="inline-flex items-center gap-3 text-sm text-white/80">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/30 bg-white/10 accent-[#851825]"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                  />
                  I want spicy updates & beta invites.
                </label>

                <div>
                  <SplatCaptcha
                    className="my-4 flex justify-center"
                    onVerify={setTurnstileToken}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                  />
                  <p className="text-xs text-white/50">Protected by Turnstile. We hate bots.</p>
                </div>

                {error && (
                  <p id="signup-error" ref={errorRef} tabIndex={-1} className="text-sm text-red-400" aria-live="assertive">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#851825] py-3 font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/60 disabled:scale-100 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Submitting…
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <footer className="text-center text-xs text-white/50">
                  By signing up, you agree to receive emails from SPL@T. Unsubscribe anytime.
                </footer>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
