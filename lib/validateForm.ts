interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateForm(data: Record<string, any>, requiredFields: string[]): ValidationResult {
  const errors: string[] = [];

  requiredFields.forEach((field) => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push(`${field} is required`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
