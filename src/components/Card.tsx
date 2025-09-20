import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-white border border-brand-muted shadow-sm p-6 hover:shadow-md hover:scale-[1.01] transition ${className}`}
    >
      {title && <h2 className="text-lg font-semibold text-brand-secondary mb-4">{title}</h2>}
      {children}
    </div>
  );
}
