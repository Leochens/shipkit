import Link from "next/link";
import Icon from "@/components/Icon";
export default function NotFound() {
  return (
    <div className="page-shell py-24 text-center">
      <p className="section-label">404 · OFF THE MAP</p>
      <h1 className="mt-6 text-3xl font-bold">这条航线暂时没有目的地。</h1>
      <p className="mt-5 text-sm text-muted">
        页面可能已移动，回工具目录继续探索吧。
      </p>
      <Link href="/" className="button button-green mt-8 text-sm">
        返回首页 <Icon name="right" />
      </Link>
    </div>
  );
}
