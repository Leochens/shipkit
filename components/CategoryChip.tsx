import Link from "next/link";
import type { Category } from "@/lib/data";
import Icon from "./Icon";
export default function CategoryChip({
  category,
  count,
  active = false,
}: {
  category: Category;
  count: number;
  active?: boolean;
}) {
  return (
    <Link
      href={`/category/${category.slug}/`}
      aria-current={active ? "page" : undefined}
      className={`category-link ${active ? "category-active" : ""}`}
    >
      <Icon name={category.icon} className="!h-[17px] !w-[17px]" />
      <span className="flex-1">
        <span className="sm:hidden">{category.short_name}</span>
        <span className="hidden sm:inline">{category.name}</span>
      </span>
      <span className="font-mono text-[10px] opacity-60">
        {String(count).padStart(2, "0")}
      </span>
    </Link>
  );
}
