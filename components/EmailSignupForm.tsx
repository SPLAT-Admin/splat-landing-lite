"use client";
import { useState } from "react";

export default function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/email-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Email signup failed", error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-3 py-2 rounded-md text-black"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-deep-crimson text-acid-white px-4 py-2 rounded-md hover:bg-red-700 transition"
      >
        {status === "loading" ? "Submitting..." : "Sign Up"}
      </button>
      {status === "success" && (
        <p className="text-green-400 text-sm mt-2">Thanks for signing up!</p>
      )}
      {status === "error" && <p className="text-red-400 text-sm mt-2">Something went wrong.</p>}
    </form>
  );
}
