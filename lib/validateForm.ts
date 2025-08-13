// lib/validateForm.ts — prod-ready
// This file exposes TWO validators so existing imports keep working:
// 1) validateForm(data, requiredFields[, options]) -> { valid, errors }
// 2) validateWaitlist(input) -> { ok, data } | { ok: false, error }

export type WaitlistInput = {
  email: string;
  name?: string;
  marketing?: boolean;
  tos: boolean;
};

export type WaitlistValidationResult =
  | { ok: true; data: WaitlistInput }
  | { ok: false; error: string };

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Your original waitlist validator (kept intact for backwards compatibility)
 */
export function validateWaitlist(input: Record<string, unknown>): WaitlistValidationResult {
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

// ------------------------------------------------------------------------------------------
// Ambassador/API-friendly validator used like: validateForm(body, ["first_name","email",...])
// Returns a simple shape that matches your /pages/api/ambassador.ts expectations

export type SimpleValidation = { valid: boolean; errors: string[] };

export type ValidateFormOptions = {
  patterns?: Record<string, RegExp>; // e.g., { email: EMAIL_RE }
  min?: Record<string, number>;      // e.g., { qualifications_why: 5 }
  max?: Record<string, number>;      // e.g., { first_name: 100 }
  labels?: Record<string, string>;   // pretty names for error messages
};

export function validateForm<T extends Record<string, any>>(
  data: T,
  required: string[] = [],
  opts: ValidateFormOptions = {}
): SimpleValidation {
  const errors: string[] = [];
  const val = (v: any) => (typeof v === "string" ? v.trim() : v);

  // Required fields
  for (const field of required) {
    const v = val((data as any)[field]);
    if (v === undefined || v === null || v === "") {
      errors.push(`${opts.labels?.[field] || field} is required`);
    }
  }

  // Patterns (default email check if email exists)
  const patterns = { email: EMAIL_RE, ...(opts.patterns || {}) };
  for (const [field, re] of Object.entries(patterns)) {
    const v = (data as any)[field];
    if (v != null && String(v).trim() !== "" && !re.test(String(v).trim())) {
      errors.push(`${opts.labels?.[field] || field} is invalid`);
    }
  }

  // Min/Max length checks on strings
  for (const [field, min] of Object.entries(opts.min || {})) {
    const v = (data as any)[field];
    if (typeof v === "string" && v.trim().length < min) {
      errors.push(`${opts.labels?.[field] || field} must be at least ${min} characters`);
    }
  }
  for (const [field, max] of Object.entries(opts.max || {})) {
    const v = (data as any)[field];
    if (typeof v === "string" && v.trim().length > max) {
      errors.push(`${opts.labels?.[field] || field} must be at most ${max} characters`);
    }
  }

  return { valid: errors.length === 0, errors };
}
