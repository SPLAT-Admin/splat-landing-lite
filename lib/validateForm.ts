export function validateForm(body: Record<string, any>, requiredFields: string[]) {
  const errors = requiredFields.filter(field => !body[field] || String(body[field]).trim() === '');
  return { valid: errors.length === 0, errors };
}
