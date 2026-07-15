import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { EDUCATION, CERTIFICATIONS } from "@/lib/data/education";

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-16 overflow-hidden border-b border-border/60 py-24 sm:py-32">
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-40 w-full -translate-y-1/2 opacity-[0.15]"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 50 C 125 0, 125 100, 250 50 C 375 0, 375 100, 500 50 C 625 0, 625 100, 750 50 C 875 0, 875 100, 1000 50"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.5}
        />
      </svg>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          title="Education"
          description="The foundation everything else builds on."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{EDUCATION.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{EDUCATION.institution}</p>
                  <div className="mt-2 flex items-center gap-3 font-mono text-xs text-muted-foreground">
                    <span>{EDUCATION.period}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="text-accent">CGPA {EDUCATION.cgpa}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Relevant coursework
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {EDUCATION.coursework.map((course) => (
                    <Badge key={course}>{course}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {CERTIFICATIONS.map((cert) => (
              <RevealItem key={cert.title}>
                <Card className="h-full py-5">
                  <p className="text-sm font-medium leading-snug">{cert.title}</p>
                  <p className="mt-1.5 font-mono text-xs text-muted-foreground">{cert.issuer}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
