"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Brand from "./Brand";
import Icon from "./Icon";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = [
    { href: "/", label: "探索工具" },
    { href: "/#categories", label: "工具分类" },
    { href: "/about/", label: "关于 ShipKit" },
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="page-shell flex h-16 items-center justify-between gap-3 sm:gap-5">
        <Brand />
        <nav aria-label="主导航" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] font-medium transition-colors hover:text-ink ${pathname === item.href ? "text-ink" : "text-muted"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/submit/"
            className="button button-outline !gap-1.5 !px-3 text-xs sm:!gap-2 sm:!px-4"
          >
            <Icon name="plus" className="!h-4 !w-4" />
            <span>
              提交工具 <span className="hidden sm:inline">/ 付费置顶</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label={open ? "关闭导航" : "打开导航"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-muted hover:bg-paper md:hidden"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="移动导航"
          className="absolute inset-x-0 top-full border-b border-line bg-white px-6 py-4 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg p-3 text-sm hover:bg-paper"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/submit/"
            onClick={() => setOpen(false)}
            className="block p-3 text-sm text-brand"
          >
            提交与赞助
          </Link>
        </nav>
      )}
    </header>
  );
}
