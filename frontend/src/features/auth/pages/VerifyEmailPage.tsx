import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import OTPInput from "@/features/auth/components/OTPInput";
import {Button} from "@/components/ui/button";


export default function VerifyEmailPage(){

return (

<AuthLayout>

<AuthCard

title="Verify Email"

description="Enter the OTP sent to your email"

>


<div className="space-y-6">

<OTPInput/>


<Button className="w-full h-12">

Verify Email

</Button>


</div>


</AuthCard>

</AuthLayout>

);

}