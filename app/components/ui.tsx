import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const tagTones = {
  b2b: "bg-b2b-tag-bg text-b2b-tag-ink",
  community: "bg-community-tag-bg text-community-tag-ink",
  otros: "bg-otros-tag-bg text-otros-tag-ink",
} as const;

export function Tag({
  tone,
  children,
}: {
  tone: keyof typeof tagTones;
  children: ReactNode;
}) {
  return (
    <span
      className={`w-max rounded-md px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide ${tagTones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border px-3 py-[5px] font-mono text-xs text-ink-soft">
      {children}
    </span>
  );
}

export function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-surface px-4 text-center font-mono text-xs text-ink-faint ${className}`}
    >
      {label}
    </div>
  );
}

const metricColors = {
  b2b: "text-b2b",
  community: "text-community",
} as const;

export function Metric({
  value,
  label,
  color,
  size = "lg",
}: {
  value: string;
  label: string;
  color: keyof typeof metricColors;
  size?: "lg" | "sm";
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className={`font-mono font-medium ${metricColors[color]} ${
          size === "lg" ? "text-2xl" : "text-xl"
        }`}
      >
        {value}
      </span>
      <span className="font-sans text-xs text-ink-faint">{label}</span>
    </div>
  );
}

type ButtonVariant = "primary" | "secondary";

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-b2b text-on-primary hover:bg-b2b-hover",
  secondary: "border border-border hover:border-ink",
};

const buttonBaseClasses =
  "inline-flex items-center justify-center rounded-lg px-[22px] py-3 text-[13px] font-medium disabled:cursor-not-allowed disabled:opacity-60";

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & (
  | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: never } & ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const classes = `${buttonBaseClasses} ${buttonVariantClasses[variant]} ${className}`;

  if (props.href) {
    const { href, ...anchorProps } = props as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

export function Section({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`px-page border-b border-border ${className}`}>
      {children}
    </section>
  );
}
