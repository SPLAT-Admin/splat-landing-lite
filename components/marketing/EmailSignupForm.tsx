"use client";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldRender(true), 100);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      alert("Please complete the CAPTCHA first.");
      return;
    }

    const res = await fetch("/api/signup-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token }),
    });

    if (res.ok) {
      alert("Thanks for joining SPL@T!");
      setEmail("");
      setToken("");
      setShouldRender(false);
      setTimeout(() => setShouldRender(true), 100);
    } else {
      const { error } = await res.json();
      alert(error || "Signup failed—try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg p-3 bg-neutral-900 text-white"
      />

      {shouldRender && (
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
          onSuccess={(value) => setToken(value)}
          options={{ theme: "dark" }}
        />
      )}

      <button
        type="submit"
        className="w-full bg-deep-crimson text-white font-semibold rounded-xl p-3"
      >
        Sign me up
      </button>
    </form>
  );
}
