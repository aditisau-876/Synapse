import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductComposite from "./ProductComposite";

export default function Hero() {
  return (
    <section className="px-5 pb-20 pt-14 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h1 className="text-[2.6rem] font-bold leading-[1.05] sm:text-6xl">
            Start with a message.
            <br />
            Finish face to face.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Synapse keeps your chats and video meetings in one place, so a quick question
            can become a call in a single tap. Runs in your browser, nothing to install.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/signup"><Button size="lg">Create a free account</Button></Link>
            <Link to="/login"><Button size="lg" variant="outline">Sign in</Button></Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Messages are end-to-end encrypted.
          </p>
        </div>

        <div className="mt-14 sm:mt-20">
          <ProductComposite />
        </div>
      </div>
    </section>
  );
}
