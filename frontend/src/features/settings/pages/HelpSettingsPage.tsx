import {
  BookOpen,
  MessageCircle,
  ShieldQuestion,
} from "lucide-react";

export default function HelpSettingsPage() {
  const options = [
    {
      icon: BookOpen,
      title: "Help Center",
      description:
        "Find guides and answers to common questions.",
    },
    {
      icon: MessageCircle,
      title: "Contact Support",
      description:
        "Get help from the Synapse support team.",
    },
    {
      icon: ShieldQuestion,
      title: "Safety & Security",
      description:
        "Learn how Synapse protects your account and data.",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          Help & Support
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Find answers and get support for Synapse.
        </p>
      </div>

      <div className="space-y-3">
        {options.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              type="button"
              className="
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                border
                border-border
                bg-card
                p-5
                text-left
                transition
                hover:bg-muted/50
              "
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--synapse-accent-500)]/10 text-[var(--synapse-accent-500)]">
                <Icon size={21} />
              </div>

              <div>
                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}