import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32">

      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-transparent px-8 py-20 text-center backdrop-blur-xl">

        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >

          <h2 className="text-4xl font-black md:text-6xl">
            Ready to transform
            <br />
            the way you connect?
          </h2>


          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Join Synapse and experience messaging, meetings and collaboration
            in one powerful platform.
          </p>


          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link to="/signup">
              <Button size="lg">
                Start for free
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>


            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
              >
                Login
              </Button>
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}