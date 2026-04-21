import type { TargetAndTransition, Transition, Variants } from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  quick: 0.22,
  base: 0.38,
  slow: 0.56,
  section: 0.62,
  stagger: 0.08,
} as const;

export const motionTransitions = {
  base: {
    duration: motionDurations.base,
    ease: motionEase,
  } satisfies Transition,
  section: {
    duration: motionDurations.section,
    ease: motionEase,
  } satisfies Transition,
  indicator: {
    duration: 0.32,
    ease: motionEase,
  } satisfies Transition,
} as const;

export const motionViewport = {
  once: true,
  amount: 0.2,
} as const;

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransitions.section,
  },
};

export const sectionContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: motionEase,
      delay: 0.06,
    },
  },
};

export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionDurations.stagger,
      delayChildren: 0.04,
    },
  },
};

export const heroItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.54,
      ease: motionEase,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionDurations.stagger,
      delayChildren: 0.08,
    },
  },
};

export const projectCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: motionEase,
    },
  },
};

export const cardHoverMotion: TargetAndTransition = {
  y: -6,
  scale: 1.015,
  transition: {
    duration: motionDurations.quick,
    ease: motionEase,
  },
};

export const buttonHoverMotion: TargetAndTransition = {
  y: -2,
  scale: 1.01,
  transition: {
    duration: motionDurations.quick,
    ease: motionEase,
  },
};
