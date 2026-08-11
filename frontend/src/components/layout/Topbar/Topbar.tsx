import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";

import UserMenu from "./UserMenu";

export default function Topbar() {

  return (

<header
className="
sticky
top-0
z-40
flex
h-20
items-center
justify-between
border-b
border-border
bg-background/80
px-8
backdrop-blur-xl
"
>

<SearchBar/>

<div
className="
flex
items-center
gap-2
"
>



<NotificationButton/>

<UserMenu/>

</div>

</header>

);

}