import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getAllPosts } from "@/lib/blog";

export async function RecentPosts() {
  const posts = (await getAllPosts()).slice(0, 2);

  if (posts.length === 0) return null;

  return (
    <section
      id="writing"
      className="relative scroll-mt-16 border-b border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="3.5"
            title="Recent Writing"
            description="Project write-ups and research notes, as they happen."
          />
          <Link
            href="/blog"
            className="mb-1 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wide text-accent"
          >
            View all posts
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <RevealItem key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  {post.image && (
                    <div className="relative aspect-video w-full overflow-hidden border-b border-border">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="font-mono text-xs text-muted-foreground">{post.date}</div>
                    <h3 className="mt-1.5 text-xl font-semibold transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Read post
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
