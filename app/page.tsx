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
      <section className="relative overflow-hidden border-b border-line bg-[#f4f6ee]">
        <div className="hero-grid absolute inset-y-0 right-0 w-1/2 opacity-40" />
        <div className="page-shell relative grid items-center gap-10 py-14 sm:py-[70px] lg:grid-cols-[1.4fr_1fr] lg:py-[72px]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dde4d3] bg-white/70 px-3 py-1.5 text-[10px] text-[#617455]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#79975d]" />
              FOR INDIE BUILDERS, GOING GLOBAL
            </div>
            <h1 className="text-[36px] font-bold leading-[1.4] tracking-[-1.7px] sm:text-[47px] sm:leading-[1.35] xl:text-[52px]">
              少踩坑，快上线。
              <br />把 AI 产品
              <span className="relative whitespace-nowrap text-brand">
                卖向全球
                <svg
                  viewBox="0 0 218 10"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-2.5 w-full text-[#b6c69d]"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7Q100 0 216 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              。
            </h1>
            <p className="mt-7 max-w-[510px] text-[13px] leading-[2] text-[#7b8272] sm:text-sm">
              从第一行代码，到第一笔海外收入。
              <br />
              模型 API、收款、托管、增长……你需要的工具，都在这里。
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="#directory" className="button button-green text-xs">
                探索出海工具 <Icon name="right" className="!h-4 !w-4" />
              </Link>
              <Link
                href="/submit/"
                className="button text-xs text-[#626e56] hover:bg-[#e8eddc]"
              >
                提交你的工具 <Icon name="arrow" className="!h-3.5 !w-3.5" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-[#88917d]">
              <span className="flex items-center gap-1.5">
                <Icon name="check" className="!h-3 !w-3" />
                {tools.length} 款精选工具
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="check" className="!h-3 !w-3" />
                12 个出海场景
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
      <div className="border-b border-line bg-white/70">
        <div className="page-shell flex flex-col gap-3 py-[18px] text-center sm:flex-row sm:items-center sm:justify-center sm:gap-5">
          <span className="text-[10px] text-[#a0a593]">
            LESS SEARCHING. MORE SHIPPING.
          </span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <p className="text-[11px] tracking-wide text-[#818975]">
            不止找到工具，更快拼出你的出海技术栈。
          </p>
        </div>
      </div>
      <div className="page-shell py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[214px_minmax(0,1fr)] lg:gap-9">
          <CategorySidebar />
          <div className="min-w-0">
            <section className="mb-10" aria-labelledby="featured-heading">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon
                      name="sparkles"
                      className="!h-3.5 !w-3.5 text-brand"
                    />
                    <span className="eyebrow">CURATED STARTING POINTS</span>
                  </div>
                  <h2
                    id="featured-heading"
                    className="text-[23px] font-bold tracking-tight"
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
            <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-xl border border-dashed border-[#d9dfcf] p-6 sm:flex-row sm:items-center">
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
