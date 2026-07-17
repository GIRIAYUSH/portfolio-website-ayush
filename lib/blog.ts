import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import { BASE_PATH, withBasePath } from "@/lib/base-path";

const BLOG_DIR = path.join(process.cwd(), "blogs");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  link?: string;
  image?: string;
  excerpt: string;
  contentHtml: string;
};

function humanize(slug: string) {
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * The card excerpt is auto-derived from the first `## ...` section rather
 * than a separate hand-written summary field, per the authoring convention:
 * `# Title` -> `link:`/`image:`/`date:` metadata lines -> `## Introduction`.
 */
function extractIntro(bodyLines: string[]) {
  const start = bodyLines.findIndex((line) => line.startsWith("## "));
  if (start === -1) return "";
  const collected: string[] = [];
  for (let i = start + 1; i < bodyLines.length; i++) {
    if (bodyLines[i].startsWith("#")) break;
    collected.push(bodyLines[i]);
  }
  return collected
    .join(" ")
    .replace(/[#*_`>[\]!]/g, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

function parsePost(raw: string, slug: string, fallbackDate: string) {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;

  let title = humanize(slug);
  if (lines[i]?.startsWith("# ")) {
    title = lines[i].slice(2).trim();
    i++;
  }

  const metadata: Record<string, string> = {};
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      continue;
    }
    const match = line.match(/^(link|image|date):\s*(.+)$/i);
    if (!match) break;
    metadata[match[1].toLowerCase()] = match[2].trim();
    i++;
  }

  const bodyLines = lines.slice(i);
  const body = bodyLines.join("\n").trim();

  return {
    title,
    link: metadata.link,
    image: metadata.image ? withBasePath(`/blog-images/${metadata.image}`) : undefined,
    date: metadata.date || fallbackDate,
    excerpt: extractIntro(bodyLines),
    body,
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const stat = fs.statSync(fullPath);
  const parsed = parsePost(raw, slug, stat.mtime.toISOString().slice(0, 10));

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(parsed.body || "_This post doesn't have any content yet._");

  // Rewrite root-relative content images (e.g. from ![alt](/blog-images/foo.png))
  // so they resolve correctly under a GitHub Pages project basePath too.
  const contentHtml = processed.toString().replace(/src="\//g, `src="${BASE_PATH}/`);

  return {
    slug,
    title: parsed.title,
    date: parsed.date,
    link: parsed.link,
    image: parsed.image,
    excerpt: parsed.excerpt,
    contentHtml,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(getPostSlugs().map((slug) => getPostBySlug(slug)));
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
