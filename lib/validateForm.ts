export type ValidationRules = {
  patterns?: Record<string, RegExp>;
  min?: Record<string, number>;
  max?: Record<string, number>;
};

export function validateForm<T extends Record<string, unknown>>(
  body: T,
  required: string[] = [],
  rules: ValidationRules = {}
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const isEmpty = (value: unknown): boolean => {
    if (value === undefined || value === null) return true;
    if (typeof value === "string") return value.trim().length === 0;
    return false;
  };

  for (const field of required) {
    const value = body[field as keyof T];
    if (isEmpty(value)) {
      errors.push(`${field} is required`);
    }
  }

  if (rules.patterns) {
    for (const [field, pattern] of Object.entries(rules.patterns)) {
      const rawValue = body[field as keyof T];
      if (rawValue === undefined || rawValue === null) continue;
      const stringValue = typeof rawValue === "string" ? rawValue.trim() : String(rawValue);
      if (stringValue.length > 0 && !pattern.test(stringValue)) {
        errors.push(`${field} is invalid`);
      }
    }
  }

  if (rules.min) {
    for (const [field, min] of Object.entries(rules.min)) {
      const rawValue = body[field as keyof T];
      if (typeof rawValue === "string" && rawValue.trim().length < min) {
        errors.push(`${field} must be at least ${min} characters`);
      }
    }
  }

  if (rules.max) {
    for (const [field, max] of Object.entries(rules.max)) {
      const rawValue = body[field as keyof T];
      if (typeof rawValue === "string" && rawValue.trim().length > max) {
        errors.push(`${field} must be at most ${max} characters`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
