import { Download, Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { PROFILE } from "@/lib/data/profile";
import { withBasePath } from "@/lib/base-path";

export function Contact() {
  return (
    <footer id="contact" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="05" title="Get in touch" align="center" />

        <Reveal className="mt-10 flex flex-col items-center gap-6">
          <a
            href={`mailto:${PROFILE.emails.personal}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            <Mail size={16} />
            {PROFILE.emails.personal}
          </a>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${PROFILE.emails.academic}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <span className="font-mono uppercase tracking-wide text-accent">Academic</span>
              {PROFILE.emails.academic}
            </a>
            <a
              href={`mailto:${PROFILE.emails.professional}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <span className="font-mono uppercase tracking-wide text-accent">Professional</span>
              {PROFILE.emails.professional}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <LinkedinIcon width={16} height={16} />
            </a>
            <a
              href={PROFILE.social.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <GithubIcon width={16} height={16} />
            </a>
            <a
              href={withBasePath(PROFILE.resumeUrl)}
              download
              aria-label="Download resume"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Download size={16} />
            </a>
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} />
            {PROFILE.location}
          </span>
        </Reveal>

        <div className="mt-20 flex flex-col items-center gap-2 border-t border-border/60 pt-8 text-center font-mono text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
