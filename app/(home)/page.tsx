import { ArrowRight, Boxes, Eye, Layers, Plug, Zap } from "lucide-react";
import Link from "next/link";
import { appName, docsRoute } from "@/lib/shared";

// 框架特性列表
const features = [
  {
    icon: Zap,
    title: "开箱即用",
    description: "模块引入即用，零开发成本启用标准权限能力",
  },
  {
    icon: Layers,
    title: "标准化实践",
    description: "基于官方最佳实践设计，确保架构先进性与可维护性",
  },
  {
    icon: Boxes,
    title: "事件驱动",
    description: "组件级事件机制，精准管控功能模块内部流转",
  },
  {
    icon: Eye,
    title: "模板复用",
    description: "组件、页面、样式均可抽离为模板进行沉淀复用",
  },
  {
    icon: Plug,
    title: "开放接口",
    description: "标准 API 全覆盖，支持自定义前端与自动化集成",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col items-center justify-center px-6 py-24 lg:flex-row lg:gap-24">
      {/* 左侧：Banner 信息，占约 55% */}
      <section className="flex flex-col text-left lg:basis-[55%]">
        <h1 className="font-bold text-4xl leading-tight tracking-tight sm:text-5xl">
          {appName}
          <br />
          <span className="text-3xl text-muted-foreground sm:text-4xl">
            活字格标准化权限管理框架
          </span>
        </h1>

        <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
          深度整合用户、角色、组织架构及权限组管理能力，只需引入功能模块并完成简单配置，即可快速完成系统集成。
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-90"
            href={`${docsRoute}/guide/quick-start`}
          >
            快速开始
            <ArrowRight className="size-4" />
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-lg border px-6 py-2.5 font-medium text-sm transition-colors hover:bg-accent"
            href={`${docsRoute}/api`}
          >
            服务端命令文档
          </Link>
        </div>
      </section>

      {/* 右侧：特性列表，占约 45% */}
      <section className="mt-16 w-full lg:mt-0 lg:basis-[45%]">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li
              className="flex items-start gap-3 rounded-lg p-4 transition-colors hover:bg-accent"
              key={feature.title}
            >
              <div className="mt-0.5 shrink-0 rounded-md bg-primary/10 p-2 text-primary">
                <feature.icon className="size-4" />
              </div>
              <div>
                <div className="font-medium text-sm">{feature.title}</div>
                <div className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
                  {feature.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
