"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getSupabaseClient } from "@/lib/supabaseClient";

const supabase = getSupabaseClient();
import PasswordField from "@/components/PasswordField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const decodeJwtPayload = (token: string | null) => {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = typeof window !== "undefined" ? window.atob(padded) : Buffer.from(padded, "base64").toString("utf8");
    return JSON.parse(json);
  } catch (err) {
    console.warn("Failed to decode JWT", err);
    return null;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailInvalid = touched.email && !EMAIL_RE.test(email.trim());
  const passwordInvalid = touched.password && !passwordValid;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const role = decodeJwtPayload(data.session?.access_token ?? null)?.user_role;
      if (role === "admin") {
        router.replace("/admin/promos");
      }
    });
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ email: true, password: true });

    if (!EMAIL_RE.test(email.trim()) || !passwordValid) {
      setError("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (signInError) {
      setError(signInError.message || "Unable to log in. Check your credentials.");
      setLoading(false);
      return;
    }

    const role = decodeJwtPayload(data.session?.access_token ?? null)?.user_role;
    if (role === "admin") {
      router.replace("/admin/promos");
    } else {
      setError("You do not have access to the admin portal.");
      await supabase.auth.signOut();
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>SPL@T Admin Login</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-[#180005] via-[#30030d] to-black flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/80 p-8 shadow-[0_0_45px_rgba(133,24,37,0.35)] backdrop-blur">
          <header className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.6em] text-white/50">Secure Access</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white">
              <span className="text-crimson">SPL@T</span> Admin Login
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Bold. Secure. For authorized humans only.
            </p>
          </header>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs uppercase tracking-wide text-white/60">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                className={`w-full rounded-xl border px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-crimson ${
                  emailInvalid ? "border-red-500" : "border-white/20"
                }`}
                placeholder="you@usesplat.com"
              />
              {emailInvalid && <p className="text-sm text-red-400">Enter a valid email address.</p>}
            </div>

            <div className="space-y-2">
              <PasswordField
                id="password"
                value={password}
                onChange={(val) => {
                  setPassword(val);
                  if (!touched.password) {
                    setTouched((prev) => ({ ...prev, password: true }));
                  }
                }}
                enforceStrength={false}
                onValidityChange={setPasswordValid}
                label="Password"
                placeholder="Enter your password"
              />
              {passwordInvalid && (
                <p className="text-sm text-red-400">Password is required.</p>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-crimson py-3 text-center text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-crimson/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Authenticating…" : "Enter the SPL@Tverse"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
