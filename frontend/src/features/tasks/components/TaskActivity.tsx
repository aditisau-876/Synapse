import {
  Clock3,
} from "lucide-react";

const activity=[

"Alex assigned task",

"Emily changed priority",

"Aditi updated checklist",

"Task moved to Review"

];

export default function TaskActivity(){

return(

<div>

<h3
className="
mb-5
text-lg
font-bold
"
>

Activity

</h3>

<div className="space-y-4">

{

activity.map((item,index)=>(

<div

key={index}

className="
flex
items-center
gap-3
rounded-xl
bg-muted
p-3
"

>

<Clock3
size={16}
className="text-[var(--synapse-accent-500)]"
/>

<div>

<p>{item}</p>

<p
className="
text-xs
text-muted-foreground
"
>

2 hours ago

</p>

</div>

</div>

))

}

</div>

</div>

);

}