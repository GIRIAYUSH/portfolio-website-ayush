"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { BibtexModal } from "@/components/ui/bibtex-modal";
import { cn } from "@/lib/utils";
import { PUBLICATIONS, type Publication } from "@/lib/data/publications";

function PublicationCard({ pub }: { pub: Publication }) {
  const [expanded, setExpanded] = useState(false);
  const [bibtexOpen, setBibtexOpen] = useState(false);

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide",
            pub.status === "Published"
              ? "bg-accent-soft text-accent"
              : "bg-surface-muted text-muted-foreground"
          )}
        >
          {pub.status}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {pub.venue} · {pub.year}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug">{pub.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{pub.authors}</p>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-accent"
      >
        Abstract
        <ChevronDown size={14} className={cn("transition-transform", expanded && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">{pub.abstract}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setBibtexOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
        >
          <FileText size={13} />
          BibTeX
        </button>
        {pub.links.map((link) =>
          link.disabled ? (
            <span
              key={link.label}
              title="Link coming soon"
              className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-border/50 px-3 py-1.5 text-xs text-muted-foreground/50"
            >
              {link.label}
            </span>
          ) : (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <ExternalLink size={13} />
              {link.label}
            </a>
          )
        )}
      </div>

      <BibtexModal
        open={bibtexOpen}
        onClose={() => setBibtexOpen(false)}
        title={pub.title}
        bibtex={pub.bibtex}
      />
    </Card>
  );
}

export function Publications() {
  return (
    <section id="publications" className="relative scroll-mt-16 border-b border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          title="Publications"
          description="Peer-reviewed work and pre-prints."
        />

        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
          {PUBLICATIONS.map((pub) => (
            <RevealItem key={pub.id}>
              <PublicationCard pub={pub} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
