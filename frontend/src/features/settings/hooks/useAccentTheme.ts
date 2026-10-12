import { useEffect, useState } from "react";

export type AccentTheme = "teal" | "blue" | "violet" | "pink" | "green" | "orange";

export const ACCENTS: AccentTheme[] = ["teal", "blue", "violet", "pink", "green", "orange"];
const STORAGE_KEY = "synapse-accent";

function readSaved(): AccentTheme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (ACCENTS as string[]).includes(saved)) return saved as AccentTheme;
  } catch {
    /* storage can be blocked */
  }
  return "teal";
}

/** Call once at startup so the saved accent applies on every page, not only Appearance. */
export function initAccent() {
  document.documentElement.setAttribute("data-accent", readSaved());
}

export function useAccentTheme() {
  const [accent, setAccentState] = useState<AccentTheme>(readSaved);

  const setAccent = (value: AccentTheme) => {
    setAccentState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
  }, [accent]);

  return { accent, setAccent };
}
