import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { BrandMark } from "@/components/Brand";
import { tools, categories } from "@/lib/data";
import { CONTACT_EMAIL, socialMetadata, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于 ShipKit — 给独立开发者的 AI 产品出海工具箱",
  description:
    "ShipKit 整理独立开发者将 AI 产品推向海外所需的工具，覆盖开发、收款、上线与增长。了解我们的收录标准与赞助规则。",
  alternates: { canonical: siteUrl("/about/") },
  ...socialMetadata(
    "关于 ShipKit",
    "为独立开发者整理的 AI 产品出海工具目录。少踩坑，快上线。",
    "/about/",
  ),
};
export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-[#f1f4e9]">
        <div className="page-shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="section-label">A SMALL KIT. A BIGGER WORLD.</p>
            <h1 className="mt-5 text-[34px] font-bold leading-[1.45] tracking-tight sm:text-[43px]">
              好产品值得走得更远。
              <br />
              <span className="text-brand">一个人，也能卖向全球。</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-8 text-[#7a836e]">
              ShipKit 是为独立开发者整理的 AI 产品出海工具目录。
              <br />
              我们相信，把精力留给产品，把重复问题交给成熟工具。
            </p>
          </div>
          <div className="mx-auto flex aspect-square w-full max-w-[310px] flex-col items-center justify-center rounded-full border border-[#dce4cf] bg-white/40 p-9">
            <BrandMark className="!h-16 !w-16 !rounded-2xl" />
            <span className="mt-5 text-3xl font-bold tracking-tight">
              ShipKit.
            </span>
            <p className="mt-3 text-center font-mono text-[10px] leading-6 tracking-wider text-muted">
              BUILT BY ONE.
              <br />
              SHIPPED TO THE WORLD.
            </p>
            <div className="mt-5 flex items-center gap-4 text-[10px] text-brand">
              <span>{tools.length} TOOLS</span>
              <span>·</span>
              <span>{categories.length} CATEGORIES</span>
            </div>
          </div>
        </div>
      </section>
      <div className="page-shell py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <section>
            <p className="section-label">WHY SHIPKIT</p>
            <h2 className="text-2xl font-bold">上线需要的，远不止一个模型。</h2>
            <p className="prose-copy mt-6">
              做 AI
              产品时，接入模型只是开始。接下来还有海外收款、登录系统、部署、邮件送达、搜索流量和多语言体验。每个问题都不算新，却总要重新搜索、比较、踩坑。
            </p>
            <p className="prose-copy mt-4">
              ShipKit
              把这些环节放在同一个地方：按实际场景分类，用一句中文说明工具能做什么，给出官方入口和清晰的价格标签。希望你少开几个搜索标签页，多推进一点自己的产品。
            </p>
          </section>
          <section className="mt-12">
            <p className="section-label">HOW WE CURATE</p>
            <h2 className="text-2xl font-bold">收录有边界，推荐有依据。</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {[
                [
                  "globe",
                  "围绕出海，而非堆砌 AI",
                  "只整理对海外 AI 产品的开发、运营与增长有实际作用的工具。",
                ],
                [
                  "check",
                  "介绍清楚，链接直达",
                  "提供一句话用途、价格类型和官方链接，让你能快速判断与继续研究。",
                ],
                [
                  "sparkles",
                  "精选与赞助分开",
                  "编辑精选不由付费决定。付费展示明确标记，展示方案与时长公开。",
                ],
                [
                  "heart",
                  "持续维护，也接受纠错",
                  "工具会变化。欢迎报告失效链接、定价变化，或推荐我们遗漏的好工具。",
                ],
              ].map(([icon, title, description]) => (
                <article
                  key={title}
                  className="rounded-xl border border-line bg-white p-6"
                >
                  <Icon name={icon} className="text-brand" />
                  <h3 className="mt-5 text-sm font-semibold">{title}</h3>
                  <p className="mt-3 text-xs leading-7 text-muted">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </section>
          <section className="mt-12 rounded-2xl border border-[#dce5d0] bg-[#edf2e6] p-7 sm:p-9">
            <h2 className="text-xl font-bold">一起，把这份工具箱补齐。</h2>
            <p className="mt-4 text-sm leading-8 text-muted">
              我是 Ryan，ShipKit
              的维护者。如果你在做一个帮助独立开发者的工具，或想分享自己的出海工具栈，欢迎联系。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/submit/" className="button button-green text-xs">
                提交工具 / 付费置顶 <Icon name="right" className="!h-4 !w-4" />
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="button button-outline break-all text-xs"
              >
                联系 Ryan <Icon name="mail" className="!h-4 !w-4" />
              </a>
            </div>
          </section>
          <div className="mt-9 text-center">
            <Link href="/" className="text-xs text-brand">
              返回工具目录 ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
