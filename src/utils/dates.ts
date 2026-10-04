const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2024-04" → { y: 2024, m: 4 } */
export function parseMonth(iso: string): { y: number; m: number } {
  const [y, m] = iso.split('-').map(Number);
  return { y, m };
}

export function formatMonth(iso: string | null): string {
  if (!iso) return 'Present';
  const { y, m } = parseMonth(iso);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${formatMonth(end)}`;
}

/** Whole months between two ISO months (inclusive start, exclusive end). */
export function monthsBetween(start: string, end: string | null, now = new Date()): number {
  const a = parseMonth(start);
  const b = end ? parseMonth(end) : { y: now.getFullYear(), m: now.getMonth() + 1 };
  return Math.max(0, (b.y - a.y) * 12 + (b.m - a.m));
}

export function formatDuration(start: string, end: string | null): string {
  const months = monthsBetween(start, end);
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ') || '< 1 mo';
}

/** Months since a date, converted to whole years (floor). */
export function yearsSince(start: string, now = new Date()): number {
  return Math.floor(monthsBetween(start, null, now) / 12);
}
