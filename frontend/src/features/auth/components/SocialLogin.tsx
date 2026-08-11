import { Button } from "@/components/ui/button";


export default function SocialLogin(){

return (

<div className="space-y-3">


<div
className="
flex
items-center
gap-3
"
>

<div className="h-px flex-1 bg-border"/>

<span
className="
text-xs
text-muted-foreground
"
>
OR
</span>

<div className="h-px flex-1 bg-border"/>


</div>



<Button
variant="outline"
className="
w-full
h-12
"
>

Continue with Google

</Button>


</div>

);

}
