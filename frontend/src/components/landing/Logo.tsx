import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-cyan-500/30">
        <span className="text-lg font-black text-white">
          S
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight">
          Synapse
        </h1>

        <p className="-mt-1 text-xs text-muted-foreground">
          Connect. Meet. Collaborate.
        </p>
      </div>
    </Link>
  );
}