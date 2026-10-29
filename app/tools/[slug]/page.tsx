import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  tools,
  getTool,
  getCategory,
  getCategoryTools,
  displayDomain,
} from "@/lib/data";
import { contactLink, socialMetadata, siteUrl } from "@/lib/site";
import ToolLogo from "@/components/ToolLogo";
import ToolCard, { PricingBadge } from "@/components/ToolCard";
import Icon from "@/components/Icon";

export const dynamicParams = false;
export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — ${getCategory(tool.category)?.name} · ${tool.pricing_tag}`,
    description: tool.description_zh,
    alternates: { canonical: siteUrl(`/tools/${slug}/`) },
    ...socialMetadata(
      `${tool.name} | ShipKit`,
      tool.description_zh,
      `/tools/${slug}/`,
    ),
  };
}
export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const category = getCategory(tool.category)!;
  const related = getCategoryTools(category.slug)
    .filter((item) => item.slug !== slug)
    .slice(0, 3);
  return (
    <div className="page-shell py-8 sm:py-12">
      <nav
        aria-label="面包屑"
        className="mb-9 flex flex-wrap items-center gap-2 text-xs text-muted"
      >
        <Link href="/" className="hover:text-brand">
          首页
        </Link>
        <Icon name="chevron" className="!h-3 !w-3" />
        <Link href={`/category/${category.slug}/`} className="hover:text-brand">
          {category.name}
        </Link>
        <Icon name="chevron" className="!h-3 !w-3" />
        <span aria-current="page">{tool.name}</span>
      </nav>
      <div className="grid items-start gap-7 lg:grid-cols-[1fr_300px]">
        <article className="min-w-0 rounded-lg border border-line bg-white p-6 sm:p-10">
          <div className="flex items-center gap-4 sm:gap-5">
            <ToolLogo tool={tool} large />
            <div className="min-w-0">
              <Link
                href={`/category/${category.slug}/`}
                className="text-[11px] text-brand hover:underline"
              >
                {category.name}
              </Link>
              <h1 className="mt-2 break-words text-[25px] font-bold tracking-tight sm:text-4xl">
                {tool.name}
              </h1>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex max-w-full items-center gap-1 break-all text-xs text-muted hover:text-brand"
              >
                {displayDomain(tool.url)}
                <Icon name="arrow" className="!h-3 !w-3" />
              </a>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted">
            {tool.description_zh}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-line bg-paper px-3 py-1.5 text-[11px] text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="my-9 h-px bg-line" />
          <h2 className="text-lg font-semibold">它能帮你做什么？</h2>
          <p className="mt-4 text-sm leading-8 text-muted">
            {category.description}
          </p>
          <p className="mt-3 text-sm leading-8 text-muted">
            在搭建 AI 产品时，可以将 {tool.name} 作为「{category.short_name}
            」环节的候选工具。先从官方文档和可用方案开始，结合你的技术栈、目标市场与实际用量选择。
          </p>
          <div className="mt-8 rounded-lg border border-line bg-paper p-5">
            <div className="flex items-center gap-2">
              <Icon name="card" className="!h-4 !w-4 text-brand" />
              <h2 className="text-sm font-semibold">费用参考</h2>
              <PricingBadge tag={tool.pricing_tag} />
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">
              {tool.pricing_hint}
            </p>
            <p className="mt-2 text-[11px] leading-6 text-muted">
              标签用于快速筛选，具体价格、地区可用性和商业条款请以官网为准。
            </p>
          </div>
        </article>
        <aside className="space-y-5">
          <div className="rounded-lg border border-line bg-white p-6">
            <h2 className="text-sm font-semibold">加入你的出海工具箱</h2>
            <p className="my-4 text-xs leading-6 text-muted">
              前往官网，了解产品、文档和最新方案。
            </p>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary w-full text-xs"
            >
              访问 {tool.name} 官网 <Icon name="arrow" className="!h-4 !w-4" />
            </a>
            <dl className="mt-6 space-y-4 border-t border-line pt-5 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">分类</dt>
                <dd>
                  <Link
                    href={`/category/${category.slug}/`}
                    className="text-brand hover:underline"
                  >
                    {category.short_name}
                  </Link>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">定价类型</dt>
                <dd>
                  <PricingBadge tag={tool.pricing_tag} />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">收录日期</dt>
                <dd className="font-mono text-[10px]">{tool.added_at}</dd>
              </div>
            </dl>
            <a
              href={contactLink(
                `ShipKit 信息纠错：${tool.name}`,
                `工具页面：${siteUrl(`/tools/${tool.slug}/`)}\n需要更新的信息：\n`,
              )}
              className="mt-6 block text-center text-[10px] text-muted underline underline-offset-4"
            >
              发现信息有误？告诉我们
            </a>
          </div>
          <div className="rounded-lg bg-paper p-6">
            <Icon name="sparkles" className="text-brand" />
            <h2 className="mt-4 text-sm font-semibold">也在做一个好工具？</h2>
            <p className="mt-2 text-xs leading-6 text-muted">
              让更多独立开发者发现你的产品。
            </p>
            <Link
              href="/submit/"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand"
            >
              提交工具 / 付费置顶 <Icon name="right" className="!h-3 !w-3" />
            </Link>
          </div>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="section-label">KEEP EXPLORING</p>
              <h2 className="text-xl font-semibold">同类工具，也看看</h2>
            </div>
            <Link
              href={`/category/${category.slug}/`}
              className="inline-flex items-center gap-1 text-xs text-brand"
            >
              全部同类 <Icon name="arrow" className="!h-3 !w-3" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ToolCard key={item.slug} tool={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
