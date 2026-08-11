import {Link} from "react-router-dom";

import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


export default function ForgotPasswordPage(){

return (

<AuthLayout>

<AuthCard

title="Forgot Password?"

description="Enter your email to reset your password"

>


<div
className="
space-y-5
"
>


<Input

placeholder="Email address"

className="h-12"

/>



<Button

className="
h-12
w-full
"

>

Send Reset Link

</Button>



<p
className="
text-center
text-sm
text-muted-foreground
"
>

Remember password?


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


</div>


</AuthCard>


</AuthLayout>

);

}