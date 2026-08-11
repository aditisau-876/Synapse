import AuthLayout from "@/features/auth/components/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";

import PasswordInput from "@/features/auth/components/PasswordInput";

import {Button} from "@/components/ui/button";


export default function ResetPasswordPage(){

return (

<AuthLayout>

<AuthCard

title="Create New Password"

description="Choose a strong password for your account"

>


<div
className="
space-y-5
"
>


<PasswordInput
placeholder="New password"
/>



<PasswordInput
placeholder="Confirm password"
/>



<Button

className="
h-12
w-full
"

>

Reset Password

</Button>


</div>


</AuthCard>


</AuthLayout>

);

}