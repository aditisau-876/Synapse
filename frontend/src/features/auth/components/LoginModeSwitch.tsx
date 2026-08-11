import { useState } from "react";


export default function LoginModeSwitch(){

const [mode,setMode]=useState<
"email"|"phone"
>("email");


return (

<div
className="
flex
rounded-xl
bg-muted
p-1
"
>


<button

onClick={()=>setMode("email")}

className={`
flex-1
rounded-lg
py-2
text-sm
transition

${
mode==="email"
?
"bg-background shadow"
:
"text-muted-foreground"
}

`}

>

Email

</button>



<button

onClick={()=>setMode("phone")}

className={`
flex-1
rounded-lg
py-2
text-sm
transition

${
mode==="phone"
?
"bg-background shadow"
:
"text-muted-foreground"
}

`}

>

Phone

</button>



</div>

);

}