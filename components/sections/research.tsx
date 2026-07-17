import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { AttentionGraph } from "@/components/motion/attention-graph";
import { RESEARCH_NODES } from "@/lib/data/research-interests";
import { SKILL_HEADS } from "@/lib/data/skills";

export function Research() {
  return (
    <section id="research" className="relative scroll-mt-16 border-b border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          title="Research Interests"
          description="Hover or focus a topic to see how it connects to related research directions."
        />

        <div className="mt-12">
          <AttentionGraph nodes={RESEARCH_NODES} />
        </div>

        <div className="mt-24">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              <span className="text-muted-foreground">{">"}</span> Core skills
            </h3>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              Skills grouped by focus area — each one specializing in a different part of the
              same problem.
            </p>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2">
            {SKILL_HEADS.map((head) => (
              <RevealItem key={head.id}>
                <Card className="h-full">
                  <h4 className="text-base font-semibold">{head.name}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground">{head.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {head.tools.map((tool) => (
                      <Badge key={tool}>{tool}</Badge>
                    ))}
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
