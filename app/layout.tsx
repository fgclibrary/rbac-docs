import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./global.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--next-font-mono",
});

// 设置 metadataBase，用于解析 OG 图片等社交分享链接
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={cn(jetbrainsMono.variable)}
      lang="zh-CN"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider
          i18n={{
            translations: {
              toc: "本页目录",
              tocNoHeadings: "无标题",
              search: "搜索",
              searchNoResult: "未找到结果",
              lastUpdate: "最后更新于",
              nextPage: "下一页",
              previousPage: "上一页",
              chooseTheme: "主题",
              editOnGithub: "在 GitHub 上编辑",
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
