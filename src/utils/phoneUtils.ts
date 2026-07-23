/**
 * Extracts a primary numeric phone number suitable for standard tel: links.
 * Example: "02-120 (다산콜센터)" -> "02-120"
 * Example: "031-228-2114 / 1899-3300" -> "031-228-2114"
 */
export function extractTelNumber(phoneStr: string): string {
  if (!phoneStr) return '';
  // Split by slash if multiple numbers exist, take first
  const firstPart = phoneStr.split('/')[0].trim();
  // Remove parenthetical descriptions like (다산콜센터)
  const cleaned = firstPart.replace(/\([^)]*\)/g, '').trim();
  // Remove non-digit and non-hyphen chars except plus
  return cleaned.replace(/[^\d+x-]/g, '');
}

/**
 * Normalizes user search query for Korean matching (removing spaces, hyphens).
 */
export function normalizeSearchTerm(term: string): string {
  return term.toLowerCase().replace(/\s+|-/g, '');
}
