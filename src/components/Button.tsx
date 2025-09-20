import type { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Loader from "./Loader";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

  const variants = {
    primary:
      "bg-brand-primary text-white hover:bg-brand-primary/90 focus:ring-brand-primary",
    secondary:
      "bg-brand-muted text-brand-secondary hover:bg-brand-muted/70 focus:ring-brand-secondary",
    danger:
      "bg-brand-danger text-white hover:bg-brand-danger/90 focus:ring-brand-danger",
  };

  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
}
