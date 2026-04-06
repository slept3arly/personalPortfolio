type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: Props) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border border-gray-800 bg-white/5 px-3 py-1 text-xs text-gray-300",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

