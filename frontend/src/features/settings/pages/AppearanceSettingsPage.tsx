import {
  Monitor,
  Moon,
  Sun,
  Check,
  Palette,
} from "lucide-react";
import { useTheme } from "next-themes";

import {
  useAccentTheme,
  type AccentTheme,
} from "../hooks/useAccentTheme";

const themes = [
  {
    value: "light",
    label: "Light",
    description: "Use a bright interface.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "Use a dark interface.",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description: "Follow your device preference.",
    icon: Monitor,
  },
] as const;

const accentThemes: {
  value: AccentTheme;
  label: string;
  description: string;
  color: string;
  softColor: string;
}[] = [
  { value: "teal", label: "Teal", description: "The Synapse default.", color: "#0c8070", softColor: "rgba(12, 128, 112, 0.12)" },
  { value: "blue", label: "Blue", description: "Cool and familiar.", color: "#2d5fd3", softColor: "rgba(45, 95, 211, 0.12)" },
  { value: "violet", label: "Violet", description: "Quiet and focused.", color: "#6b4cd1", softColor: "rgba(107, 76, 209, 0.12)" },
  { value: "pink", label: "Rose", description: "Warm and friendly.", color: "#c2255c", softColor: "rgba(194, 37, 92, 0.12)" },
  { value: "green", label: "Green", description: "Fresh and balanced.", color: "#25804a", softColor: "rgba(37, 128, 74, 0.12)" },
  { value: "orange", label: "Orange", description: "Warm and energetic.", color: "#b8530b", softColor: "rgba(184, 83, 11, 0.12)" },
];

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme();
  const { accent, setAccent } = useAccentTheme();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--synapse-accent-500)]/10 text-brand">
            <Palette size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Appearance
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Customize how Synapse looks on your device.
            </p>
          </div>
        </div>
      </div>

      {/* Interface Theme */}
      <section
        className="
          rounded-3xl
          border
          border-border
          bg-card
          p-6
        "
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Interface theme
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose whether Synapse uses light, dark, or system appearance.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">

          {themes.map((item) => {
            const Icon = item.icon;
            const selected = theme === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setTheme(item.value)}
                className={`
                  group
                  relative
                  rounded-2xl
                  border
                  p-5
                  text-left
                  transition-all
                  duration-200

                  ${
                    selected
                      ? "border-[color:var(--synapse-accent-500)] bg-[var(--synapse-accent-500)]/10"
                      : "border-border bg-background hover:border-[color:var(--synapse-accent-500)]/40 hover:bg-muted/50"
                  }
                `}
              >

                {/* Selected check */}
                {selected && (
                  <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--synapse-accent-500)] text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    transition-colors

                    ${
                      selected
                        ? "bg-[var(--synapse-accent-500)] text-white"
                        : "bg-muted text-muted-foreground group-hover:bg-[var(--synapse-accent-500)]/10 group-hover:text-brand"
                    }
                  `}
                >
                  <Icon size={21} />
                </div>

                <p className="mt-4 font-semibold">
                  {item.label}
                </p>

                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {item.description}
                </p>

              </button>
            );
          })}

        </div>
      </section>

      {/* Accent Color */}
      <section
        className="
          rounded-3xl
          border
          border-border
          bg-card
          p-6
        "
      >

        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Accent color
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Personalize buttons, highlights, icons, and interactive elements.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {accentThemes.map((item) => {
            const selected = accent === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setAccent(item.value)}
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition-all
                  duration-200
                "
                style={{
                  borderColor: selected
                    ? item.color
                    : undefined,
                  backgroundColor: selected
                    ? item.softColor
                    : undefined,
                }}
              >

                {/* Color preview */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    shadow-sm
                  "
                  style={{
                    backgroundColor: item.color,
                  }}
                >
                  {selected && (
                    <Check
                      size={20}
                      className="text-white"
                      strokeWidth={3}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">

                  <p className="font-semibold">
                    {item.label}
                  </p>

                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.description}
                  </p>

                </div>

              </button>
            );
          })}

        </div>

      </section>

    </div>
  );
}