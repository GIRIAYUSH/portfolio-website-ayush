"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";

export function BibtexModal({
  open,
  onClose,
  title,
  bibtex,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  bibtex: string;
}) {
  const [copied, setCopied] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setCopied(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = bibtex;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`BibTeX citation for ${title}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl rounded-2xl border border-border bg-surface p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-sm font-medium text-muted-foreground">BibTeX citation</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>
            <pre className="mt-4 max-h-72 overflow-auto rounded-xl bg-surface-muted p-4 font-mono text-xs leading-relaxed text-foreground">
              {bibtex}
            </pre>
            <button
              type="button"
              onClick={handleCopy}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-4 py-2 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy BibTeX"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
