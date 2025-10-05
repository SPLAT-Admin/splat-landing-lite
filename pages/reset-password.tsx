"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import zxcvbn from "zxcvbn";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const strengthLabels = ["Very Weak", "Weak", "Okay", "Strong", "SPL@T-worthy 💦"];

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    const result = zxcvbn(val);
    setScore(result.score);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      alert("Error resetting password: " + error.message);
    } else {
      alert("Password updated! You can now log in.");
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-bold">Reset Password</h1>
      <form onSubmit={handleReset} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <div className="h-2 bg-gray-200 rounded">
          <div
            className={`h-2 rounded transition-all duration-300 ${[
              "bg-red-600 w-1/5",
              "bg-orange-500 w-2/5",
              "bg-yellow-500 w-3/5",
              "bg-green-500 w-4/5",
              "bg-purple-600 w-full",
            ][score]}`}
          />
        </div>
        <p className="text-sm font-medium">{strengthLabels[score]}</p>

        <button
          type="submit"
          disabled={loading || score < 2}
          className="bg-red-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
