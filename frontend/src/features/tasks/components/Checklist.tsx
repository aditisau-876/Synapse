import {
  CheckSquare,
  Square,
} from "lucide-react";

const items = [

{
id:1,
title:"Create Login UI",
done:true
},

{
id:2,
title:"API Integration",
done:false
},

{
id:3,
title:"Validation",
done:false
}

];

export default function Checklist(){

return(

<div>

<h3
className="
mb-4
text-lg
font-bold
"
>

Checklist

</h3>

<div className="space-y-3">

{

items.map((item)=>(

<button

key={item.id}

className="
flex
w-full
items-center
gap-3
rounded-xl
p-2
hover:bg-muted
"

>

{

item.done?

<CheckSquare
className="text-green-500"
/>

:

<Square/>

}

<span

className={

item.done

?

"line-through text-muted-foreground"

:

""

}

>

{item.title}

</span>

</button>

))

}

</div>

</div>

);

}