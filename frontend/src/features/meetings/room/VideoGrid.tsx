import ParticipantTile from "./ParticipantTile";

const people=[

{
name:"You",
cameraOff:false,
speaking:true,
},

{
name:"Alex",
cameraOff:true,
muted:false,
},

{
name:"Sarah",
cameraOff:false,
muted:true,
},

{
name:"Emily",
cameraOff:true,
muted:true,
},

];

export default function VideoGrid(){

return(

<div
className="
grid
flex-1
grid-cols-2
gap-6
overflow-auto
p-8
"
>

{people.map(person=>(

<ParticipantTile

key={person.name}

{...person}

/>

))}

</div>

);

}