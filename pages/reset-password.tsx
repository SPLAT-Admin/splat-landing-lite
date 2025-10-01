"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PasswordField from "@/components/ui/PasswordField";
import { getSupabaseClient } from "@/lib/supabaseClient";

const supabase = getSupabaseClient();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Mode = "request" | "reset" | "success";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const emailInvalid = email.length > 0 && !EMAIL_RE.test(email.trim());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;

    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const type = params.get("type");
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (type === "recovery" && access_token) {
      setLoading(true);
      supabase.auth
        .setSession({ access_token, refresh_token: refresh_token || "" })
        .then(({ error: sessionError }) => {
          if (sessionError) {
            setError(sessionError.message || "Unable to validate recovery link.");
            return;
          }
          setMode("reset");
          setMessage("Enter a new password to get back in.");
          if (typeof window !== "undefined") {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const handleRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const origin = typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || "";
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/reset-password`,
      });

      if (resetError) {
        throw new Error(resetError.message || "Failed to send reset email.");
      }

      setMessage("Check your inbox for a reset link. It expires soon—move fast.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwordValid) {
      setError("Choose a stronger password to continue.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        throw new Error(updateError.message || "Failed to update password.");
      }
      setMode("success");
      setMessage("Password updated. Redirecting to login…");
      setTimeout(() => router.replace("/login"), 2500);
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password | SPL@T</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-[#180005] via-[#2d0010] to-black flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-black/80 p-8 shadow-[0_0_45px_rgba(133,24,37,0.35)] backdrop-blur">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              <span className="text-crimson">SPL@T</span> Password Reset
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Lose the key? We'll crack the vault back open.
            </p>
          </header>

          {mode === "request" && (
            <form className="space-y-5" onSubmit={handleRequest}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs uppercase tracking-wide text-white/60">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-crimson ${
                    emailInvalid ? "border-red-500" : "border-white/20"
                  }`}
                  placeholder="you@usesplat.com"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
              {message && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-900/10 px-4 py-3 text-sm text-emerald-200">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-crimson py-3 text-center text-sm font-semibold uppercase tracking-wide text-acid-white transition hover:bg-crimson/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>
          )}

          {mode === "reset" && (
            <form className="space-y-5" onSubmit={handleReset}>
              <PasswordField
                value={password}
                onChange={setPassword}
                enforceStrength
                onValidityChange={setPasswordValid}
                label="New Password"
                placeholder="New secret"
              />

              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}
              {message && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-900/10 px-4 py-3 text-sm text-emerald-200">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-crimson py-3 text-center text-sm font-semibold uppercase tracking-wide text-acid-white transition hover:bg-crimson/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Updating…" : "Update Password"}
              </button>
            </form>
          )}

          {mode === "success" && (
            <div className="space-y-5 text-center">
              {message && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-900/10 px-4 py-3 text-sm text-emerald-200">
                  {message}
                </div>
              )}
              <button
                onClick={() => router.replace("/login")}
                className="w-full rounded-full bg-crimson py-3 text-center text-sm font-semibold uppercase tracking-wide text-acid-white transition hover:bg-crimson/90"
              >
                Head to Login
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
