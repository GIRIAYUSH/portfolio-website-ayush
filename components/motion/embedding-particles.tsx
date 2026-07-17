"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Node = { x: number; y: number; r: number; delay: number };

function generateNodes(count: number): Node[] {
  const nodes: Node[] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: rand() * 100,
      y: rand() * 100,
      r: 2 + rand() * 3,
      delay: rand() * 4,
    });
  }
  return nodes;
}

const NODES = generateNodes(28);
const EDGES: [number, number][] = NODES.flatMap((_, i) =>
  i % 3 === 0 && i + 4 < NODES.length ? [[i, i + 4] as [number, number]] : []
);

export function EmbeddingParticles({ containerId }: { containerId: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !svgRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const target = document.getElementById(containerId);
      if (!target) return;
      gsap.to(svgRef.current, {
        yPercent: -15,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [containerId, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const target = document.getElementById(containerId);
    if (!target) return;

    const handleMove = (event: MouseEvent) => {
      const bounds = target.getBoundingClientRect();
      const px = ((event.clientX - bounds.left) / bounds.width) * 100;
      const py = ((event.clientY - bounds.top) / bounds.height) * 100;

      NODES.forEach((node, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const dx = px - node.x;
        const dy = py - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - dist / 28);
        gsap.to(el, {
          x: -dx * pull * 0.35,
          y: -dy * pull * 0.35,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    target.addEventListener("mousemove", handleMove);
    return () => target.removeEventListener("mousemove", handleMove);
  }, [containerId, reducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      aria-hidden
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="var(--accent)"
          strokeWidth={0.08}
          opacity={0.35}
        />
      ))}
      {NODES.map((node, i) => (
        <circle
          key={i}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          cx={node.x}
          cy={node.y}
          r={node.r * 0.18}
          fill="var(--accent)"
          opacity={0.55}
          className="animate-float"
          style={{
            animationDelay: `${node.delay}s`,
            transformOrigin: `${node.x}px ${node.y}px`,
          }}
        />
      ))}
    </svg>
  );
}
