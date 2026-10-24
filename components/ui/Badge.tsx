import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Badge = forwardRef<HTMLSpanElement, Props>(function Badge({ children, className }, ref) {
  return (
    <span
      ref={ref}
      className={[
        "inline-flex max-w-full items-center whitespace-normal break-words rounded-full border border-[color:var(--surface-border)] bg-white/5 px-3 py-1 text-xs leading-5 text-gray-300",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </span>
  );
});

export default Badge;

