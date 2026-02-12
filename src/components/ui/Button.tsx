import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-extrabold tracking-tight transition-colors transition-transform will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-[3px] border-black/15 bg-[linear-gradient(to_bottom,var(--sb-primary-from),var(--sb-primary-mid),var(--sb-primary-to))] text-white shadow-[0_16px_0_rgba(0,0,0,0.12),0_30px_80px_rgba(0,0,0,0.16)] hover:brightness-[1.03] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.75),rgba(255,255,255,0)_55%)] before:opacity-30 hover:before:opacity-45 before:transition-opacity",
  secondary:
    "border-[3px] border-black/15 bg-[linear-gradient(to_bottom,var(--sb-secondary-from),var(--sb-secondary-mid),var(--sb-secondary-to))] text-black/85 shadow-[0_16px_0_rgba(0,0,0,0.10),0_30px_80px_rgba(0,0,0,0.14)] hover:brightness-[1.03] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.70),rgba(255,255,255,0)_55%)] before:opacity-25 hover:before:opacity-40 before:transition-opacity",
  outline:
    "border-[3px] border-black/15 bg-white/85 text-black/80 shadow-[0_14px_0_rgba(0,0,0,0.06),0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur hover:bg-white before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),rgba(255,255,255,0)_60%)] before:opacity-25 hover:before:opacity-35 before:transition-opacity",
  ghost: "bg-transparent text-black hover:bg-black/[0.05]",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: {
  href: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  href,
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: {
  href: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
