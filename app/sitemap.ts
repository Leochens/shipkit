import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { categories, tools } from "@/lib/data";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", "/submit", "/about"].map((path) => ({
      url: siteUrl(`${path}/`),
      changeFrequency: "weekly" as const,
      priority: path ? 0.7 : 1,
    })),
    ...categories.map((category) => ({
      url: siteUrl(`/category/${category.slug}/`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...tools.map((tool) => ({
      url: siteUrl(`/tools/${tool.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
