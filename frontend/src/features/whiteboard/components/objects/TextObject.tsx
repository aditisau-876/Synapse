interface Props{

x:number;

y:number;

text:string;

}

export default function TextObject({

x,

y,

text,

}:Props){

return(

<div

style={{

left:x,

top:y,

}}

className="
absolute
text-lg
font-medium
"

>

{text}

</div>

);

}