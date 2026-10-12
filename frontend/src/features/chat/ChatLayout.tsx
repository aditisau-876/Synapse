import ChatShell from "./ChatShell";

/** Fills <main> from AppLayout. Never use h-screen here: the topbar already takes 56px. */
export default function ChatLayout() {
  return (
    <div className="h-full bg-background">
      <ChatShell />
    </div>
  );
}
