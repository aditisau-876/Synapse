import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import MobileNav from "./MobileNav";
import CommandPalette from "./CommandPalette/CommandPalette";

/**
 * The shell is exactly one viewport tall and never scrolls itself; <main> does.
 * Pages that need the full height (chat, whiteboard) use `h-full`.
 */
export default function AppLayout() {
  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <a
        href="#main"
        className="sr-only z-[100] rounded-lg bg-card px-3 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main id="main" className="min-h-0 flex-1 overflow-y-auto pb-[3.75rem] md:pb-0">
          <Outlet />
        </main>
      </div>

      <MobileNav />
      <CommandPalette />
    </div>
  );
}
