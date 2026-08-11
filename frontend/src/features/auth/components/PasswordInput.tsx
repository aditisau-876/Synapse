import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";


interface Props {
  placeholder?: string;

  onChange?: (
    value:string
  ) => void;
}


export default function PasswordInput({
  placeholder="Password",
  onChange
}:Props){


const [show,setShow]=useState(false);


return (

<div
className="
relative
"
>


<Input

type={
show
?
"text"
:
"password"
}

placeholder={placeholder}

onChange={(e)=>
onChange?.(e.target.value)
}

className="
h-12
pr-12
"

/>



<button

type="button"

onClick={()=>
setShow(!show)
}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-muted-foreground
hover:text-foreground
"

>


{
show
?
<EyeOff size={19}/>
:
<Eye size={19}/>
}


</button>


</div>

);

}