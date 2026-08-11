import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroPreview from "./hero/HeroPreview";
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-24 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[180px]" />

      <div className="absolute right-20 top-52 h-72 w-72 rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute bottom-0 left-20 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[160px]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-36 text-center">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <div className="mb-8 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-400">

            🚀 One app for Chat, Calls & Meetings

          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight md:text-7xl">

            Communication

            <span className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-sky-500 bg-clip-text text-transparent">

              {" "}Reimagined

            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">

            Chat instantly, host crystal-clear meetings, collaborate on a
            live whiteboard and stay connected from anywhere.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link to="/signup">

              <Button size="lg">

                Get Started

                <ArrowRight className="ml-2 size-4" />

              </Button>

            </Link>

            <Button variant="outline" size="lg">

              <Play className="mr-2 size-4" />

              Watch Demo

            </Button>
            <HeroPreview />
          </div>

        </motion.div>

      </div>

    </section>
  );
}