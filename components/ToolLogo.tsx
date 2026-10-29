import type { Tool } from "@/lib/data";
export default function ToolLogo({
  tool,
  large = false,
}: {
  tool: Tool;
  large?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`tool-logo ${large ? "h-20 w-20 rounded-[20px] text-[38px]" : "h-12 w-12 rounded-xl text-[26px]"}`}
      style={{ background: tool.logo_bg, color: tool.logo_color }}
    >
      {tool.logo_text}
    </span>
  );
}
