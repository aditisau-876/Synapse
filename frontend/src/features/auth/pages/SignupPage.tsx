import {
Link
} from "react-router-dom";

import {
useState
} from "react";


import AuthLayout
from "@/features/auth/components/AuthLayout";


import AuthCard
from "@/features/auth/components/AuthCard";


import PhoneInput
from "@/features/auth/components/PhoneInput";


import PasswordInput
from "@/features/auth/components/PasswordInput";


import PasswordStrength
from "@/features/auth/components/PasswordStrength";


import SocialLogin
from "@/features/auth/components/SocialLogin";


import {
Input
}
from "@/components/ui/input";


import {
Button
}
from "@/components/ui/button";



export default function SignupPage(){


const [password,setPassword]=useState("");



return (

<AuthLayout>


<AuthCard

title="Create your account"

description="Start using Synapse everywhere"

>


<form
className="
space-y-5
"
>



<Input

placeholder="Full name"

className="
h-12
"

/>



<Input

placeholder="Email address"

type="email"

className="
h-12
"

/>



<PhoneInput/>




<div>


<PasswordInput

placeholder="Create password"

onChange={setPassword}

/>


</div>





<div>

<Input

placeholder="Confirm password"

type="password"

className="h-12"

/>


<PasswordStrength

password={password}

/>


</div>





<label

className="
flex
items-start
gap-3
text-sm
text-muted-foreground
"

>


<input
type="checkbox"
className="
mt-1
"
/>


<span>

I agree to Synapse's

<span
className="
text-[var(--synapse-accent-500)]
mx-1
"
>
Terms
</span>

and

<span
className="
text-[var(--synapse-accent-500)]
ml-1
"
>
Privacy Policy
</span>


</span>


</label>





<Button

className="
h-12
w-full
"

>

Create Account

</Button>




</form>



<div className="mt-6">

<SocialLogin/>

</div>





<p

className="
mt-6
text-center
text-sm
text-muted-foreground
"

>


Already have an account?


<Link

to="/login"

className="
ml-2
text-[var(--synapse-accent-500)]
"

>

Login

</Link>


</p>



</AuthCard>


</AuthLayout>

);

}