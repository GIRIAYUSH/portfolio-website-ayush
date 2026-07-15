import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  index,
  title,
  description,
  align = "left",
  className,
}: {
  index: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-3 font-mono text-xs text-accent",
          align === "center" && "justify-center"
        )}
      >
        <span>{index}</span>
        <span className="h-px w-8 bg-border" />
      </div>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-base text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
