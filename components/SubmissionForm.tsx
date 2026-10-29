"use client";
import { useState, type FormEvent } from "react";
import { categories } from "@/lib/data";
import { contactLink, CONTACT_EMAIL } from "@/lib/site";
import Icon from "./Icon";

const plans = [
  {
    id: "featured",
    title: "Featured listing",
    subtitle: "分类页置顶，让对的人先看到",
    price: 69,
    duration: "30 天",
    features: [
      "Category top · 分类顶部展示",
      "展示 30 天",
      "明确标注 Featured 付费展示",
    ],
    label: "选择分类置顶",
  },
  {
    id: "spotlight",
    title: "Homepage spotlight",
    subtitle: "出现在首页，获得更多关注",
    price: 199,
    duration: "30 天",
    features: [
      "Homepage spotlight · 首页焦点位",
      "展示 30 天",
      "明确标注 Sponsored 赞助展示",
    ],
    label: "选择首页焦点",
  },
  {
    id: "sponsor",
    title: "Quarterly sponsor",
    subtitle: "陪伴更多产品从想法走向上线",
    price: 499,
    duration: "每季度",
    features: [
      "Home + category badge",
      "首页展示 + 所属分类赞助徽章",
      "展示一个季度（3 个月）",
    ],
    label: "成为季度赞助商",
  },
];
export default function SubmissionForm() {
  const [plan, setPlan] = useState("free");
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function choosePlan(id: string) {
    setPlan(id);
    setDraft("");
    setSubmitted(false);
    document
      .getElementById("submit-form")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("name") || "").trim();
    const url = String(values.get("url") || "").trim();
    const email = String(values.get("email") || "").trim();
    const description = String(values.get("description") || "").trim();
    const category = String(values.get("category") || "");
    if (
      name.length < 2 ||
      !description ||
      !category ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setError("请填写工具名称、有效邮箱、分类和一句话介绍。");
      setDraft("");
      return;
    }
    try {
      const parsed = new URL(url);
      if (
        !["http:", "https:"].includes(parsed.protocol) ||
        !parsed.hostname.includes(".")
      )
        throw new Error("Invalid URL");
    } catch {
      setError("请填写有效的官网地址，例如 https://example.com。");
      setDraft("");
      return;
    }
    const chosenPlan = plans.find((item) => item.id === plan);
    const label = chosenPlan
      ? `${chosenPlan.title} — $${chosenPlan.price} / ${chosenPlan.duration}`
      : "Free submission — 每月限额 10 个，超额排队";
    const body = `你好，我想提交工具到 ShipKit。\n\n工具名称：${name}\n官网：${url}\n分类：${categories.find((item) => item.slug === category)?.name}\n一句话介绍：${description}\n联系邮箱：${email}\n展示方案：${label}\n\n补充信息：${String(values.get("notes") || "").trim()}\n\n我了解：需要发送本邮件后才算投稿，收录和展示由编辑审核确认。`;
    setDraft(
      contactLink(
        `ShipKit 工具投稿：${name}（${chosenPlan?.title || "免费收录"}）`,
        body,
      ),
    );
    setSubmitted(true);
    setError("");
  }
  return (
    <>
      <section aria-label="付费展示方案" className="grid gap-5 md:grid-cols-3">
        {plans.map((item, index) => (
          <article
            key={item.id}
            className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${index === 1 ? "border-[#a9ba94] bg-[#f0f4e8]" : "border-line bg-white"}`}
          >
            {index === 1 && (
              <span className="absolute right-5 top-[-11px] rounded-full bg-brand px-3 py-1 font-mono text-[9px] tracking-wide text-white">
                MORE VISIBILITY
              </span>
            )}
            <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e0e5d8] bg-white text-brand">
              <Icon
                name={
                  index === 0 ? "layout" : index === 1 ? "sparkles" : "globe"
                }
                className="!h-4 !w-4"
              />
            </span>
            <h2 className="text-[18px] font-bold tracking-tight">
              {item.title}
            </h2>
            <p className="mt-2 text-xs leading-6 text-muted">{item.subtitle}</p>
            <p className="mb-7 mt-6">
              <span className="text-[40px] font-bold tracking-[-1.5px]">
                ${item.price}
              </span>
              <span className="ml-2 text-xs text-muted">/ {item.duration}</span>
            </p>
            <ul className="mb-8 space-y-3">
              {item.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-xs leading-6 text-[#7e8774]"
                >
                  <Icon
                    name="check"
                    className="mt-1 !h-3.5 !w-3.5 text-brand"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              aria-pressed={plan === item.id}
              onClick={() => choosePlan(item.id)}
              className={`button mt-auto w-full text-xs ${index === 1 ? "button-green" : "button-outline"}`}
            >
              {item.label}
              <Icon name="right" className="!h-3.5 !w-3.5" />
            </button>
          </article>
        ))}
      </section>
      <div className="mt-6 flex flex-col justify-between gap-5 rounded-xl border border-dashed border-[#ced8c0] bg-[#f5f7ef] p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-semibold">刚起步？免费投稿也欢迎。</h2>
          <p className="mt-2 text-xs leading-6 text-muted">
            Free submissions 每月限额{" "}
            <strong className="font-semibold text-ink">10 个</strong>
            。超出后进入待审核队列，也可选择付费展示。
          </p>
        </div>
        <button
          type="button"
          aria-pressed={plan === "free"}
          onClick={() => choosePlan("free")}
          className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-brand"
        >
          免费提交 <Icon name="right" className="!h-4 !w-4" />
        </button>
      </div>
      <section
        id="submit-form"
        className="mt-14 grid scroll-mt-8 gap-8 lg:grid-cols-[.8fr_1.2fr]"
      >
        <div>
          <p className="section-label">LET&apos;S GET YOU LISTED</p>
          <h2 className="text-2xl font-bold tracking-tight">说说你的工具。</h2>
          <p className="mt-5 max-w-sm text-sm leading-8 text-muted">
            面向独立开发者，帮助他们把 AI
            产品卖向海外。如果你的工具解决了其中一个真实问题，我们很想认识它。
          </p>
          <ol className="mt-7 space-y-5 text-xs text-muted">
            {[
              "填写工具与联系信息",
              "生成邮件草稿，确认后发送",
              "编辑审核，邮件确认收录或展示安排",
            ].map((text, index) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line bg-white font-mono text-[10px] text-brand">
                  0{index + 1}
                </span>
                {text}
              </li>
            ))}
          </ol>
          <p className="mt-7 text-xs leading-7 text-muted">
            付费方案通过邮件沟通安排，确认前无需付款。
            <br />
            也可以直接联系：
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="break-all text-brand underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          onChange={() => {
            if (submitted) {
              setDraft("");
              setSubmitted(false);
            }
          }}
          noValidate
          className="rounded-2xl border border-line bg-white p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="tool-name"
                className="mb-2 block text-xs font-medium"
              >
                工具名称 <span className="text-brand">*</span>
              </label>
              <input
                id="tool-name"
                name="name"
                required
                minLength={2}
                maxLength={80}
                placeholder="例如：My Shipping Tool"
                className="field"
              />
            </div>
            <div>
              <label
                htmlFor="tool-url"
                className="mb-2 block text-xs font-medium"
              >
                官网地址 <span className="text-brand">*</span>
              </label>
              <input
                id="tool-url"
                name="url"
                type="url"
                required
                maxLength={500}
                placeholder="https://example.com"
                className="field"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-xs font-medium"
              >
                联系邮箱 <span className="text-brand">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
                placeholder="you@example.com"
                className="field"
              />
            </div>
            <div>
              <label
                htmlFor="tool-category"
                className="mb-2 block text-xs font-medium"
              >
                所属分类 <span className="text-brand">*</span>
              </label>
              <select
                id="tool-category"
                name="category"
                defaultValue=""
                required
                className="field"
              >
                <option value="" disabled>
                  选择一个分类
                </option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="tool-description"
              className="mb-2 block text-xs font-medium"
            >
              一句话介绍 <span className="text-brand">*</span>
            </label>
            <textarea
              id="tool-description"
              name="description"
              required
              maxLength={240}
              rows={3}
              placeholder="它能帮独立开发者解决什么问题？"
              className="field !h-auto py-3"
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="listing-plan"
              className="mb-2 block text-xs font-medium"
            >
              展示方案
            </label>
            <select
              id="listing-plan"
              name="plan"
              value={plan}
              onChange={(e) => {
                setPlan(e.target.value);
                setDraft("");
              }}
              className="field"
            >
              <option value="free">
                Free submission — $0（每月 10 个，超额排队）
              </option>
              {plans.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} — ${item.price} / {item.duration}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <label
              htmlFor="tool-notes"
              className="mb-2 block text-xs font-medium"
            >
              补充信息 <span className="font-normal text-muted">（选填）</span>
            </label>
            <textarea
              id="tool-notes"
              name="notes"
              rows={2}
              maxLength={1500}
              placeholder="目标用户、定价说明、期望展示时间等"
              className="field !h-auto py-3"
            />
          </div>
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg bg-red-50 p-3 text-xs leading-6 text-red-700"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            className="button button-green mt-6 w-full text-xs"
          >
            生成投稿邮件 <Icon name="mail" className="!h-4 !w-4" />
          </button>
          <p className="mt-3 text-center text-[10px] leading-5 text-muted">
            信息仅用于生成邮件草稿，未连接服务器或支付服务。
          </p>
          {draft && (
            <div
              role="status"
              className="mt-5 rounded-xl border border-[#dbe5ce] bg-brand-light p-4"
            >
              <p className="text-sm font-semibold text-brand">
                邮件草稿已准备好
              </p>
              <p className="mt-2 text-xs leading-6 text-muted">
                请打开邮件客户端并发送给 {CONTACT_EMAIL}
                。生成草稿不代表已投稿；审核与排期会通过邮件确认。
              </p>
              <a
                href={draft}
                className="button button-green mt-4 w-full text-xs"
              >
                打开邮件客户端并发送{" "}
                <Icon name="arrow" className="!h-3.5 !w-3.5" />
              </a>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
