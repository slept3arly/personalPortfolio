"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cardHoverMotion } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reducedMotion ? undefined : cardHoverMotion}
      className={[
        "interactive-surface interactive-card rounded-xl border border-gray-800/80 bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent p-6 shadow-sm",
        className ?? "",
      ].join(" ")}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

