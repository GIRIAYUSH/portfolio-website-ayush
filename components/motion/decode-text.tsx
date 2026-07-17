"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const GLYPHS = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function DecodeText({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? text : "");
  const frame = useRef(0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(text);
      return;
    }

    let raf: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const totalFrames = text.length + 14;

      const tick = () => {
        frame.current += 1;
        const revealed = Math.max(0, frame.current - 14);
        const next = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealed) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
        setDisplay(next);

        if (frame.current < totalFrames) {
          raf = setTimeout(tick, 28);
        } else {
          setDisplay(text);
        }
      };
      tick();
    }, delay);

    return () => {
      clearTimeout(start);
      clearTimeout(raf);
    };
  }, [text, delay, reducedMotion]);

  return (
    <span className={className} aria-label={text}>
      {display || " "}
    </span>
  );
}
