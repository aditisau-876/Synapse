import {
  Paperclip,
  Upload,
} from "lucide-react";

const files=[

"Wireframe.fig",

"API.pdf",

"Logo.png"

];

export default function AttachmentsPanel(){

return(

<div>

<div
className="
mb-4
flex
items-center
justify-between
"
>

<h3
className="
text-lg
font-bold
"
>

Attachments

</h3>

<button
className="
flex
items-center
gap-2
rounded-xl
bg-[var(--synapse-accent-500)]
px-4
py-2
text-white
"
>

<Upload size={16}/>

Upload

</button>

</div>

<div className="space-y-3">

{

files.map((file)=>(

<div

key={file}

className="
flex
items-center
gap-3
rounded-xl
bg-muted
p-3
"

>

<Paperclip size={18}/>

{file}

</div>

))

}

</div>

</div>

);

}