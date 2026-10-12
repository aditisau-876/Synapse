import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#security" className="hover:text-foreground">Security</a>
          <Link to="/login" className="hover:text-foreground">Sign in</Link>
          <Link to="/signup" className="hover:text-foreground">Create account</Link>
        </nav>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Synapse</p>
      </div>
    </footer>
  );
}
