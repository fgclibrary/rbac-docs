"use client";

import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { AuthNav } from "@/components/auth-nav";

// 主题切换 + 用户头像，用分割线隔开，靠右对齐
export function ThemeSwitchWithAuth(_props: React.ComponentProps<"div">) {
  return (
    <div className="ms-auto flex items-center px-2">
      <ThemeSwitch className="border-0 p-1.5" />
      <div className="mr-2 h-4 w-px bg-fd-border" />
      <AuthNav />
    </div>
  );
}
