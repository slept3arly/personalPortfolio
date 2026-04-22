"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType } from "react";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  by?: "char" | "word";
  stagger?: number;
  amount?: number;
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.36 + (index % 3) * 0.04,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AnimatedHeading({
  children,
  as: Tag = "h3",
  className,
  by = "char",
  stagger = 0.03,
  amount = 0.65,
}: Props) {
  const units = by === "word" ? children.split(/(\s+)/).filter(Boolean) : Array.from(children);

  return (
    <Tag className={className} aria-label={children}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
            },
          },
        }}
      >
        {units.map((unit, index) => (
          <motion.span
            key={`${unit}-${index}`}
            custom={index}
            className="inline-block will-change-transform"
            variants={itemVariants}
            aria-hidden="true"
          >
            {unit === " " ? "\u00A0" : unit}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
