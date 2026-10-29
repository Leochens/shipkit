import Link from "next/link";
import { getCategory, type Tool } from "@/lib/data";
import ToolLogo from "./ToolLogo";
import Icon from "./Icon";

export function PricingBadge({ tag }: { tag: Tool["pricing_tag"] }) {
  return <span className="pricing-badge">{tag}</span>;
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
    <article className={`tool-card group ${list ? "list-card" : ""}`}>
      <div className="card-top flex items-center gap-3">
        <ToolLogo tool={tool} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold tracking-tight">
            <Link
              href={`/tools/${tool.slug}/`}
              className="rounded-sm after:absolute after:inset-0 after:rounded-lg hover:text-brand"
              aria-label={`了解 ${tool.name}`}
            >
              {tool.name}
            </Link>
          </h3>
          {featured && (
            <span className="mt-1 block text-[10px] text-muted">Editor&apos;s pick</span>
          )}
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`访问 ${tool.name} 官网（新窗口）`}
          className="relative z-10 -mr-1 rounded-md p-2 text-zinc-400 transition-colors hover:bg-paper hover:text-ink"
        >
          <Icon name="arrow" className="!h-4 !w-4" />
        </a>
      </div>
      <p className="card-description mt-4 truncate text-[13px] leading-6 text-zinc-600" title={tool.description_zh}>
        {tool.description_zh}
      </p>
      <div className="card-bottom mt-auto flex items-center justify-between gap-2 pt-5">
        <Link
          href={`/category/${tool.category}/`}
          className="relative z-10 inline-flex min-w-0 items-center gap-1.5 rounded border border-line px-2 py-1 text-[10px] text-zinc-600 hover:bg-paper"
        >
          <Icon name={tool.category} className="!h-3 !w-3" />
          <span className="truncate">{category?.short_name}</span>
        </Link>
        <PricingBadge tag={tool.pricing_tag} />
      </div>
      <p className="mt-3 truncate border-t border-zinc-100 pt-3 text-[11px] leading-5 text-muted" title={tool.pricing_hint}>
        {tool.pricing_hint}
      </p>
      <div className="sr-only">{tool.tags.join(" · ")}</div>
    </article>
  );
}
