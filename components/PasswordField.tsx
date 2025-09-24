"use client";

import { useEffect, useMemo, useState } from "react";
import zxcvbn from "zxcvbn";

const STRENGTH_LABELS = ["Very Weak", "Weak", "Okay", "Strong", "Very Strong"];
const STRENGTH_COLORS = ["bg-red-600", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"];

const LOWER_RE = /[a-z]/;
const UPPER_RE = /[A-Z]/;
const DIGIT_RE = /[0-9]/;
const SYMBOL_RE = /[^A-Za-z0-9]/;

export interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  enforceStrength?: boolean;
  onValidityChange?: (isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  id?: string;
}

export function PasswordField({
  value,
  onChange,
  enforceStrength = false,
  onValidityChange,
  label = "Password",
  placeholder = "••••••••",
  id = "password",
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  const analysis = useMemo(() => (value ? zxcvbn(value) : null), [value]);
  const score = analysis?.score ?? 0;

  const checklist = useMemo(
    () => ({
      length: value.length >= 8,
      lower: LOWER_RE.test(value),
      upper: UPPER_RE.test(value),
      digit: DIGIT_RE.test(value),
      symbol: SYMBOL_RE.test(value),
    }),
    [value]
  );

  const meetsComplexity = useMemo(
    () => Object.values(checklist).every(Boolean),
    [checklist]
  );

  const isValid = enforceStrength
    ? value.length >= 8 && meetsComplexity && score >= 3
    : value.length > 0;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-white">
          {label}
        </label>
        {value && (
          <span className="text-xs uppercase tracking-wide text-white/60">
            {STRENGTH_LABELS[score]}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={enforceStrength ? "new-password" : "current-password"}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-black px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-crimson transition ${
            enforceStrength && !isValid && value.length > 0 ? "border-red-500" : "border-white/20"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-crimson hover:text-white"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full transition-all duration-300 ${value ? STRENGTH_COLORS[score] : "bg-white/20"}`}
          style={{ width: `${value ? ((score + 1) / 5) * 100 : 0}%` }}
        />
      </div>

      <ul className="grid gap-2 rounded-xl border border-white/10 bg-black/60 p-4 text-xs text-white/80 sm:grid-cols-2">
        {[{
          key: "length",
          label: "At least 8 characters",
        }, {
          key: "lower",
          label: "Contains lowercase letters",
        }, {
          key: "upper",
          label: "Contains uppercase letters",
        }, {
          key: "digit",
          label: "Contains a number",
        }, {
          key: "symbol",
          label: "Contains a symbol",
        }].map(({ key, label }) => {
          const passed = (checklist as Record<string, boolean>)[key];
          return (
            <li key={key} className="flex items-center gap-2">
              <span className={`text-base ${passed ? "text-emerald-400" : "text-red-400"}`}>
                {passed ? "✔" : "✖"}
              </span>
              <span className="text-xs font-medium">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PasswordField;
