import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="px-5 pb-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-2xl bg-[var(--synapse-accent-900)] px-8 py-10 text-white sm:flex-row sm:items-center sm:px-12">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Say hello to someone today</h2>
          <p className="mt-1.5 text-white/70">Free to start. It takes a minute to set up.</p>
        </div>
        <Link to="/signup">
          <Button size="lg" className="bg-white text-[color:var(--synapse-accent-900)] hover:bg-white/90">
            Create your account
          </Button>
        </Link>
      </div>
    </section>
  );
}
