"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AnimatedCascade({
  children,
  className,
  stagger = 0.1,
  amount = 0.2,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        return (
          <motion.div key={child.key ?? `cascade-${index}`} variants={itemVariants}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
