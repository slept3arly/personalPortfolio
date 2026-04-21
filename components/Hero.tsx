"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroContainerVariants, heroItemVariants } from "@/lib/motion";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className="py-10 sm:py-14"
      aria-label="Intro"
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      variants={heroContainerVariants}
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div className="flex flex-wrap justify-center gap-2" variants={heroItemVariants}>
          <Badge>Next.js • React • TypeScript</Badge>
        </motion.div>

        <motion.h1
          className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          variants={heroItemVariants}
        >
          Vinayak Nautiyal
        </motion.h1>
        <motion.p
          className="mt-4 text-pretty text-base leading-relaxed text-gray-400 sm:text-lg"
          variants={heroItemVariants}
        >
          I build modern, performance-focused web apps with clean UI, practical UX, and production-grade
          structure. I enjoy shipping polished experiences end-to-end — from component design to
          integration and deployment.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          variants={heroItemVariants}
        >
          <Button href="#projects">View projects</Button>
          <Button href="/resume.pdf" target="_blank" rel="noreferrer" variant="secondary">
            Resume
          </Button>
          <Button href="https://github.com/slept3arly" target="_blank" rel="noreferrer" variant="ghost">
            GitHub
          </Button>
          <Button
            href="https://www.linkedin.com/in/vinayak-n-000a0b298/"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
          >
            LinkedIn
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

