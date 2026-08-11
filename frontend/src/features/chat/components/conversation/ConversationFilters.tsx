const filters = [
  "All",
  "Unread",
  "Groups",
  "Archived",
];

interface Props {
  active: string;
  setActive: (filter: string) => void;
}

export default function ConversationFilters({
  active,
  setActive,
}: Props) {
  return (
    <div
      className="
        flex
        gap-2
        overflow-x-auto
        px-4
        pb-3

        scrollbar-none
      "
    >
      {filters.map((filter) => {
        const isActive = active === filter;

        return (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`
              shrink-0
              rounded-full
              px-4
              py-2
              text-sm
              font-medium

              transition-all
              duration-200

              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--synapse-accent-500)]/40

              ${
                isActive
                  ? `
                    bg-gradient-to-r
                    from-[var(--synapse-accent-600)]
to-[var(--synapse-accent-300)]

                    text-white

                    shadow-md
                    shadow-[var(--synapse-accent-soft)]

                    scale-[1.02]
                  `
                  : `
                    bg-muted/60
                    text-muted-foreground

                    hover:bg-[var(--synapse-accent-500)]/10
                    hover:text-[var(--synapse-accent-500)]

                    dark:hover:bg-[var(--synapse-accent-500)]/10
                    dark:hover:text-[var(--synapse-accent-500)]

                    hover:shadow-sm
                  `
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}