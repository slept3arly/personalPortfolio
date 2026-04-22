type Variant = "primary" | "secondary" | "ghost";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary:
    "border-white bg-white text-slate-950 hover:border-white hover:bg-slate-100 focus-visible:outline-white",
  secondary:
    "border-slate-700 bg-transparent text-slate-100 hover:border-slate-500 hover:bg-white/5 focus-visible:outline-slate-400",
  ghost:
    "border-transparent bg-transparent text-slate-300 hover:text-white hover:bg-white/6 focus-visible:outline-slate-400",
};

export default function Button({ className, variant = "primary", ...props }: Props) {
  const { children, ...rest } = props;

  return (
    <a
      {...rest}
      className={[
        "interactive-surface inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border px-4 text-sm font-medium tracking-tight transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className ?? "",
      ].join(" ")}
    >
      <span>{children}</span>
    </a>
  );
}
