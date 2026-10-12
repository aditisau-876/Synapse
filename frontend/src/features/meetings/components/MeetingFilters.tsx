import { Calendar, Clock3, Radio } from "lucide-react";

const filters = [
  {
    label: "All",
    icon: Calendar,
  },
  {
    label: "Upcoming",
    icon: Clock3,
  },
  {
    label: "Live",
    icon: Radio,
  },
];

export default function MeetingFilters() {
  return (
    <div className="mt-8 flex gap-3">

      {filters.map((filter) => {

        const Icon = filter.icon;

        return (

          <button
            key={filter.label}
            className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-border
            bg-background/70
            px-5
            py-3
            backdrop-blur-xl
            transition
            hover:border-[color:var(--synapse-accent-500)]
            hover:bg-[var(--synapse-accent-500)]/10
            "
          >

            <Icon size={18}/>

            {filter.label}

          </button>

        );

      })}

    </div>
  );
}