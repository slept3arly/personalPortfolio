/**
 * Shared motion vocabulary for the portfolio.
 *
 * Every duration is in seconds (GSAP convention). These tokens are the single
 * source of truth for animation timing: components read values from here
 * instead of hard-coding their own durations, easings, staggers or offsets.
 */
export const motion = {
  ease: {
    /** Default easing for GSAP entrances and UI motion. */
    standard: "power2.out",
    /** Word cascade in SplitText headings — slightly snappier than standard. */
    heading: "power3.out",
  },

  duration: {
    /** SplitText heading word cascade. */
    heading: 0.52,
    /** Section eyebrow number ("01", "02", …). */
    sectionNumber: 0.5,
    /** Primary section content (cards, main copy blocks). */
    sectionContent: 0.72,
    /** Secondary items (list rows, tags, buttons). */
    sectionItem: 0.56,
    /** Navbar active-pill movement and background fade. */
    navbar: 0.4,
    /** Card tilt follow / return. */
    tilt: 0.32,
    /** Short project-details dialog transition. */
    dialog: 0.24,
    /** Magnetic dot follow / return. */
    magnetic: 0.28,
  },

  stagger: {
    /** Heading words. */
    headingWords: 0.075,
    /** Section items (cards, list rows, tags). */
    items: 0.08,
  },

  /** Section-content reveal (fade + rise). */
  reveal: {
    /** Entrance distance in px. */
    y: 14,
    /** Timeline offsets in seconds from the reveal start. */
    delay: {
      number: 0,
      content: 0.16,
      heroEyebrow: 0,
      heroParagraph: 0.1,
      items: 0.36,
      tags: 0.56,
    },
  },

  /** SplitText heading cascade (its own trigger, independent of reveals). */
  heading: {
    /** ScrollTrigger start for the cascade. */
    start: "top 88%",
    /** Entrance distance for heading words. */
    y: 22,
    /** Entrance rotation for heading words. */
    rotation: 2,
  },

  /** Scroll-trigger policy shared by every section reveal. */
  trigger: {
    /**
     * Viewport ratio (measured from the top) that a section's top must cross
     * before it reveals. The observer's rootMargin is derived from this one
     * number so the immediate check and the observer never disagree.
     */
    revealLine: 0.92,
  },

  navbar: {
    /** Viewport ratio used as the active-section detection line. */
    anchorRatio: 0.34,
    /**
     * Distance in px from the end of the document at which the final section
     * is treated as active — its top can never reach the anchor line there.
     */
    bottomEpsilon: 2,
    /** Scroll distance after which the navbar background is fully opaque. */
    scrolledThreshold: 40,
    /** Navbar background opacity at rest and when scrolled. */
    bgOpacityRest: 0.72,
    bgOpacityScrolled: 1,
    /** Horizontal extension beyond each side of the active nav link. */
    indicatorBleed: 4,
  },

  tilt: {
    /** Maximum card rotation in degrees. */
    maxAngle: 8,
    /** Perspective distance applied to tilted cards. */
    perspective: 600,
  },

  magnetic: {
    /** Radius in px within which dots react to the pointer. */
    radius: 80,
    /** Fraction of the pointer offset applied to a dot at zero distance. */
    force: 0.22,
    /** Dot size in px — must match `.magnetic-heading__dots span` in CSS. */
    dotSize: 2,
  },
} as const;
