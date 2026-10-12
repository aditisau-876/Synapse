import { useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

const themes = [
  {
    id: "light",
    title: "Light",
    icon: Sun,
  },
  {
    id: "dark",
    title: "Dark",
    icon: Moon,
  },
  {
    id: "system",
    title: "System",
    icon: Monitor,
  },
];

export default function ThemeSelector() {
  const [selected, setSelected] = useState("system");

  return (
    <div className="grid grid-cols-3 gap-4">
      {themes.map((theme) => {
        const Icon = theme.icon;

        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => setSelected(theme.id)}
            className={`rounded-2xl border p-5 transition-all

            ${
              selected === theme.id
                ? "border-[color:var(--synapse-accent-500)] bg-[var(--synapse-accent-500)]/10"
                : "border-border hover:border-[color:var(--synapse-accent-500)]/50"
            }`}
          >
            <Icon className="mx-auto mb-2" size={24} />

            <p className="text-sm font-medium">{theme.title}</p>
          </button>
        );
      })}
    </div>
  );
}