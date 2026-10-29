import type { Tool } from "@/lib/data";
export default function ToolLogo({
  tool,
  large = false,
}: {
  tool: Tool;
  large?: boolean;
}) {
  const initials = tool.name.split(/\s+/).slice(0, 2).map((word) => word[0]).join("");
  return (
    <span
      aria-hidden="true"
      className={`tool-logo ${large ? "h-16 w-16 rounded-lg text-2xl sm:h-20 sm:w-20 sm:text-3xl" : "h-10 w-10 rounded-md text-base"}`}
    >
      {initials}
    </span>
  );
}
