export default function OTPInput(){

return (

<div
className="
flex
justify-between
gap-3
"
>


{
Array.from({length:6}).map((_,i)=>(

<input

key={i}

maxLength={1}

className="
h-12
w-12
rounded-xl
border
bg-background
text-center
text-xl
font-bold
outline-none
focus:ring-2
focus:ring-[var(--synapse-accent-500)]
"

/>

))

}


</div>

);

}