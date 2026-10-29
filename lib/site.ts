export const SITE_NAME = "ShipKit";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://shipkit.directory"
).replace(/\/+$/, "");
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
// SITE_URL already includes the deployment base path.
export function siteUrl(path: string) {
  return `${SITE_URL}/${path.replace(/^\/+/, "")}`;
}
export function assetPath(path: string) {
  return `${BASE_PATH}/${path.replace(/^\/+/, "")}`;
}
export const CONTACT_EMAIL = "ryanleochens@gmail.com";
export const SITE_DESCRIPTION =
  "给独立开发者的 AI 产品出海工具目录。从大模型 API、海外收款到托管、邮件、SEO 和本地化，找到真正帮助你上线的工具。";
export function contactLink(subject: string, body = "") {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function socialMetadata(
  title: string,
  description: string,
  path: string,
) {
  return {
    openGraph: {
      type: "website" as const,
      locale: "zh_CN",
      siteName: SITE_NAME,
      title,
      description,
      url: siteUrl(path),
      images: [
        {
          url: siteUrl("/og.png"),
          width: 1200,
          height: 630,
          alt: "ShipKit — AI 产品出海工具目录",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [siteUrl("/og.png")],
    },
  };
}
