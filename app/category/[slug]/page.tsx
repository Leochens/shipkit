import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory, getCategoryTools } from "@/lib/data";
import CategorySidebar from "@/components/CategorySidebar";
import ToolDirectory from "@/components/ToolDirectory";
import Icon from "@/components/Icon";
import { socialMetadata, siteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} — ${category.english} for AI Builders`,
    description: `${category.description} ShipKit 为独立开发者整理 ${getCategoryTools(slug).length} 款${category.name}工具。`,
    alternates: { canonical: siteUrl(`/category/${slug}/`) },
    ...socialMetadata(
      `${category.name} | ShipKit`,
      category.description,
      `/category/${slug}/`,
    ),
  };
}
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const categoryTools = getCategoryTools(slug);
  return (
    <div className="page-shell py-8 sm:py-12">
      <nav
        aria-label="面包屑"
        className="mb-9 flex items-center gap-2 text-xs text-muted"
      >
        <Link href="/" className="hover:text-brand">
          首页
        </Link>
        <Icon name="chevron" className="!h-3 !w-3" />
        <span aria-current="page">{category.name}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[214px_minmax(0,1fr)] lg:gap-9">
        <CategorySidebar active={slug} />
        <div className="min-w-0">
          <section className="mb-9 rounded-2xl border border-[#dfe5d5] bg-[#f0f4e9] p-6 sm:p-9">
            <div className="mb-5 inline-flex rounded-xl border border-[#dce4d0] bg-white p-3 text-brand">
              <Icon name={category.icon} className="!h-6 !w-6" />
            </div>
            <p className="section-label !text-[9px]">{category.english}</p>
            <h1 className="text-3xl font-bold tracking-tight">
              {category.name}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#78816e]">
              {category.description}
            </p>
            <span className="mt-5 inline-block rounded-full bg-white/80 px-3 py-1 font-mono text-[10px] text-brand">
              {categoryTools.length} tools for your next launch
            </span>
          </section>
          <ToolDirectory
            tools={categoryTools}
            categories={categories}
            initialCategory={slug}
          />
          <section className="mt-9 flex flex-col justify-between gap-4 rounded-xl border border-line bg-white p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-sm font-semibold">这里还缺一款好工具？</h2>
              <p className="mt-2 text-xs text-muted">
                欢迎提交，帮助下一位独立开发者少走弯路。
              </p>
            </div>
            <Link href="/submit/" className="button button-outline text-xs">
              推荐工具 <Icon name="plus" className="!h-4 !w-4" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
