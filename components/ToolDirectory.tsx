"use client";
import { useState } from "react";
import type { Category, Tool } from "@/lib/data";
import ToolCard from "./ToolCard";
import Icon from "./Icon";

export default function ToolDirectory({
  tools,
  categories,
  initialCategory = "",
}: {
  tools: Tool[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [pricing, setPricing] = useState("all");
  const [category, setCategory] = useState(initialCategory);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showAll, setShowAll] = useState(false);
  const [sort, setSort] = useState("recent");
  const filtered = tools
    .filter((tool) => {
      const categoryName =
        categories.find((item) => item.slug === tool.category)?.name || "";
      const haystack =
        `${tool.name} ${tool.description_zh} ${tool.tags.join(" ")} ${categoryName}`.toLocaleLowerCase();
      return (
        haystack.includes(query.trim().toLocaleLowerCase()) &&
        (pricing === "all" || tool.pricing_tag === pricing) &&
        (!category || tool.category === category)
      );
    })
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : b.added_at.localeCompare(a.added_at),
    );
  const visible =
    showAll || query || category || pricing !== "all"
      ? filtered
      : filtered.slice(0, 9);
  function reset() {
    setQuery("");
    setPricing("all");
    setCategory(initialCategory);
    setShowAll(false);
  }
  return (
    <section id="directory" className="scroll-mt-8">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="eyebrow">THE DIRECTORY</span>
          </div>
          <h2 className="text-[23px] font-bold tracking-tight">
            {initialCategory ? "分类工具" : "最近收录"}{" "}
            <span className="ml-1 align-middle font-mono text-xs font-normal text-muted">
              / {String(filtered.length).padStart(2, "0")}
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="sort-tools">
            工具排序
          </label>
          <select
            id="sort-tools"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="max-w-[112px] bg-transparent text-[11px] text-muted outline-none"
          >
            <option value="recent">最新收录优先</option>
            <option value="name">名称 A–Z</option>
          </select>
          <div className="hidden rounded-lg border border-line bg-white p-1 sm:flex">
            {(["grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-label={mode === "grid" ? "网格视图" : "列表视图"}
                aria-pressed={view === mode}
                onClick={() => setView(mode)}
                className={`rounded p-1.5 ${view === mode ? "bg-brand-light text-brand" : "text-muted"}`}
              >
                <Icon name={mode} className="!h-3.5 !w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="absolute left-3.5 top-3.5 !h-4 !w-4 text-[#89917e]"
          />
          <label htmlFor="tool-search" className="sr-only">
            搜索工具、功能或关键词
          </label>
          <input
            id="tool-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索工具、功能或关键词…"
            className="field !pl-10"
          />
        </div>
        <div className="flex gap-3">
          <label className="sr-only" htmlFor="filter-pricing">
            按价格筛选
          </label>
          <select
            id="filter-pricing"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="field w-auto flex-1 sm:max-w-[133px]"
          >
            <option value="all">所有价格</option>
            <option value="Free">Free · 免费</option>
            <option value="Freemium">Freemium</option>
            <option value="Paid">Paid · 付费</option>
          </select>
          {!initialCategory && (
            <>
              <label htmlFor="filter-category" className="sr-only">
                按分类筛选
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="field w-auto flex-1 sm:max-w-[147px]"
              >
                <option value="">所有分类</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.short_name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
      <div aria-live="polite" className="sr-only">
        找到 {filtered.length} 款工具
      </div>
      {visible.length ? (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              : "grid grid-cols-1 gap-3"
          }
        >
          {visible.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} list={view === "list"} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line bg-white px-5 py-16 text-center">
          <Icon name="search" className="mx-auto mb-4 text-muted" />
          <h3 className="font-semibold">暂时没有找到匹配工具</h3>
          <p className="mt-2 text-xs leading-6 text-muted">
            试试其他关键词，或清除筛选重新探索。
          </p>
          <button
            type="button"
            onClick={reset}
            className="button button-outline mt-5 text-xs"
          >
            清除筛选
          </button>
        </div>
      )}
      {filtered.length > visible.length && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="button button-outline mt-6 w-full !bg-transparent text-xs"
        >
          查看全部 {filtered.length} 款工具{" "}
          <Icon name="right" className="!h-3.5 !w-3.5" />
        </button>
      )}
      {(query || pricing !== "all" || category !== initialCategory) &&
        filtered.length > 0 && (
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-xs text-brand underline underline-offset-4"
          >
            清除筛选
          </button>
        )}
    </section>
  );
}
