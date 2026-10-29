import type { Metadata } from "next";
import SubmissionForm from "@/components/SubmissionForm";
import { contactLink, socialMetadata, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "提交工具 / 付费置顶 — Submit & Sponsor",
  description:
    "向 ShipKit 提交 AI 产品出海工具。免费投稿每月 10 个；分类置顶 $69 / 30 天，首页焦点 $199 / 30 天，季度赞助 $499。",
  alternates: { canonical: siteUrl("/submit/") },
  ...socialMetadata(
    "提交工具 / 付费置顶 | ShipKit",
    "分类置顶 $69 / 30 天，首页焦点 $199 / 30 天，季度赞助 $499。免费投稿每月限额 10 个。",
    "/submit/",
  ),
};
export default function SubmitPage() {
  return (
    <div className="page-shell py-12 sm:py-16">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <p className="section-label">GOOD TOOLS DESERVE TO BE FOUND</p>
        <h1 className="mt-5 text-[32px] font-bold leading-snug tracking-[-1px] sm:text-[42px]">
          让正在出海的人，
          <br className="sm:hidden" />
          发现你的工具。
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-muted">
          连接工具创造者和独立开发者。提交你的产品，
          <br className="hidden sm:block" />
          或选择一个合适的展示位，让下一次上线多一位同行。
        </p>
      </header>
      <SubmissionForm />
      <section className="mx-auto mt-16 max-w-3xl border-t border-line pt-10">
        <p className="section-label">A FEW THINGS TO KNOW</p>
        <h2 className="mb-6 text-2xl font-semibold">你可能还想了解</h2>
        <div className="divide-y divide-line">
          {[
            [
              "什么工具适合提交？",
              "帮助独立开发者把 AI 产品推向海外的工具，包括模型 API、收款、鉴权、托管、存储、邮件、分析、SEO、本地化、设计、合规以及 Agent / MCP 工具。",
            ],
            [
              "免费投稿的 10 个名额如何安排？",
              "每个自然月最多安排 10 个免费收录，由编辑审核与排期。名额用完后进入后续队列，也可选择付费展示。本站不提供实时名额计数，是否入选以邮件确认为准。",
            ],
            [
              "付款和展示从什么时候开始？",
              "提交信息后，我们通过邮件确认适配度、展示位置与排期，再沟通付款安排。30 天展示从约定上线日计算；季度赞助为 3 个月。当前没有在线付款入口。",
            ],
            [
              "付费会影响编辑推荐吗？",
              "首页编辑精选独立选择。付费置顶与赞助展示会明确标注 Featured 或 Sponsored，不混入编辑精选，也不承诺点击、排名或收入。",
            ],
          ].map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                {question}
                <span
                  aria-hidden="true"
                  className="text-lg font-normal text-muted group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-xs leading-7 text-muted">
                {answer}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          有其他想法？
          <a
            href={contactLink("ShipKit 展示合作咨询")}
            className="text-brand underline underline-offset-4"
          >
            直接邮件聊聊 ↗
          </a>
        </p>
      </section>
    </div>
  );
}
