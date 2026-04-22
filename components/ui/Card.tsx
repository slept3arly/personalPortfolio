type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={[
        "interactive-surface interactive-card flex h-full flex-col rounded-[var(--radius-lg)] border border-[color:var(--surface-border)] bg-[color:var(--surface)] p-6 shadow-[0_1px_2px_rgba(2,6,23,0.3)] md:p-7",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
