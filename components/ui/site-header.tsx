"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { PROFILE } from "@/lib/data/profile";

const NAV_LINKS = [
  { label: "Home", href: "/#hero" },
  { label: "Education", href: "/#education" },
  { label: "Research", href: "/#research" },
  { label: "Recent Research Projects", href: "/#writing" },
  { label: "Publications", href: "/#publications" },
  { label: "Projects and Research Blog", href: "/blog", external: true },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {PROFILE.initials}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 md:flex lg:gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Mail size={15} />
            </a>
            <a
              href={PROFILE.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <LinkedinIcon width={15} height={15} />
            </a>
            <a
              href={PROFILE.social.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <GithubIcon width={15} height={15} />
            </a>
            <div className="mx-1 h-5 w-px bg-border" />
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border/60 bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer noopener" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm text-foreground transition-colors hover:bg-surface-muted hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2 px-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  aria-label="Email"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground"
                >
                  <Mail size={15} />
                </a>
                <a
                  href={PROFILE.social.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground"
                >
                  <LinkedinIcon width={15} height={15} />
                </a>
                <a
                  href={PROFILE.social.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground"
                >
                  <GithubIcon width={15} height={15} />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
