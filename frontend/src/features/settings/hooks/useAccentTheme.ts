import { useEffect, useState } from "react";

export type AccentTheme =
  | "violet"
  | "pink"
  | "blue"
  | "green"
  | "orange";

const STORAGE_KEY = "synapse-accent";

export function useAccentTheme() {
  const [accent, setAccentState] = useState<AccentTheme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (
      saved === "violet" ||
      saved === "pink" ||
      saved === "blue" ||
      saved === "green" ||
      saved === "orange"
    ) {
      return saved;
    }

    return "violet";
  });

  const setAccent = (value: AccentTheme) => {
    setAccentState(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-accent",
      accent
    );
  }, [accent]);

  return {
    accent,
    setAccent,
  };
}