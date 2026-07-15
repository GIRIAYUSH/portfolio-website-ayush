import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2 } from "lucide-react";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} />
        All posts
      </Link>

      {post.image && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image src={post.image} alt={post.title} fill unoptimized className="object-cover" />
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="font-mono text-xs text-muted-foreground">{post.date}</div>
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Code2 size={13} />
            View code
          </a>
        )}
      </div>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        {post.title}
      </h1>

      <div
        className="prose prose-neutral mt-10 max-w-none prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
