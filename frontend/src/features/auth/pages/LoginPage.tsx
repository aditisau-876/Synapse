import {Link} from "react-router-dom";

import AuthLayout
from "@/features/auth/components/AuthLayout";

import AuthCard
from "@/features/auth/components/AuthCard";

import PasswordInput
from "@/features/auth/components/PasswordInput";

import SocialLogin
from "@/features/auth/components/SocialLogin";

import LoginModeSwitch
from "@/features/auth/components/LoginModeSwitch";


import {Input}
from "@/components/ui/input";

import {Button}
from "@/components/ui/button";



export default function LoginPage(){


return (

<AuthLayout>


<AuthCard

title="Welcome back"

description="Login to continue using Synapse"

>


<div
className="
space-y-5
"
>


<LoginModeSwitch/>



<Input

placeholder="Email address or phone number"

className="h-12"

/>



<PasswordInput/>




<div
className="
flex
items-center
justify-between
text-sm
"
>


<label
className="
flex
items-center
gap-2
text-muted-foreground
"
>

<input
type="checkbox"
/>

Remember me

</label>




<Link

to="/forgot-password"

className="
text-[var(--synapse-accent-500)]
hover:underline
"

>

Forgot password?

</Link>


</div>





<Button

className="
h-12
w-full
"

>

Login

</Button>



<SocialLogin/>


<p
className="
text-center
text-sm
text-muted-foreground
"
>

Don't have an account?


<Link

to="/signup"

className="
ml-2
text-[var(--synapse-accent-500)]
"

>

Create account

</Link>


</p>



</div>


</AuthCard>


</AuthLayout>

);

}