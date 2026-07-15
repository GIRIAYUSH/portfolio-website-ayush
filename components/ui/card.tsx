import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-surface p-6 shadow-sm transition-colors duration-300 hover:border-accent/40",
        className
      )}
      {...props}
    />
  );
}
