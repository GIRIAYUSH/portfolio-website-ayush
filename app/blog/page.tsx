import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { Card } from "@/components/ui/card";
import { PROFILE } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: `Projects and Research Blog — ${PROFILE.name}`,
  description: `Write-ups on projects and research from ${PROFILE.name}.`,
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} />
        Back home
      </Link>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
        Projects and Research Blog
      </h1>
      <p className="mt-3 max-w-xl text-base text-muted-foreground">
        Write-ups on projects and research as they happen.
      </p>

      {posts.length === 0 ? (
        <p className="mt-16 text-sm text-muted-foreground">Nothing published yet — check back soon.</p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden p-0">
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
                <Link href={`/blog/${post.slug}`} className="mt-1.5">
                  <h2 className="text-xl font-semibold transition-colors hover:text-accent">
                    {post.title}
                  </h2>
                </Link>
                {post.excerpt && (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent"
                  >
                    Read post
                    <ArrowUpRight size={14} />
                  </Link>
                  {post.link && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
                    >
                      <Code2 size={14} />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
