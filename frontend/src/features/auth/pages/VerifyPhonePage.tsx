import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import OTPInput from "@/features/auth/components/OTPInput";

import { Button } from "@/components/ui/button";


export default function VerifyPhonePage(){

return (

<AuthLayout>

<AuthCard

title="Verify Phone Number"

description="Enter the OTP sent to your phone"

>


<div
className="
space-y-6
"
>


<OTPInput/>


<Button
className="
h-12
w-full
"
>

Verify Phone

</Button>


<p
className="
text-center
text-sm
text-muted-foreground
"
>

Didn't receive code?

<button
className="
ml-2
text-[var(--synapse-accent-500)]
"
>
Resend OTP
</button>


</p>


</div>


</AuthCard>


</AuthLayout>

);

}