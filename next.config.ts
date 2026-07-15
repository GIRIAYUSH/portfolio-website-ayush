import type { NextConfig } from "next";
import path from "path";

// GitHub Pages project sites are served at /<repo-name>/, but a repo named
// <user>.github.io is served at the domain root. GITHUB_REPOSITORY is set
// automatically inside GitHub Actions, so this resolves itself in CI and
// stays empty for local dev / any other host.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgSite = repoName.toLowerCase().endsWith(".github.io");
const basePath = process.env.GITHUB_ACTIONS && repoName && !isUserOrOrgSite ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
