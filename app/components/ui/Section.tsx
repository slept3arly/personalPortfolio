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
      className={`scroll-mt-24 py-12 sm:py-16 ${className ?? ""}`}
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-widest text-gray-500">
            {number}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            {label}
          </h2>
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-gray-800 via-gray-800 to-transparent sm:block" />
      </div>
      {children}
    </section>
  );
}

