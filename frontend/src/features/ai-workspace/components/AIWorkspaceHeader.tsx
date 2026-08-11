import { Sparkles } from "lucide-react";

export default function AIWorkspaceHeader() {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-primary/10
            text-primary
          "
        >
          <Sparkles size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            AI Workspace
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Your intelligent assistant for getting work done.
          </p>
        </div>
      </div>
    </header>
  );
}