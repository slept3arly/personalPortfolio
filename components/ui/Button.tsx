"use client";

import { motion, useReducedMotion } from "framer-motion";
import { buttonHoverMotion } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  secondary:
    "border border-gray-700 text-gray-200 hover:border-gray-500 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500",
  ghost:
    "text-gray-300 hover:text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500",
};

export default function Button({ className, variant = "primary", ...props }: Props) {
  const { children, ...rest } = props;
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      {...rest}
      whileHover={reducedMotion ? undefined : buttonHoverMotion}
      whileFocus={reducedMotion ? undefined : buttonHoverMotion}
      className={[
        "interactive-surface interactive-button inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
        variants[variant],
        className ?? "",
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

