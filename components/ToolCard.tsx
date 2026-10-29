import Link from "next/link";
import { getCategory, type Tool } from "@/lib/data";
import ToolLogo from "./ToolLogo";
import Icon from "./Icon";

export function PricingBadge({ tag }: { tag: Tool["pricing_tag"] }) {
  return (
    <span
      className={`pricing-badge ${tag === "Free" ? "bg-[#edf5e9] text-[#4a7641]" : tag === "Paid" ? "bg-[#f5efe5] text-[#927244]" : "bg-[#f1f2ed] text-[#74796a]"}`}
    >
      {tag}
    </span>
  );
}
export default function ToolCard({
  tool,
  featured = false,
  list = false,
}: {
  tool: Tool;
  featured?: boolean;
  list?: boolean;
}) {
  const category = getCategory(tool.category);
  return (
    <article
      className={`tool-card group ${featured ? "featured-card" : ""} ${list ? "list-card" : ""}`}
    >
      <Link
        href={`/tools/${tool.slug}/`}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`了解 ${tool.name}`}
      />
      <div className="card-top flex items-center gap-3.5">
        <ToolLogo tool={tool} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] font-bold tracking-[-.3px]">
            {tool.name}
          </h3>
          <p className="mt-1 text-[11px] text-muted">{category?.short_name}</p>
        </div>
        <Icon
          name="arrow"
          className="!h-4 !w-4 self-start text-[#a6aba1] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
        />
      </div>
      <p className="card-description mt-5 text-[13px] leading-[1.85] text-[#737970]">
        {tool.description_zh}
      </p>
      <div className="card-bottom mt-auto flex items-center justify-between gap-2 pt-5">
        <div className="flex gap-2 overflow-hidden">
          {tool.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="whitespace-nowrap text-[10px] text-[#90968b]"
            >
              #{tag}
            </span>
          ))}
        </div>
        <PricingBadge tag={tool.pricing_tag} />
      </div>
      {featured && (
        <div className="absolute right-4 top-[-10px] rounded-full border border-[#e0e7d7] bg-[#f0f5e9] px-2.5 py-0.5 text-[9px] font-medium tracking-wide text-brand">
          EDITOR&apos;S PICK
        </div>
      )}
    </article>
  );
}
