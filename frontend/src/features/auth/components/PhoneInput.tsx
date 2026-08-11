import { Input } from "@/components/ui/input";


export default function PhoneInput(){

return (

<div className="flex gap-3">


<div
className="
flex
items-center
rounded-xl
border
px-4
text-sm
"
>
+91
</div>


<Input
placeholder="Phone number"
type="tel"
className="h-12"
/>


</div>

);

}