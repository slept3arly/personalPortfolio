type Props = {
  id?: string;
  label: string;
  number: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ id, label, number, children, className }: Props) {
  return (
    <section
      id={id}
      className={`interactive-section py-20 md:py-24 ${className ?? ""}`}
      aria-label={label}
    >
      <div className="space-y-10 md:space-y-12">
        <header className="flex items-end gap-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500">{number}</p>
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{label}</h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>
        <div className="space-y-6 md:space-y-8">{children}</div>
      </div>
    </section>
  );
}
