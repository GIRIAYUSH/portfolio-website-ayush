"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ResearchNode } from "@/lib/data/research-interests";

type LaidOutNode = ResearchNode & { x: number; y: number };

function layoutNodes(nodes: ResearchNode[]): LaidOutNode[] {
  const cx = 50;
  const cy = 50;
  const radius = 38;
  return nodes.map((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    return {
      ...node,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

export function AttentionGraph({ nodes }: { nodes: ResearchNode[] }) {
  const laidOut = useMemo(() => layoutNodes(nodes), [nodes]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const byId = useMemo(() => {
    const map = new Map<string, LaidOutNode>();
    laidOut.forEach((n) => map.set(n.id, n));
    return map;
  }, [laidOut]);

  const edges = useMemo(() => {
    const seen = new Set<string>();
    const list: { a: LaidOutNode; b: LaidOutNode; key: string }[] = [];
    laidOut.forEach((node) => {
      node.connections.forEach((targetId) => {
        const target = byId.get(targetId);
        if (!target) return;
        const key = [node.id, targetId].sort().join("::");
        if (seen.has(key)) return;
        seen.add(key);
        list.push({ a: node, b: target, key });
      });
    });
    return list;
  }, [laidOut, byId]);

  const activeNode = activeId ? byId.get(activeId) : null;
  const connectedIds = new Set(activeNode?.connections ?? []);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="relative aspect-square w-full max-w-xl mx-auto">
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          {edges.map(({ a, b, key }) => {
            const isActive =
              activeId !== null &&
              (a.id === activeId || b.id === activeId) &&
              (connectedIds.has(a.id) || connectedIds.has(b.id) || a.id === activeId || b.id === activeId);
            return (
              <motion.line
                key={key}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--accent)"
                strokeWidth={isActive ? 0.6 : 0.25}
                initial={false}
                animate={{
                  opacity: activeId === null ? 0.25 : isActive ? 0.9 : 0.08,
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
          {laidOut.map((node) => {
            const isActive = node.id === activeId;
            const isNeighbor = activeId !== null && connectedIds.has(node.id);
            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? 3.4 : 2.4}
                  fill={isActive || isNeighbor ? "var(--accent)" : "var(--surface)"}
                  stroke="var(--accent)"
                  strokeWidth={0.4}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveId(node.id)}
                  onFocus={() => setActiveId(node.id)}
                  onClick={() => setActiveId(node.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={node.label}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: activeId === null || isActive || isNeighbor ? 1 : 0.4 }}
                  transition={{ duration: 0.25 }}
                />
              </g>
            );
          })}
        </svg>
        {laidOut.map((node) => (
          <button
            key={node.id}
            type="button"
            onMouseEnter={() => setActiveId(node.id)}
            onFocus={() => setActiveId(node.id)}
            onClick={() => setActiveId(node.id)}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className={cn(
              "absolute -translate-x-1/2 w-[24vw] max-w-[100px] whitespace-normal text-center leading-tight rounded-xl border px-1.5 py-1 font-mono text-[8px] uppercase tracking-wide backdrop-blur transition-colors sm:w-auto sm:max-w-none sm:whitespace-nowrap sm:rounded-full sm:px-2.5 sm:text-[11px]",
              node.y > 50 ? "translate-y-2" : "-translate-y-[calc(100%+8px)]",
              node.id === activeId
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background/80 text-muted-foreground hover:border-accent/50 hover:text-accent"
            )}
          >
            {node.label}
          </button>
        ))}
      </div>
      <div className="min-h-[220px] rounded-2xl border border-border bg-surface p-6">
        {activeNode ? (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-mono text-xs uppercase tracking-wider text-accent">
              Focus area
            </div>
            <h3 className="mt-2 text-xl font-semibold">{activeNode.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {activeNode.description}
            </p>
          </motion.div>
        ) : (
          <div className="flex h-full flex-col justify-center text-sm text-muted-foreground">
            <p>Hover or focus a topic to see how it connects to related research directions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
