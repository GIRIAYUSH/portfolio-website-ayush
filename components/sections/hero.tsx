"use client";

import Image from "next/image";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { PROFILE } from "@/lib/data/profile";
import { withBasePath } from "@/lib/base-path";
import { EXPERIENCE } from "@/lib/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Stat } from "@/components/ui/stat";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { EmbeddingParticles } from "@/components/motion/embedding-particles";
import { DecodeText } from "@/components/motion/decode-text";

export function Hero() {
  return (
    <section id="hero" className="relative scroll-mt-16 border-b border-border/60">
      <div id="hero-visual" className="relative flex min-h-[92vh] items-center overflow-hidden">
        <EmbeddingParticles containerId="hero-visual" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-6 pt-24 pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="w-full max-w-2xl">
            <Reveal delay={0.05}>
              <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
                {PROFILE.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-xl font-medium text-foreground sm:text-2xl">
                {PROFILE.headline}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-3 max-w-2xl font-mono text-base text-muted-foreground">
                <DecodeText text={PROFILE.role} delay={300} /> — {PROFILE.company}
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/80">
                {PROFILE.bio}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-4 flex flex-wrap gap-2">
                {PROFILE.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  {PROFILE.location}
                </span>
                <a
                  href={withBasePath(PROFILE.resumeUrl)}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  <Download size={14} />
                  Resume
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {PROFILE.email}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="shrink-0">
            <div className="relative">
              <div className="absolute inset-0 -z-10 scale-125 rounded-[2rem] bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl" />
              <div className="absolute -inset-px -z-10 rounded-[2.1rem] bg-gradient-to-br from-accent/40 to-transparent opacity-60" />
              <div className="relative h-40 w-40 overflow-hidden rounded-[2rem] border border-accent/30 shadow-xl ring-1 ring-border/50 transition-transform duration-500 hover:scale-[1.02] sm:h-52 sm:w-52">
                <Image
                  src={withBasePath("/avatar.jpg")}
                  alt={PROFILE.name}
                  fill
                  priority
                  sizes="(min-width: 640px) 208px, 160px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center text-muted-foreground">
          <ArrowDown size={18} className="animate-float" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        <SectionHeading
          index="—"
          title="Professional Experience"
          description="Reverse-chronological — where I've applied research to production systems."
        />

        <RevealGroup className="mt-10 space-y-6">
          {EXPERIENCE.map((job) => (
            <RevealItem key={job.id}>
              <Card>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="text-right font-mono text-xs text-muted-foreground">
                    <div>{job.period}</div>
                    <div className="mt-0.5">{job.location}</div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {job.stats && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {job.stats.map((stat) => (
                      <Stat key={stat.label} {...stat} />
                    ))}
                  </div>
                )}
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
