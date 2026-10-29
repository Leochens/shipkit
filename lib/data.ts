import categoryData from "@/data/categories.json";
import toolData from "@/data/tools.json";

export type PricingTag = "Free" | "Freemium" | "Paid";
export interface Category {
  slug: string;
  name: string;
  short_name: string;
  english: string;
  description: string;
  icon: string;
}
export interface Tool {
  name: string;
  slug: string;
  url: string;
  description_zh: string;
  category: string;
  pricing_hint: string;
  pricing_tag: PricingTag;
  tags: string[];
  featured: boolean;
  added_at: string;
  logo_bg: string;
  logo_color: string;
  logo_text: string;
}
export const categories: Category[] = categoryData;
export const tools: Tool[] = toolData as Tool[];
export const getCategory = (slug: string) =>
  categories.find((category) => category.slug === slug);
export const getTool = (slug: string) =>
  tools.find((tool) => tool.slug === slug);
export const getCategoryTools = (slug: string) =>
  tools.filter((tool) => tool.category === slug);
export const featuredTools = tools.filter((tool) => tool.featured);
export const recentTools = [...tools].sort((a, b) =>
  b.added_at.localeCompare(a.added_at),
);
export const displayDomain = (url: string) =>
  new URL(url).hostname.replace(/^www\./, "");
