import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-foreground">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="text-muted-foreground">
        Page not found.
      </p>

      <Link
        to="/"
        className="rounded-lg bg-[var(--synapse-accent-500)] px-5 py-2 text-[var(--synapse-accent-500)]-foreground"
      >
        Go Home
      </Link>
    </main>
  );
}