"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();
    console.log("Attempting login with:", cleanEmail, password);

    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      console.error("Login failed:", error);
      alert("Login error: " + error.message);
    } else {
      console.log("✅ Login successful, redirecting...");
      window.location.href = "/landingadmin/dashboard";
    }
  };

  const handleResetPassword = async () => {
    if (!email) return alert("Enter your email first.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Check your email for password reset link.");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow bg-black text-white">
      <h1 className="text-xl font-bold">SPL@T Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black text-white border border-gray-500 p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black text-white border border-gray-500 p-2 rounded"
          required
        />
        <button type="submit" className="bg-red-600 text-white p-2 rounded">
          Log In
        </button>
      </form>
      <button
        type="button"
        onClick={handleResetPassword}
        className="text-sm text-blue-500 underline"
      >
        Forgot password?
      </button>
    </div>
  );
}
