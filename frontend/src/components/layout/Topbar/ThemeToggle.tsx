import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/40 p-1">
      <Button
        type="button"
        variant={theme === "light" ? "default" : "ghost"}
        size="icon"
        onClick={() => setTheme("light")}
        aria-label="Light theme"
      >
        <Sun className="size-4" />
      </Button>

      <Button
        type="button"
        variant={theme === "dark" ? "default" : "ghost"}
        size="icon"
        onClick={() => setTheme("dark")}
        aria-label="Dark theme"
      >
        <Moon className="size-4" />
      </Button>

      <Button
        type="button"
        variant={theme === "system" ? "default" : "ghost"}
        size="icon"
        onClick={() => setTheme("system")}
        aria-label="System theme"
      >
        <Monitor className="size-4" />
      </Button>
    </div>
  );
}