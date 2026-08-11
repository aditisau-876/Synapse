interface Props {
  password:string;
}


export default function PasswordStrength({
  password
}:Props){


const strength =
password.length === 0
?
0
:
password.length < 6
?
1
:
password.match(/[A-Z]/) &&
password.match(/[0-9]/) &&
password.length >= 8
?
3
:
2;



const labels=[
"",
"Weak password",
"Medium password",
"Strong password"
];


return (

<div className="mt-2">


<div
className="
flex
gap-2
"
>


{
[1,2,3].map((item)=>(

<div

key={item}

className={`
h-1
flex-1
rounded-full

${
item<=strength
?
"bg-[var(--synapse-accent-500)]"
:
"bg-muted"
}

`}

/>

))

}


</div>



{
password.length>0 &&

<p
className="
mt-2
text-xs
text-muted-foreground
"
>
{labels[strength]}
</p>

}


</div>

);

}