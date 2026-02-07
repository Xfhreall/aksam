import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "default" | "responsive" | "none";
}

export function Card({
  padding = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  const paddings = {
    default: "p-6",
    responsive: "p-6 sm:p-8",
    none: "",
  };

  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
