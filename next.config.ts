import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/** Set GITHUB_PAGES=true (and BASE_PATH when using a project site) for static export to GitHub Pages. */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const rawBase = (process.env.BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
const basePath =
  isGithubPages && rawBase ? `/${rawBase}` : undefined;

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  ...(isGithubPages ? { output: "export" as const } : {}),
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  images: {
    unoptimized: isGithubPages,
  },
  webpack: (config: any) => {
    config.module?.rules?.push({
      test: /\.bib$/,
      type: "asset/source",
    });
    return config;
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
