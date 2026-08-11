import type { ReactNode } from "react";


interface Props {
  title:string;
  description:string;
  children:ReactNode;
}


export default function AuthCard({
  title,
  description,
  children
}:Props){

return (

<div
className="
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-background/80
p-8
shadow-2xl
backdrop-blur-xl
"
>


<div className="mb-8">


<h1
className="
text-3xl
font-black
tracking-tight
"
>
{title}
</h1>


<p
className="
mt-3
text-sm
text-muted-foreground
"
>
{description}
</p>


</div>


{children}


</div>

);

}