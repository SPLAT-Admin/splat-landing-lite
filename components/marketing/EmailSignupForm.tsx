"use client";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function EmailSignupForm({ isOpen = true }: { isOpen?: boolean }) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => setShouldRender(true), 250);
      return () => clearTimeout(timeout);
    }
    setShouldRender(false);
    setToken(null);
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    if (!email || !token) {
      setStatus("error");
      alert("Please complete the CAPTCHA before signing up.");
      return;
    }

    try {
      const res = await fetch("/api/signup-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      if (!res.ok) throw new Error("Signup failed");

      setStatus("success");
      setEmail("");
      setToken(null);
      setShouldRender(false);
      setTimeout(() => setShouldRender(true), 250);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          background: "#1a1a1a",
          color: "white",
          border: "1px solid #333",
          borderRadius: "8px",
          padding: "0.75rem",
          fontSize: "1rem",
        }}
      />

      {shouldRender && (
        <div style={{ alignSelf: "center", marginBottom: "0.5rem" }}>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
            onSuccess={(value) => setToken(value)}
            options={{ theme: "dark" }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          background: "#a1002b",
          color: "white",
          borderRadius: "8px",
          padding: "0.75rem",
          fontWeight: "600",
          fontSize: "1rem",
          cursor: "pointer",
          opacity: status === "loading" ? 0.7 : 1,
          transition: "0.2s",
        }}
      >
        {status === "loading" ? "Signing you up..." : "Sign me up"}
      </button>

      {status === "success" && (
        <p style={{ color: "#6fff73", textAlign: "center" }}>
          You're in! Check your inbox for confirmation.
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "#ff4d4d", textAlign: "center" }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
