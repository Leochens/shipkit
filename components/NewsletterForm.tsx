"use client";
import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { CONTACT_EMAIL } from "@/lib/site";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    try {
      localStorage.setItem(
        "shipkit:newsletter:v1",
        JSON.stringify({
          email: email.trim(),
          savedAt: new Date().toISOString(),
        }),
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  return (
    <section className="rounded-lg border border-line bg-paper px-6 py-9 sm:px-9">
      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-sm">
          <span className="eyebrow">THE BUILDER&apos;S LETTER</span>
          <h2 className="mt-3 text-[22px] font-semibold tracking-tight">
            好工具，不用自己翻遍全网。
          </h2>
          <p className="mt-2 text-xs leading-6 text-muted">
            订阅出海工具笔记，让下一次上线少走弯路。
          </p>
        </div>
        <div className="w-full lg:max-w-[330px]">
          {status === "success" ? (
            <div
              role="status"
              className="rounded-lg border border-line bg-white px-4 py-3 text-sm text-brand"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Icon name="check" />
                邮箱已保存在此浏览器
              </span>
              <p className="mt-2 text-xs leading-6">
                这是本地订阅演示，尚未加入邮件列表。
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=ShipKit%20Newsletter&body=${encodeURIComponent(`请将 ${email} 加入 ShipKit 工具笔记。`)}`}
                  className="underline underline-offset-4"
                >
                  发邮件申请订阅 <Icon name="arrow" className="inline !h-3 !w-3" />
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={subscribe} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">
                你的邮箱地址
              </label>
              <div className="flex gap-2 rounded-lg border border-line bg-white p-1.5">
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  aria-invalid={status === "error"}
                  aria-describedby="newsletter-note"
                  className="min-w-0 flex-1 rounded-md bg-transparent px-2 text-xs"
                />
                <button
                  type="submit"
                  className="button button-primary !px-4 !py-2.5 text-xs"
                >
                  订阅 <Icon name="right" className="!h-3.5 !w-3.5" />
                </button>
              </div>
              <p
                id="newsletter-note"
                className={`mt-2.5 text-[10px] ${status === "error" ? "text-ink" : "text-muted"}`}
                role={status === "error" ? "alert" : undefined}
              >
                {status === "error"
                  ? "请输入有效邮箱，并允许浏览器使用本地存储。也可直接邮件联系。"
                  : "本地订阅演示 · 不发送邮件，不向服务器传输邮箱"}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
