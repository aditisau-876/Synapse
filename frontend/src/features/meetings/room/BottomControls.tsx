import {
Mic,
Video,
PhoneOff,
Monitor,
MessageCircle,
Users,
Settings,
} from "lucide-react";

const buttons=[

{
icon:Mic,
},

{
icon:Video,
},

{
icon:Monitor,
},

{
icon:MessageCircle,
},

{
icon:Users,
},

{
icon:Settings,
},

];

export default function BottomControls(){

return(

<div
className="
flex
justify-center
gap-4
border-t
border-border
bg-background/90
p-5
backdrop-blur-xl
"
>

{buttons.map((button,index)=>{

const Icon=button.icon;

return(

<button

key={index}

className="
flex
h-12
w-12
items-center
justify-center
rounded-full
bg-muted
transition
hover:scale-110
hover:bg-[var(--synapse-accent-500)]
hover:text-white
"

>

<Icon size={20}/>

</button>

);

})}

<button
className="
ml-6
flex
h-14
w-14
items-center
justify-center
rounded-full
bg-red-600
text-white
transition
hover:bg-red-700
"
>

<PhoneOff/>

</button>

</div>

);

}