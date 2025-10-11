"use client";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      if (!email) throw new Error("Email is required");
      if (!token) throw new Error("Please complete CAPTCHA");

      const res = await fetch("/api/signup-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      if (!res.ok) throw new Error("Signup failed");
      setStatus("success");
      setEmail("");
      setToken("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#000",
        color: "white",
        padding: "2rem",
      }}
    >
      <h1 style={{ color: "#ff003c", fontSize: "2rem", marginBottom: "1rem" }}>
        Join SPL@T Today
      </h1>
      <p style={{ color: "#aaa", marginBottom: "2rem" }}>
        Sign up to stay in the loop — we promise zero spam, just hot updates.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#111",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #ff003c",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          type="email"
          required
          placeholder="Your email address"
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

        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
          onSuccess={(value) => setToken(value)}
          options={{ theme: "dark" }}
        />

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
            Something went wrong — try again.
          </p>
        )}
      </form>
    </div>
  );
}
