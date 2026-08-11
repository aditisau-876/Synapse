import {
  Send,
} from "lucide-react";

export default function CommentsPanel(){

return(

<div>

<h3
className="
mb-4
text-lg
font-bold
"
>

Comments

</h3>

<div className="space-y-4">

<div className="rounded-xl bg-muted p-4">

<p className="font-semibold">

Alex

</p>

<p className="mt-2 text-sm">

Authentication looks good.

</p>

</div>

<div className="rounded-xl bg-muted p-4">

<p className="font-semibold">

Emily

</p>

<p className="mt-2 text-sm">

Let's improve validation.

</p>

</div>

</div>

<div
className="
mt-5
flex
gap-3
"
>

<input

placeholder="Write comment..."

className="
flex-1
rounded-xl
border
bg-background
px-4
py-3
outline-none
"

/>

<button
className="
rounded-xl
bg-[var(--synapse-accent-500)]
p-3
text-white
"
>

<Send size={18}/>

</button>

</div>

</div>

);

}