import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import LaunchStack from "@/components/LaunchStack";
import ToolCard from "@/components/ToolCard";
import CategorySidebar from "@/components/CategorySidebar";
import ToolDirectory from "@/components/ToolDirectory";
import NewsletterForm from "@/components/NewsletterForm";
import { categories, tools, featuredTools } from "@/lib/data";
import { siteUrl, SITE_DESCRIPTION, socialMetadata } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI Shipping Tools Directory for Indie Hackers | ShipKit",
  },
  alternates: { canonical: siteUrl("/") },
  ...socialMetadata("ShipKit — 少踩坑，快上线。", SITE_DESCRIPTION, "/"),
};
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ShipKit AI Shipping Tools Directory",
    description: "独立开发者的 AI 产品出海工具目录",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: siteUrl(`/tools/${tool.slug}/`),
      name: tool.name,
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="border-b border-line bg-paper">
        <div className="page-shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.6fr_1fr] lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 text-[10px] font-medium tracking-[.14em] text-muted">
              <Icon name="globe" className="!h-3.5 !w-3.5" />
              FOR INDIE BUILDERS, GOING GLOBAL
            </div>
            <h1 className="text-[30px] font-semibold leading-[1.5] tracking-[-1.2px] sm:text-[44px] sm:leading-[1.4] sm:tracking-[-2px] xl:text-[50px]">
              少踩坑，快上线。
              <br />把 AI 产品
              <span className="text-brand">卖向全球</span>
              。
            </h1>
            <p className="mt-6 max-w-[510px] text-sm leading-8 text-zinc-600">
              从第一行代码，到第一笔海外收入。
              <br />
              模型 API、收款、托管、增长……你需要的工具，都在这里。
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="#directory" className="button button-primary text-xs">
                探索出海工具 <Icon name="right" className="!h-4 !w-4" />
              </Link>
              <Link
                href="/submit/"
                className="button button-outline text-xs"
              >
                提交你的工具 <Icon name="arrow" className="!h-3.5 !w-3.5" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <Icon name="check" className="!h-3 !w-3" />
                {tools.length} 款精选工具
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="check" className="!h-3 !w-3" />
                {categories.length} 个出海场景
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="check" className="!h-3 !w-3" />
                为独立开发者整理
              </span>
            </div>
          </div>
          <LaunchStack />
        </div>
      </section>
      <div className="border-b border-line bg-white">
        <div className="page-shell flex flex-col gap-3 py-[18px] text-center sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <span className="text-[10px] text-zinc-400">
            LESS SEARCHING. MORE SHIPPING.
          </span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <p className="text-[11px] tracking-wide text-muted">
            不止找到工具，更快拼出你的出海技术栈。
          </p>
        </div>
      </div>
      <div className="page-shell py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <CategorySidebar />
          <div className="min-w-0">
            <section className="mb-12" aria-labelledby="featured-heading">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon
                      name="sparkles"
                      className="!h-3.5 !w-3.5 text-muted"
                    />
                    <span className="eyebrow">CURATED STARTING POINTS</span>
                  </div>
                  <h2
                    id="featured-heading"
                    className="text-[22px] font-semibold tracking-tight"
                  >
                    出海，先从这几款开始
                  </h2>
                </div>
                <span className="hidden text-[10px] text-muted sm:block">
                  编辑精选 · 非付费推荐
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} featured />
                ))}
              </div>
              <p className="mt-3 text-[10px] text-muted sm:hidden">
                编辑精选 · 非付费推荐
              </p>
            </section>
            <ToolDirectory tools={tools} categories={categories} />
            <div className="mt-10">
              <NewsletterForm />
            </div>
            <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-lg border border-line bg-paper p-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-sm font-semibold">
                  你正在做的，也可能是别人的下一块拼图。
                </h2>
                <p className="mt-2 text-xs text-muted">
                  提交出海工具，或通过赞助获得更多曝光。
                </p>
              </div>
              <Link
                href="/submit/"
                className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-brand"
              >
                提交工具 / 付费置顶 <Icon name="arrow" className="!h-4 !w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
