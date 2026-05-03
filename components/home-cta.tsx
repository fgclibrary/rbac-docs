"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const docsRoute = "/docs";

export function HomeCTA() {
  const { isSignedIn, isLoaded } = useAuth();
  const { openSignIn } = useClerk();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  // 从 middleware 重定向回来时自动弹出登录窗口
  useEffect(() => {
    if (searchParams.get("showLogin") === "true" && isLoaded && !isSignedIn) {
      openSignIn();
    }
  }, [searchParams, isLoaded, isSignedIn, openSignIn]);

  // 登录成功后自动跳转到目标页面
  useEffect(() => {
    if (isSignedIn && pendingRedirect) {
      setPendingRedirect(null);
      router.push(pendingRedirect);
    }
  }, [isSignedIn, pendingRedirect, router]);

  const handleProtectedClick = (e: React.MouseEvent, href: string) => {
    if (isLoaded && !isSignedIn) {
      e.preventDefault();
      setPendingRedirect(href);
      openSignIn();
    }
  };

  return (
    <div className="mt-10 flex items-center gap-4">
      <Link
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-90"
        href={`${docsRoute}/guide/quick-start`}
        onClick={(e) =>
          handleProtectedClick(e, `${docsRoute}/guide/quick-start`)
        }
      >
        快速开始
        <ArrowRight className="size-4" />
      </Link>
      <Link
        className="inline-flex items-center gap-2 rounded-lg border px-6 py-2.5 font-medium text-sm transition-colors hover:bg-accent"
        href={`${docsRoute}/api`}
        onClick={(e) => handleProtectedClick(e, `${docsRoute}/api`)}
      >
        服务端命令文档
      </Link>
    </div>
  );
}
