// pages/signup.tsx
import Head from "next/head";
import { useState } from "react";
import EmailSignupForm from "@/components/marketing/EmailSignupForm";

export default function SignupPage() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  return (
    <>
      <Head>
        <title>Join the SPL@T Waitlist</title>
        <meta
          name="description"
          content="Drop your email to get early access to SPL@T updates and private beta drops."
        />
      </Head>

      <main className="min-h-screen bg-jet-black px-6 py-24 text-acid-white">
        <div className="mx-auto max-w-3xl space-y-10 text-center">
          {/* Page Title + Subtitle */}
          <h1 className="text-[44pt] font-extrabold tracking-tight text-deep-crimson drop-shadow-lg">
            Join the SPL@T Waitlist
          </h1>
          <p className="text-[22pt] font-bold text-acid-white">
            Be the first to enter the SPL@TVerse 💦
          </p>
          <p className="text-lg text-acid-white/80 max-w-2xl mx-auto">
            Drop your email below and we’ll ping you with early drops, updates,
            and beta invites.
          </p>

          {/* Signup Form */}
          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-lg">
            {status === "idle" ? (
              <EmailSignupForm />
            ) : (
              <p className="text-xl font-bold text-emerald-400">
                ✅ You’re on the list! Redirecting…
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
