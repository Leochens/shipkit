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
    <div className="launch-stack relative mx-auto hidden w-full max-w-[350px] lg:block">
      <div className="absolute -inset-10 rounded-full bg-[#e8efdd]/50 blur-3xl" />
      <div className="relative rounded-2xl border border-[#dfe5d8] bg-white/75 p-5 shadow-[0_14px_45px_-25px_rgba(56,104,71,.3)]">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[.1em] text-[#839078]">
            YOUR NEXT LAUNCH
          </span>
          <span className="flex gap-1">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="space-y-2.5">
          {items.map((item, i) => {
            const tool = getTool(item.slug)!;
            return (
              <Link
                key={item.slug}
                href={`/tools/${item.slug}/`}
                className="stack-row flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-3 transition-transform hover:translate-x-1"
              >
                <ToolLogo tool={tool} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{tool.name}</span>
                    <span className="font-mono text-[9px] text-[#a2aa9b]">
                      0{i + 1}
                    </span>
                  </div>
                  <span className="mt-1 block text-[10px] text-muted">
                    {item.role}
                  </span>
                </div>
                <Icon name="check" className="!h-4 !w-4 text-brand" />
              </Link>
            );
          })}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-dashed border-line pt-4">
          <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#7b8872]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            All systems go
          </span>
          <span className="text-[11px] text-brand">从想法，到第一笔收入 ↗</span>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-5 flex rotate-[-5deg] items-center gap-2 rounded-lg border border-[#d9e0cd] bg-[#f2f5e9] px-4 py-2.5 font-mono text-[10px] font-semibold text-brand shadow-sm">
        <Icon name="globe" className="!h-3.5 !w-3.5" />
        BUILT HERE. SHIPPED EVERYWHERE.
      </div>
    </div>
  );
}
