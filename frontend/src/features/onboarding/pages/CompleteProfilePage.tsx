import AvatarUploader from "../components/AvatarUploader";
import ThemeSelector from "../components/ThemeSelector";
import UsernameInput from "../components/UsernameInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CompleteProfilePage(){

return (

<div
className="
flex
min-h-screen
items-center
justify-center
bg-background
px-6
"
>

<div
className="
w-full
max-w-lg
space-y-8
rounded-3xl
border
border-border
bg-background/80
p-10
shadow-2xl
backdrop-blur-xl
"
>

<div>

<h1 className="text-4xl font-bold">

Complete your profile

</h1>

<p className="mt-2 text-muted-foreground">

Almost there.

Let's personalize your account.

</p>

</div>

<AvatarUploader/>

<UsernameInput />

<Input
placeholder="Bio (optional)"
/>

<Input
placeholder="Timezone"
/>

<div>

<p className="mb-4 font-semibold">

Choose your theme

</p>

<ThemeSelector/>

</div>

<Button
className="
h-12
w-full
"
>

Continue

</Button>

</div>

</div>

);

}