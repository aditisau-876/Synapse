interface StickyNoteProps {

  x:number;

  y:number;

  width:number;

  height:number;

  text:string;

}

export default function StickyNote({

x,

y,

width,

height,

text,

}:StickyNoteProps){

return(

<div

style={{

left:x,

top:y,

width,

height,

}}

className="
absolute
rounded-xl
bg-yellow-200
shadow-xl
border
border-yellow-300
p-4
"

>

<p className="text-black">

{text}

</p>

</div>

);

}