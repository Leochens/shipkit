import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_DESCRIPTION, siteUrl, assetPath } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Shipping Tools Directory for Indie Hackers | ShipKit",
    template: "%s | ShipKit",
  },
  description: SITE_DESCRIPTION,
  applicationName: "ShipKit",
  keywords: [
    "AI 出海工具",
    "独立开发者",
    "indie hackers",
    "AI shipping tools",
    "海外收款",
    "SaaS tools",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "ShipKit",
    title: "ShipKit — 少踩坑，快上线。",
    description: SITE_DESCRIPTION,
    url: siteUrl("/"),
    images: [
      {
        url: siteUrl("/og.png"),
        width: 1200,
        height: 630,
        alt: "ShipKit — tools indie builders use to ship AI products overseas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShipKit — AI 产品出海工具目录",
    description: SITE_DESCRIPTION,
    images: [siteUrl("/og.png")],
  },
  icons: {
    icon: assetPath("/icon.svg"),
    apple: assetPath("/apple-touch-icon.png"),
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only z-50 rounded bg-brand p-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          跳转至主要内容
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
