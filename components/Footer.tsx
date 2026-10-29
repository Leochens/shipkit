import Link from "next/link";
import Brand from "./Brand";
import { CONTACT_EMAIL } from "@/lib/site";
export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="page-shell py-10">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div>
            <Brand />
            <p className="mt-4 text-xs leading-6 text-muted">
              为独立开发者整理，帮助好产品走向全球。
              <br />
              Less searching. More shipping.
            </p>
          </div>
          <nav
            aria-label="页脚导航"
            className="flex flex-wrap gap-x-8 gap-y-4 self-start text-[13px] text-muted"
          >
            <Link href="/">探索工具</Link>
            <Link href="/#categories">工具分类</Link>
            <Link href="/submit/">提交与赞助</Link>
            <Link href="/about/">关于我们</Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>联系 Ryan ↗</a>
          </nav>
        </div>
        <div className="mt-9 flex flex-col justify-between gap-3 border-t border-line pt-6 text-[11px] text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} ShipKit. Built for builders.</p>
          <p>独立整理 · 付费展示会明确标注 · 定价请以工具官网为准</p>
        </div>
      </div>
    </footer>
  );
}
