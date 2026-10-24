import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = forwardRef<HTMLDivElement, Props>(function Card({ children, className }, ref) {
  return (
    <div
      ref={ref}
      className={[
        "interactive-surface interactive-card flex h-full flex-col rounded-[var(--radius-lg)] border border-[color:var(--surface-border)] bg-[color:var(--surface)] p-5 shadow-[0_1px_2px_rgba(2,6,23,0.3)] md:p-6",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
});

export default Card;
