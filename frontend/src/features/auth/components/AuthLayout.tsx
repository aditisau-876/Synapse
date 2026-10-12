import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/landing/Logo";

interface Props {
  children: ReactNode;
}

/** Brand panel on the left (desktop), the form on the right. No floating card. */
export default function AuthLayout({ children }: Props) {
  return (
    <div className="grid min-h-dvh bg-background lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[var(--synapse-accent-900)] p-12 text-white lg:flex">
        <Logo className="[&_span]:text-white" />

        {/* The signal motif: two nodes, one thread. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 300"
          className="pointer-events-none absolute right-0 top-1/2 w-[120%] -translate-y-1/2 translate-x-1/4 opacity-25"
          fill="none"
        >
          <path d="M20 240 C 140 240, 120 60, 250 60 S 360 140, 390 120" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 9" />
          <circle cx="20" cy="240" r="9" fill="#fff" />
          <circle cx="250" cy="60" r="9" fill="var(--synapse-accent-secondary)" />
        </svg>

        <div className="relative max-w-sm">
          <h2 className="text-4xl font-bold leading-tight">
            Pick up the conversation where you left it.
          </h2>
          <p className="mt-4 text-white/70">
            Messages, calls and the work that comes out of them, in one place.
          </p>
        </div>

        <p className="relative text-sm text-white/55">Messages are end-to-end encrypted.</p>
      </aside>

      <main className="flex flex-col px-6 py-8 sm:px-12">
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Back to synapse home</Link>
        </p>
      </main>
    </div>
  );
}
