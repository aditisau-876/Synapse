import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import UserMenu from "./UserMenu";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 h-[68px] border-b border-border/70 bg-background/80 px-5 backdrop-blur-2xl lg:px-7">
      <div className="flex h-full items-center justify-between gap-5">
        <div className="min-w-0 flex-1">
          <SearchBar />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <NotificationButton />

          <div className="mx-1 hidden h-7 w-px bg-border sm:block" />

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
