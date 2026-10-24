import type { ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export default function Section({ id, className, ariaLabel, children }: Props) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      // Anchor offset: keeps section headings clear of the fixed navbar when
      // navigated to by hash (matches the navbar's height at both breakpoints).
      className={`scroll-mt-20 py-7 md:scroll-mt-24 md:py-9 ${className ?? ""}`}
    >
      <div className="space-y-8 md:space-y-10">{children}</div>
    </section>
  );
}
