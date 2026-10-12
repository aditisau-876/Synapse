/** Date and time helpers. Everything is rendered in the viewer's local time. */

export function parseDate(value: string | number | Date | null | undefined): Date | null {
  if (value === null || value === undefined || value === "") return null;
  // The API stores UTC but SQLite drops the "Z"; treat zone-less ISO strings as UTC.
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T[\d:.]+$/.test(value)) {
    value = value + "Z";
  }
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function daysBetween(from: Date, to: Date) {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime();
  return Math.round((end - start) / 86_400_000);
}

/** "9:10 AM" */
export function formatClock(value: string | number | Date | null | undefined) {
  const date = parseDate(value);
  if (!date) return typeof value === "string" ? value : "";
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/** Divider label in a thread: "Today", "Yesterday", "Monday", "12 Oct 2026". */
export function dayLabel(value: string | number | Date) {
  const date = parseDate(value);
  if (!date) return "";
  const diff = daysBetween(date, new Date());
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff > 1 && diff < 7) return date.toLocaleDateString([], { weekday: "long" });
  return date.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
}

/** Right-hand stamp on a conversation row. */
export function listTimestamp(value: string | number | Date | null | undefined) {
  const date = parseDate(value);
  if (!date) return typeof value === "string" ? value : "";
  const diff = daysBetween(date, new Date());
  if (diff === 0) return formatClock(date);
  if (diff === 1) return "Yesterday";
  if (diff > 1 && diff < 7) return date.toLocaleDateString([], { weekday: "short" });
  return date.toLocaleDateString([], { day: "numeric", month: "short" });
}

/** "just now", "5 min ago", "2 h ago", then a date. */
export function relativeTime(value: string | number | Date | null | undefined) {
  const date = parseDate(value);
  if (!date) return "";
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 45) return "just now";
  if (seconds < 3600) return `${Math.max(1, Math.round(seconds / 60))} min ago`;
  if (seconds < 86_400) return `${Math.round(seconds / 3600)} h ago`;
  return listTimestamp(date);
}

/** "Today, 3:00 PM" / "Tomorrow, 9:30 AM" / "Mon 12 Oct, 3:00 PM" */
export function formatWhen(value: string | number | Date | null | undefined) {
  const date = parseDate(value);
  if (!date) return "";
  const diff = daysBetween(new Date(), date);
  const time = formatClock(date);
  if (diff === 0) return `Today, ${time}`;
  if (diff === 1) return `Tomorrow, ${time}`;
  if (diff === -1) return `Yesterday, ${time}`;
  return `${date.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" })}, ${time}`;
}

/** 3725 -> "1:02:05", 125 -> "2:05" */
export function formatDuration(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(h > 0 ? 2 : 1, "0");
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Local `datetime-local` input value (YYYY-MM-DDTHH:mm), `minutesFromNow` ahead. */
export function localInputValue(minutesFromNow = 0) {
  const d = new Date(Date.now() + minutesFromNow * 60_000);
  d.setSeconds(0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
