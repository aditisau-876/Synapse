import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function WelcomePage(){

return (

<div
className="
flex
min-h-screen
items-center
justify-center
px-6
"
>

<div
className="
max-w-xl
text-center
"
>

<Sparkles
className="
mx-auto
mb-8
text-[var(--synapse-accent-500)]
"
size={60}
/>

<h1
className="
text-5xl
font-black
"
>

Welcome to Synapse

</h1>

<p
className="
mt-6
text-lg
text-muted-foreground
leading-8
"
>

You're all set.

Start chatting, create meetings, collaborate with your team, and stay connected from anywhere.

</p>

<Button
className="
mt-10
h-12
px-10
"
>

Open Synapse

</Button>

</div>

</div>

);

}