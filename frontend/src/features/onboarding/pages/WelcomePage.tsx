import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/landing/Logo";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { firstName } from "@/lib/people";

export default function WelcomePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <LogoMark className="mx-auto mb-8 size-14" />
        <h1 className="text-4xl font-bold">You're in, {firstName(user?.name)}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find someone to talk to, start a meeting with a link, or plan the next
          thing on your task board.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg" onClick={() => navigate("/app/dashboard", { replace: true })}>
            Open Synapse
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/app/chats", { replace: true })}>
            Start a chat
          </Button>
        </div>
      </div>
    </main>
  );
}
