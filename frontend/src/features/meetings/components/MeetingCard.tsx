import { CalendarDays, Users } from "lucide-react";
import type { Meeting } from "../types/meeting";

interface Props{
    meeting:Meeting;
}

export default function MeetingCard({
    meeting,
}:Props){

return(

<div
className="
group
rounded-3xl
border
border-border
bg-background/70
p-6
shadow-sm
transition
hover:-translate-y-1
hover:shadow-xl
"
>

<div className="mb-5 flex items-center justify-between">

<h2 className="font-bold text-lg">
{meeting.title}
</h2>

<span
className={`
rounded-full
px-3
py-1
text-xs
font-semibold

${
meeting.status==="live"
?"bg-red-500 text-white"
:
meeting.status==="upcoming"
?"bg-[var(--synapse-accent-500)] text-white"
:
"bg-muted"
}
`}
>

{meeting.status}

</span>

</div>

<p className="mb-6 text-muted-foreground">

Hosted by {meeting.host}

</p>

<div className="flex justify-between text-sm">

<div className="flex items-center gap-2">

<CalendarDays size={16}/>

{meeting.date}

</div>

<div className="flex items-center gap-2">

<Users size={16}/>

{meeting.participants}

</div>

</div>

</div>

);

}