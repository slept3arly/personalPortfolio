type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={[
        "rounded-xl border border-gray-800 bg-gradient-to-b from-white/[0.04] to-transparent p-6 shadow-sm transition",
        "hover:border-gray-700 hover:bg-white/[0.06]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

