import { Layers } from "lucide-react";

import { useWhiteboard } from "../../hooks/useWhiteboard";

export default function LayersPanel(){

const{
elements
}=useWhiteboard();

return(

<div
className="
fixed
right-8
bottom-60
w-72
rounded-3xl
border
border-white/10
bg-slate-900/95
p-5
shadow-xl
"
>

<div
className="
mb-5
flex
items-center
gap-2
"
>

<Layers/>

<h3
className="
font-bold
"
>

Layers

</h3>

</div>

<div
className="
space-y-3
"
>

{

elements.length===0

?

(

<p
className="
text-sm
text-muted-foreground
"
>

No layers

</p>

)

:

elements.map((element,index)=>(

<div
key={element.id}
className="
rounded-xl
bg-white/5
p-3
"
>

Layer {index+1}

<span
className="
ml-2
text-xs
text-muted-foreground
"
>

{element.tool}

</span>

</div>

))

}

</div>

</div>

);

}