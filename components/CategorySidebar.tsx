import Link from "next/link";
import { categories, getCategoryTools, tools } from "@/lib/data";
import CategoryChip from "./CategoryChip";
import Icon from "./Icon";
export default function CategorySidebar({ active = "" }: { active?: string }) {
  return (
    <aside id="categories" className="scroll-mt-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="eyebrow">按场景探索</h2>
        <span className="font-mono text-[10px] text-muted">12 CATEGORIES</span>
      </div>
      <nav
        aria-label="工具分类"
        className="grid grid-cols-2 gap-1 lg:grid-cols-1"
      >
        <Link
          href="/#directory"
          className={`category-link ${!active ? "category-active" : ""}`}
        >
          <Icon name="grid" className="!h-[17px] !w-[17px]" />
          <span className="flex-1">全部工具</span>
          <span className="font-mono text-[10px] opacity-60">
            {tools.length}
          </span>
        </Link>
        {categories.map((category) => (
          <CategoryChip
            key={category.slug}
            category={category}
            count={getCategoryTools(category.slug).length}
            active={active === category.slug}
          />
        ))}
      </nav>
      <div className="mt-7 hidden rounded-xl border border-[#e3e7da] bg-[#f0f3ea] p-5 lg:block">
        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand">
          <Icon name="sparkles" className="!h-4 !w-4" />
        </div>
        <h3 className="text-[13px] font-semibold">你的工具，也值得被看见。</h3>
        <p className="mt-2 text-[11px] leading-6 text-[#808977]">
          把好产品介绍给正在出海的独立开发者。
        </p>
        <Link
          href="/submit/"
          className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-brand"
        >
          提交工具 / 付费置顶 <Icon name="right" className="!h-3.5 !w-3.5" />
        </Link>
      </div>
      <p className="mt-5 hidden text-[10px] leading-5 text-[#989d92] lg:block">
        手动整理，持续更新。
        <br />
        收录不代表背书，请按需选择。
      </p>
    </aside>
  );
}
