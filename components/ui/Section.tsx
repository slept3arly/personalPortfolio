"use client";

import type { PointerEvent } from "react";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, motionViewport, sectionContentVariants } from "@/lib/motion";

type Props = {
  id?: string;
  label: string;
  number: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ id, label, number, children, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const setSpotlight = (event: PointerEvent<HTMLElement>) => {
    if (!ref.current || event.pointerType === "touch") {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--section-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--section-y", `${event.clientY - rect.top}px`);
    ref.current.style.setProperty("--section-active", "1");
  };

  const clearSpotlight = () => {
    ref.current?.style.setProperty("--section-active", "0");
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      onPointerEnter={setSpotlight}
      onPointerMove={setSpotlight}
      onPointerLeave={clearSpotlight}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={motionViewport}
      className={`interactive-section scroll-mt-24 py-12 sm:py-16 ${className ?? ""}`}
      aria-label={label}
    >
      <div className="relative z-10">
        <motion.div className="mb-6 flex items-end justify-between gap-4" variants={fadeUpVariants}>
          <div>
            <p className="text-xs font-medium tracking-widest text-gray-500">{number}</p>
            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{label}</h2>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-gray-800 via-gray-800 to-transparent sm:block" />
        </motion.div>
        <motion.div variants={sectionContentVariants}>{children}</motion.div>
      </div>
    </motion.section>
  );
}

