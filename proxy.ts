import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { NextResponse } from "next/server";
import { docsContentRoute, docsRoute } from "@/lib/shared";

// 公开路由：首页和 LLM 文本端点无需登录
const isPublicRoute = createRouteMatcher([
  "/",
  "/llms.txt(.*)",
  "/llms-full.txt(.*)",
  "/llms.mdx(.*)",
]);

// Fumadocs 内容协商路径重写
const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.mdx`,
  `${docsContentRoute}{/*path}/content.md`
);

export default clerkMiddleware(async (auth, request) => {
  // 非公开路由强制登录
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  // Fumadocs 内容协商
  const suffixResult = rewriteSuffix(request.nextUrl.pathname);
  if (suffixResult) {
    return NextResponse.rewrite(new URL(suffixResult, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const docsResult = rewriteDocs(request.nextUrl.pathname);
    if (docsResult) {
      return NextResponse.rewrite(new URL(docsResult, request.nextUrl));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
