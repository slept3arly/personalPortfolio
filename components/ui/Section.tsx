import type { ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export default function Section({ id, className, ariaLabel, children }: Props) {
  return (
    <section id={id} aria-label={ariaLabel} className={`py-16 md:py-20 ${className ?? ""}`}>
      <div className="space-y-8 md:space-y-10">{children}</div>
    </section>
  );
}
