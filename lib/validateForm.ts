// lib/validateForm.ts
export type WaitlistInput = {
  email: string;
  name?: string;
  marketing?: boolean;
  tos: boolean;
};

export type ValidationResult =
  | { ok: true; data: WaitlistInput }
  | { ok: false; error: string };

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateWaitlist(input: Record<string, unknown>): ValidationResult {
  const email = String(input.email ?? "").trim();
  const name = String(input.name ?? "").trim() || undefined;
  const marketing = Boolean(input.marketing);
  const tos = Boolean(input.tos);

  if (!email) return { ok: false, error: "Email is required." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Invalid email." };
  if (!tos) return { ok: false, error: "You must accept the Terms." };
  if (name && name.length > 120) return { ok: false, error: "Name too long." };

  return { ok: true, data: { email, name, marketing, tos } };
}
