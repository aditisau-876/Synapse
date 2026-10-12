/** Small helpers for rendering people consistently. */

export function initials(name: string | undefined | null) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function firstName(name: string | undefined | null) {
  return (name ?? "").trim().split(/\s+/)[0] || "there";
}

// A curated set of hues that sit well beside the teal brand colour.
const HUES = [172, 205, 255, 28, 338, 95, 48, 190, 300, 12];

/** Stable hue for a name, so a person keeps the same colour everywhere. */
export function hueFor(seed: string | undefined | null) {
  const text = seed ?? "";
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return HUES[hash % HUES.length];
}
