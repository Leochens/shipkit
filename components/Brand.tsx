import Link from "next/link";
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink text-white ${className}`}
    >
      <svg
        viewBox="0 0 28 28"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M14 4v13H5.5L14 4Z" fill="currentColor" />
        <path d="M16.5 8 23 17h-6.5V8Z" fill="currentColor" opacity=".6" />
        <path d="M4 20h20l-4.5 4h-11L4 20Z" fill="currentColor" />
      </svg>
    </span>
  );
}
export default function Brand() {
  return (
    <Link
      href="/"
      aria-label="ShipKit 首页"
      className="inline-flex items-center gap-2.5"
    >
      <BrandMark />
      <span className="text-xl font-semibold tracking-[-.8px]">
        ShipKit<span className="text-zinc-400">.</span>
      </span>
    </Link>
  );
}
