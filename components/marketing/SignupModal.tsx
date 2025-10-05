"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignupModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("email_signups").insert([{ email }]);

    if (error) setError("Something went wrong — try again!");
    else setSuccess(true);
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-neutral-900 text-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>

        {!success ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Join SPL@T</h2>
            <p className="text-gray-400 mb-6 text-sm">
              Get exclusive updates, drops, and early access to merch.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl bg-neutral-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 transition font-medium py-3"
              >
                {loading ? "Joining..." : "Sign me up"}
              </button>
            </form>
            {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">You’re in 💥</h3>
            <p className="text-gray-400">Check your inbox for SPL@T updates.</p>
            <button
              onClick={onClose}
              className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
