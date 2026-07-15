export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(assetPath: string) {
  if (/^https?:\/\//i.test(assetPath) || assetPath.startsWith("mailto:")) {
    return assetPath;
  }
  return `${BASE_PATH}${assetPath}`;
}
