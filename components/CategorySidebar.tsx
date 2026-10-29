import Link from "next/link";
import { categories, getCategoryTools, tools } from "@/lib/data";
import CategoryChip from "./CategoryChip";
import Icon from "./Icon";

export default function CategorySidebar({ active = "" }: { active?: string }) {
  const categoryLinks = (
    <nav aria-label="工具分类" className="grid grid-cols-1 gap-1">
      <Link
        href="/#directory"
        aria-current={!active ? "page" : undefined}
        className={`category-link ${!active ? "category-active" : ""}`}
      >
        <Icon name="grid" className="!h-[17px] !w-[17px]" />
        <span className="min-w-0 flex-1">全部工具</span>
        <span className="font-mono text-[10px] text-muted">{tools.length}</span>
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
  );
  return (
    <aside id="categories" className="min-w-0 scroll-mt-24">
      <details className="group rounded-lg border border-line p-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium">
          <span>{active ? categories.find((category) => category.slug === active)?.name : "按场景探索"}</span>
          <span className="flex items-center gap-2 text-xs font-normal text-muted">
            {categories.length} 个分类
            <Icon name="chevron" className="!h-4 !w-4 rotate-90 transition-transform group-open:-rotate-90" />
          </span>
        </summary>
        <div className="mt-4 border-t border-line pt-3">{categoryLinks}</div>
      </details>
      <div className="hidden lg:block">
        <div className="mb-5 flex items-center justify-between gap-2">
          <h2 className="eyebrow">按场景探索</h2>
          <span className="font-mono text-[10px] text-muted">{categories.length}</span>
        </div>
        {categoryLinks}
        <div className="mt-8 rounded-lg border border-line bg-paper p-4">
          <Icon name="plus" className="mb-4 !h-4 !w-4 text-muted" />
          <h3 className="text-xs font-medium">你的工具，也值得被看见。</h3>
          <p className="mt-2 text-xs leading-6 text-muted">
            把好产品介绍给正在出海的独立开发者。
          </p>
          <Link href="/submit/" className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium text-brand">
            提交工具 / 付费置顶 <Icon name="right" className="!h-3.5 !w-3.5" />
          </Link>
        </div>
        <p className="mt-5 text-[11px] leading-6 text-muted">
          手动整理，持续更新。
          <br />
          收录不代表背书，请按需选择。
        </p>
      </div>
    </aside>
  );
}
