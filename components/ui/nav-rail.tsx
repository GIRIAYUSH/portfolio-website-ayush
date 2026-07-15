"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/sections";
import { cn } from "@/lib/utils";

export function NavRail() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    if (pathname !== "/") return;
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (pathname !== "/") return null;

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 lg:flex"
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === activeId;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollTo(section.id)}
            className="group flex items-center gap-3"
            aria-current={isActive}
          >
            <span
              className={cn(
                "max-w-0 overflow-hidden whitespace-nowrap text-right font-mono text-[11px] uppercase tracking-wider text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:opacity-100",
                isActive && "max-w-[180px] opacity-100 text-accent"
              )}
            >
              {section.index} · {section.label}
            </span>
            <span className="relative flex h-3 w-3 items-center justify-center">
              {isActive && (
                <motion.span
                  layoutId="nav-rail-ring"
                  className="absolute h-3 w-3 rounded-full border border-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-border transition-colors duration-300",
                  isActive && "bg-accent"
                )}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
