// KAALVATRA v2.0 - Unified Recent Date Formatting Utility
// Enforces that all displayed dispatches are formatted cleanly and strictly within 0-3 days

export function formatRecentDispatchDate(dateStr?: string): string {
  if (!dateStr) return '20 Sep, 2026 · Morning Edition';

  // If already formatted like "20 Sep, 2026" or "19 Sep, 2026"
  if (dateStr.includes('Sep') && !dateStr.includes('T')) {
    return dateStr;
  }

  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    const now = Date.now();
    const diffHours = Math.max(0, (now - d.getTime()) / (1000 * 60 * 60));

    const timeStr = d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    });

    if (diffHours <= 20) {
      return `20 Sep, 2026 · ${timeStr} IST`;
    } else if (diffHours <= 44) {
      return `19 Sep, 2026 · ${timeStr} IST`;
    } else if (diffHours <= 68) {
      return `18 Sep, 2026 · ${timeStr} IST`;
    } else {
      return `17 Sep, 2026 · ${timeStr} IST`;
    }
  } catch {
    return '20 Sep, 2026';
  }
}

export function formatArticleDate(dateStr?: string): string {
  return formatRecentDispatchDate(dateStr);
}
