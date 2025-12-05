"use client";
import EmailSignupForm from "@/components/EmailSignupForm";

export default function SignupModal() {
  // modal shell only; handles open/close animations
  return (
    <div className="p-6 bg-neutral-900 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Stay in the Loop</h2>
      <EmailSignupForm />
    </div>
  );
}
