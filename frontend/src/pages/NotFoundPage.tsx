import { Link } from "react-router-dom";
import { LogoMark } from "@/components/landing/Logo";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-background px-6 text-center">
      <LogoMark className="size-12" />
      <div>
        <h1 className="font-display text-3xl font-bold">We can't find that page</h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          The link may be old or mistyped. Head back and pick up where you left off.
        </p>
      </div>
      <div className="flex gap-2">
        <Link to="/app/dashboard"><Button size="lg">Open Synapse</Button></Link>
        <Link to="/"><Button size="lg" variant="outline">Back to home</Button></Link>
      </div>
    </main>
  );
}
