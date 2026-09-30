import {
  Mic,
  MicOff,
} from "lucide-react";

interface Props{
  name:string;
  speaking?:boolean;
  muted?:boolean;
  cameraOff?:boolean;
}

export default function ParticipantTile({
  name,
  speaking=false,
  muted=false,
  cameraOff=false,
}:Props){

return(

<div
className={`
relative
overflow-hidden
rounded-3xl
border
bg-gradient-to-br
from-slate-800
to-slate-900
aspect-video

${speaking
?"border-[var(--synapse-accent-500)] shadow-[0_0_35px_rgba(139,92,246,.45)]"
:"border-white/10"}
`}
>

<div
className="
absolute
inset-0
flex
items-center
justify-center
"
>

{cameraOff?

<div
className="
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-gradient-to-r
from-[var(--synapse-accent-500)]
to-indigo-600
text-3xl
font-black
text-white
"
>
{name.charAt(0)}
</div>

:

<img
src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
className="h-full w-full object-cover"
/>

}

</div>

<div
className="
absolute
bottom-4
left-4
flex
items-center
gap-2
rounded-full
bg-black/60
px-3
py-2
backdrop-blur-xl
"
>

<span className="text-sm text-white">
{name}
</span>

{muted?

<MicOff
size={16}
className="text-red-400"
/>

:

<Mic
size={16}
className="text-emerald-400"
/>

}

</div>

</div>

);

}