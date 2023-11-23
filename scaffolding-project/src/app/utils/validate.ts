export function isValidString(
  s: unknown,
  { minLength, maxLength }: { minLength?: number; maxLength?: number },
): boolean {
  if (typeof s !== 'string') {
    return false;
  }
  if (minLength && minLength > s.length) return false;
  if (maxLength && maxLength < s.length) return false;
  return true;
}
