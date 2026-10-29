import Link from "next/link";
import Icon from "./Icon";
import ToolLogo from "./ToolLogo";
import { getTool } from "@/lib/data";

export default function LaunchStack() {
  const items = [
    { slug: "openrouter", role: "接入模型", status: "API connected" },
    { slug: "stripe", role: "接收付款", status: "Payment ready" },
    { slug: "vercel", role: "发布上线", status: "Ready to ship" },
  ];
  return (
    <div className="mx-auto hidden w-full max-w-[360px] lg:block">
      <div className="rounded-lg border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="text-[11px] font-medium tracking-widest text-muted">YOUR NEXT LAUNCH</span>
          <Icon name="terminal" className="!h-4 !w-4 text-zinc-400" />
        </div>
        <div className="divide-y divide-zinc-100 px-5">
          {items.map((item, i) => {
            const tool = getTool(item.slug)!;
            return (
              <Link
                key={item.slug}
                href={`/tools/${item.slug}/`}
                className="flex items-center gap-3 py-5 transition-colors hover:text-brand"
              >
                <span className="mr-1 font-mono text-[10px] text-zinc-400">0{i + 1}</span>
                <ToolLogo tool={tool} />
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{tool.name}</span>
                  <span className="mt-1 block text-xs text-muted">{item.role}</span>
                </div>
                <Icon name="check" className="!h-4 !w-4 text-zinc-400" />
              </Link>
            );
          })}
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-line bg-paper px-5 py-4 text-[10px] text-muted">
          <span>All systems go</span>
          <span>从想法，到第一笔收入</span>
        </div>
      </div>
      <p className="mt-4 text-center text-[10px] tracking-[.1em] text-muted">BUILT HERE. SHIPPED EVERYWHERE.</p>
    </div>
  );
}
