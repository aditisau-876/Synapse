import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ShowcaseCard({
  title,
  description,
  children,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-white/10 bg-background/70 p-8 backdrop-blur-xl"
    >
      <div className="mb-8">
        <h3 className="text-3xl font-bold">
          {title}
        </h3>

        <p className="mt-3 max-w-xl text-muted-foreground">
          {description}
        </p>
      </div>

      {children}

    </motion.div>
  );
}