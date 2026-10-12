import {
  CalendarDays,
  Users,
  Video,
} from "lucide-react";

const stats = [

  {
    icon: CalendarDays,
    value: 12,
    title: "Scheduled",
  },

  {
    icon: Video,
    value: 3,
    title: "Live",
  },

  {
    icon: Users,
    value: 248,
    title: "Participants",
  },

];

export default function MeetingStats() {

  return (

    <div
      className="
      mt-10
      grid
      gap-6
      md:grid-cols-3
      "
    >

      {stats.map((stat)=>{

        const Icon = stat.icon;

        return(

          <div

            key={stat.title}

            className="
            rounded-3xl
            border
            border-border
            bg-background/70
            p-6
            backdrop-blur-xl
            "

          >

            <Icon
              className="
              mb-5
              text-brand
              "
            />

            <h2 className="text-4xl font-bold">
              {stat.value}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {stat.title}
            </p>

          </div>

        );

      })}

    </div>

  );

}