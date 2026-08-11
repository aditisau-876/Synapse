export default function PictureInPicture(){

return(

<div className="fixed bottom-6 right-6 h-48 w-72 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">

<img
src="https://api.dicebear.com/9.x/initials/svg?seed=You"
className="h-full w-full object-cover"
/>

<div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-white">

You

</div>

</div>

);

}